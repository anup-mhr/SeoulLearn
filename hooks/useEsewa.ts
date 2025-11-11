import { ENVIRONMENT, PAYMENT_STATUS } from "@/constants/eSewa";
import { useCallback, useRef, useState } from "react";
import { Alert } from "react-native";
import WebView from "react-native-webview";
import ESewaService, {
  ESewaError,
  ESewaNetworkError,
  ESewaSignatureError,
  eSewaUtils,
  ESewaValidationError,
} from "../libs/eSewaUtils";

// Types
export interface PaymentInfo {
  amount: number;
  taxAmount?: number;
  productServiceCharge?: number;
  productDeliveryCharge?: number;
  transactionUuid?: string;
  successUrl?: string;
  failureUrl?: string;
}

export interface PaymentData {
  amount: string;
  tax_amount: string;
  total_amount: string;
  transaction_uuid: string;
  product_code: string;
  product_service_charge: string;
  product_delivery_charge: string;
  success_url: string;
  failure_url: string;
  signed_field_names: string;
  signature: string;
}

export interface Transaction
  extends Omit<PaymentInfo, "amount">,
    Omit<PaymentData, "amount"> {
  amount: string; // 👈 unify here
  timestamp: string;
  status: string;
  transactionCode?: string;
  completedAt?: string;
  failedAt?: string;
  failureReason?: string;
  verified?: boolean;
  responseData?: any;
  lastChecked?: string;
}

export interface PaymentSummary {
  transactionUuid: string;
  amount: string;
  tax: string;
  total: string;
  status: string;
  statusMessage: string;
  timestamp: string;
  productCode: string;
}

export interface WebViewMessage {
  type: "PAYMENT_SUCCESS";
  data?: any;
  message?: string;
  rawContent?: string;
  error?: string;
}

export const useESewa = (
  environment: keyof typeof ENVIRONMENT = ENVIRONMENT.TEST as keyof typeof ENVIRONMENT,
  config: any = {}
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showWebView, setShowWebView] = useState(false);
  const [currentTransaction, setCurrentTransaction] =
    useState<Transaction | null>(null);
  const [paymentHistory, setPaymentHistory] = useState<Transaction[]>([]);

  const eSewaService = useRef(new ESewaService(environment)).current;
  const webViewRef = useRef<WebView | null>(null);

  // Override config if provided
  if (
    config.successUrl ||
    config.failureUrl ||
    config.productCode ||
    config.secretKey
  ) {
    eSewaService.config = {
      ...eSewaService.config,
      ...config,
    };
  }

  // Initiate payment
  const initiatePayment = useCallback(
    async (paymentInfo: PaymentInfo) => {
      try {
        setIsLoading(true);

        eSewaService.validatePaymentInfo(paymentInfo);

        const paymentData = eSewaService.createPaymentData(paymentInfo);

        const transaction: Transaction = {
          ...paymentInfo,
          ...paymentData,
          timestamp: new Date().toISOString(),
          status: PAYMENT_STATUS.PENDING,
        };

        setCurrentTransaction(transaction);
        setShowWebView(true);
        setIsLoading(false);

        return {
          success: true,
          transactionUuid: paymentInfo.transactionUuid,
          totalAmount: paymentData.total_amount,
        };
      } catch (error: any) {
        setIsLoading(false);
        const errorMessage =
          error instanceof ESewaError
            ? error.message
            : "Payment initiation failed";

        Alert.alert("Payment Error", errorMessage);

        return {
          success: false,
          error: errorMessage,
          code: error.code || "UNKNOWN_ERROR",
        };
      }
    },
    [eSewaService]
  );

  // Handle payment success
  const handlePaymentSuccess = useCallback(
    async (responseData: any) => {
      try {
        setIsLoading(true);

        let isVerified = false;
        if (responseData?.signature) {
          isVerified = eSewaService.verifyResponseSignature(responseData);
          if (!isVerified) {
            throw new ESewaSignatureError(
              "Payment response signature verification failed"
            );
          }
        }

        if (currentTransaction) {
          const updatedTransaction: Transaction = {
            ...currentTransaction,
            status: responseData?.status || PAYMENT_STATUS.COMPLETE,
            transactionCode: responseData?.transaction_code,
            completedAt: new Date().toISOString(),
            verified: isVerified,
            responseData,
          };

          setCurrentTransaction(updatedTransaction);
          setPaymentHistory((prev) => [updatedTransaction, ...prev]);
        }

        setShowWebView(false);
        setIsLoading(false);

        return {
          success: true,
          verified: isVerified,
          transactionCode: responseData?.transaction_code,
          status: responseData?.status || PAYMENT_STATUS.COMPLETE,
          amount: responseData?.total_amount,
        };
      } catch (error: any) {
        setIsLoading(false);
        const errorMessage =
          error instanceof ESewaError
            ? error.message
            : "Payment verification failed";

        Alert.alert("Verification Error", errorMessage);

        return {
          success: false,
          error: errorMessage,
          code: error.code || "VERIFICATION_ERROR",
        };
      }
    },
    [currentTransaction, eSewaService]
  );

  // Handle failure
  const handlePaymentFailure = useCallback(
    (reason = "Payment cancelled by user") => {
      if (currentTransaction) {
        const failedTransaction: Transaction = {
          ...currentTransaction,
          status: PAYMENT_STATUS.CANCELED,
          failedAt: new Date().toISOString(),
          failureReason: reason,
        };

        setCurrentTransaction(failedTransaction);
        setPaymentHistory((prev) => [failedTransaction, ...prev]);
      }

      setShowWebView(false);
      setIsLoading(false);

      return {
        success: false,
        reason,
        code: "PAYMENT_CANCELLED",
      };
    },
    [currentTransaction]
  );

  // Check payment status
  const checkPaymentStatus = useCallback(
    async (transactionUuid: string, totalAmount: number) => {
      try {
        setIsLoading(true);

        const statusResponse = await eSewaService.checkPaymentStatus(
          transactionUuid,
          totalAmount
        );

        setPaymentHistory((prev) =>
          prev.map((tx) =>
            tx.transaction_uuid === transactionUuid
              ? {
                  ...tx,
                  ...statusResponse,
                  lastChecked: new Date().toISOString(),
                }
              : tx
          )
        );

        setIsLoading(false);
        return { success: true, ...statusResponse };
      } catch (error: any) {
        setIsLoading(false);
        const errorMessage =
          error instanceof ESewaNetworkError
            ? "Network error while checking payment status"
            : "Failed to check payment status";

        return {
          success: false,
          error: errorMessage,
          code: error.code || "STATUS_CHECK_ERROR",
        };
      }
    },
    [eSewaService]
  );

  // Cancel
  const cancelPayment = useCallback(() => {
    return handlePaymentFailure("Payment cancelled by user");
  }, [handlePaymentFailure]);

  const clearPaymentHistory = useCallback(() => {
    setPaymentHistory([]);
    setCurrentTransaction(null);
  }, []);

  // WebView
  const getPaymentHTML = useCallback(() => {
    if (!currentTransaction) return "";
    return eSewaService.generatePaymentHTML(currentTransaction);
  }, [currentTransaction, eSewaService]);

  const handleWebViewNavigation = useCallback(
    (navState: { url: string }) => {
      const { url } = navState;

      if (
        url.includes(eSewaService.config.successUrl.replace(/^https?:\/\//, ""))
      ) {
        setIsLoading(true);

        webViewRef.current?.injectJavaScript(`
          (function() {
            try {
              const urlParams = new URLSearchParams(window.location.search);
              const data = urlParams.get('data');
              
              if (data) {
                const decodedData = atob(data);
                window.ReactNativeWebView.postMessage(JSON.stringify({
                  type: 'PAYMENT_SUCCESS',
                  data: JSON.parse(decodedData)
                }));
              } else {
                const content = document.body.innerText || document.body.textContent || '';
                window.ReactNativeWebView.postMessage(JSON.stringify({
                  type: 'PAYMENT_SUCCESS',
                  message: 'Payment completed successfully',
                  rawContent: content
                }));
              }
            } catch (e) {
              window.ReactNativeWebView.postMessage(JSON.stringify({
                type: 'PAYMENT_SUCCESS',
                message: 'Payment completed - manual verification required',
                error: e.message
              }));
            }
          })();
          true;
        `);
      }

      if (
        url.includes(eSewaService.config.failureUrl.replace(/^https?:\/\//, ""))
      ) {
        handlePaymentFailure("Payment failed or was cancelled");
      }
    },
    [eSewaService.config, handlePaymentFailure]
  );

  const handleWebViewMessage = useCallback(
    async (event: any) => {
      try {
        const message: WebViewMessage = JSON.parse(event.nativeEvent.data);

        if (message.type === "PAYMENT_SUCCESS") {
          if (message.data) {
            await handlePaymentSuccess(message.data);
          } else {
            await handlePaymentSuccess({ status: PAYMENT_STATUS.COMPLETE });
          }
        }
      } catch (error) {
        console.error("WebView message parsing error:", error);
        await handlePaymentSuccess({ status: PAYMENT_STATUS.COMPLETE });
      }
    },
    [handlePaymentSuccess]
  );

  // Verify
  const verifyTransaction = useCallback(
    async (transactionUuid?: string, totalAmount?: number) => {
      if (!transactionUuid || !totalAmount) {
        if (currentTransaction) {
          return await checkPaymentStatus(
            currentTransaction.transaction_uuid,
            Number(currentTransaction.total_amount)
          );
        }
        throw new ESewaValidationError(
          "Transaction UUID and total amount are required for verification"
        );
      }

      return await checkPaymentStatus(transactionUuid, totalAmount);
    },
    [currentTransaction, checkPaymentStatus]
  );

  const getPaymentSummary = useCallback((): PaymentSummary | null => {
    if (!currentTransaction) return null;

    return {
      transactionUuid: currentTransaction.transaction_uuid,
      amount: eSewaUtils.formatCurrency(Number(currentTransaction.amount)),
      tax: eSewaUtils.formatCurrency(Number(currentTransaction.tax_amount)),
      total: eSewaUtils.formatCurrency(Number(currentTransaction.total_amount)),
      status: currentTransaction.status,
      statusMessage: eSewaUtils.getStatusMessage(currentTransaction.status),
      timestamp: currentTransaction.timestamp,
      productCode: currentTransaction.product_code,
    };
  }, [currentTransaction]);

  return {
    // State
    isLoading,
    showWebView,
    currentTransaction,
    paymentHistory,

    // Actions
    initiatePayment,
    cancelPayment,
    checkPaymentStatus,
    verifyTransaction,
    clearPaymentHistory,

    // WebView helpers
    webViewRef,
    getPaymentHTML,
    handleWebViewNavigation,
    handleWebViewMessage,

    // Utils
    getPaymentSummary,
    formatAmount: eSewaUtils.formatCurrency,
    generateTransactionUuid: eSewaUtils.generateUuid,
  };
};

export default useESewa;
