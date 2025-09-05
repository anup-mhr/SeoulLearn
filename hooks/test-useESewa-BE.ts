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
  source?: any;
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
// Your backend API configuration
const BACKEND_CONFIG = {
  baseUrl: "https://your-backend-api.com/api", // Replace with your API URL
  endpoints: {
    createPayment: "/payments/create",
    verifyPayment: "/payments/verify",
    updatePayment: "/payments/update",
  },
};
export const useESewa = (
  environment: keyof typeof ENVIRONMENT = ENVIRONMENT.TEST as keyof typeof ENVIRONMENT,
  config: any = {}
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showWebView, setShowWebView] = useState(false);
  const [currentTransaction, setCurrentTransaction] =
    useState<Transaction | null>(null);
  // const [paymentHistory, setPaymentHistory] = useState<Transaction[]>([]);

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

  const createPaymentInBackend = async (paymentInfo: PaymentInfo) => {
    try {
      const response = await fetch(
        `${BACKEND_CONFIG.baseUrl}${BACKEND_CONFIG.endpoints.createPayment}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer YOUR_AUTH_TOKEN", // Add your auth token
          },
          body: JSON.stringify({
            amount: paymentInfo.amount,
            taxAmount: paymentInfo.taxAmount,
            productServiceCharge: paymentInfo.productServiceCharge || 0,
            productDeliveryCharge: paymentInfo.productDeliveryCharge || 0,
            transactionUuid: paymentInfo.transactionUuid,
            // productName: paymentInfo.productName,
            // customerInfo: paymentInfo.customerInfo,
            status: "INITIATED",
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to create payment record");
      }

      return result;
    } catch (error) {
      console.error("Backend payment creation failed:", error);
      throw error;
    }
  };

  // Update payment status in backend
  const updatePaymentInBackend = async (
    transactionUuid: string,
    updateData: any
  ) => {
    try {
      const response = await fetch(
        `${BACKEND_CONFIG.baseUrl}${BACKEND_CONFIG.endpoints.updatePayment}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer YOUR_AUTH_TOKEN",
          },
          body: JSON.stringify({
            transactionUuid,
            ...updateData,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to update payment record");
      }

      return result;
    } catch (error) {
      console.error("Backend payment update failed:", error);
      throw error;
    }
  };

  // Verify payment with eSewa and update backend
  const verifyPaymentWithESewa = async (
    transactionUuid: string,
    totalAmount: number | string
  ) => {
    try {
      const response = await fetch(
        `${BACKEND_CONFIG.baseUrl}${BACKEND_CONFIG.endpoints.verifyPayment}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer YOUR_AUTH_TOKEN",
          },
          body: JSON.stringify({
            transactionUuid,
            totalAmount,
            provider: "esewa",
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Payment verification failed");
      }

      return result;
    } catch (error) {
      console.error("Payment verification failed:", error);
      throw error;
    }
  };

  // Initiate payment
  const initiatePayment = useCallback(
    async (paymentInfo: PaymentInfo) => {
      try {
        setIsLoading(true);

        eSewaService.validatePaymentInfo(paymentInfo);

        // Step 2: Create payment record in your backend
        const backendPayment = await createPaymentInBackend(paymentInfo);
        console.log("Backend payment created:", backendPayment);

        // Step 3: Create eSewa payment data
        const paymentData = eSewaService.createPaymentData(paymentInfo);

        // Step 4: Store current transaction
        const transaction: Transaction = {
          ...paymentInfo,
          ...paymentData,
          timestamp: new Date().toISOString(),
          status: PAYMENT_STATUS.PENDING,
        };

        setCurrentTransaction(transaction);
        // Step 5: Open WebView
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
    async (responseData: any, source: any) => {
      try {
        setIsLoading(true);

        console.log("=========handlePaymentSuccess===========");
        console.log("Payment success data:", responseData);
        console.log("Data source:", source);

        let isVerified = false;
        if (responseData?.signature) {
          isVerified = eSewaService.verifyResponseSignature(responseData);
          if (!isVerified) {
            throw new ESewaSignatureError(
              "Payment response signature verification failed"
            );
          }
        }

        // Update payment status in your backend
        if (currentTransaction) {
          const updatedTransaction: Transaction = {
            ...currentTransaction,
            status: responseData?.status || PAYMENT_STATUS.COMPLETE,
            transactionCode: responseData?.transaction_code,
            completedAt: new Date().toISOString(),
            verified: isVerified,
            responseData,
            source,
          };

          setCurrentTransaction(updatedTransaction);

          const backendResponse = await updatePaymentInBackend(
            currentTransaction.transaction_uuid,
            updatedTransaction
          );

          // console.log("Backend update response:", backendResponse);

          // Perform additional verification with eSewa API
          let verificationResult = null;
          try {
            verificationResult = await verifyPaymentWithESewa(
              currentTransaction.transaction_uuid,
              currentTransaction.total_amount
            );
            console.log("eSewa verification result:", verificationResult);
          } catch (verifyError) {
            console.error("eSewa verification failed:", verifyError);
            // Continue even if verification fails - we'll handle this in backend
          }
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
    async (reason = "Payment cancelled by user") => {
      if (currentTransaction) {
        const failedTransaction: Transaction = {
          ...currentTransaction,
          status: PAYMENT_STATUS.CANCELED,
          failedAt: new Date().toISOString(),
          failureReason: reason,
        };

        setCurrentTransaction(failedTransaction);

        // Update backend with failure status
        await updatePaymentInBackend(currentTransaction.transaction_uuid, {
          status: PAYMENT_STATUS.CANCELED,
          failureReason: reason || "Payment cancelled or failed",
          // failureData: failureData,
          failedAt: new Date().toISOString(),
        });
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

  // Handle payment errors
  const handlePaymentError = async (error: any) => {
    if (currentTransaction) {
      try {
        await updatePaymentInBackend(currentTransaction.transaction_uuid, {
          status: "ERROR",
          errorMessage: error,
          errorAt: new Date().toISOString(),
        });
      } catch (updateError) {
        console.error("Failed to update error status:", updateError);
      }
    }

    setIsLoading(false);
    setShowWebView(false);
    Alert.alert("Payment Error", "An error occurred during payment processing");
  };

  // Check payment status
  const checkPaymentStatus = useCallback(
    async (transactionUuid: string, totalAmount: number) => {
      try {
        setIsLoading(true);

        const statusResponse = await eSewaService.checkPaymentStatus(
          transactionUuid,
          totalAmount
        );

        console.log(
          "Response from eSewa Payment Status Request Check \n",
          statusResponse
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
        url.includes(
          eSewaService.config.successUrl
            .replace(/^https?:\/\//, "")
            .replace("/^http?:\/\//", "")
        )
      ) {
        setIsLoading(true);

        // Inject JavaScript to capture the response from your backend
        webViewRef.current?.injectJavaScript(`
        (function() {
          try {
            // Method 1: Try to get data from URL parameters
            const urlParams = new URLSearchParams(window.location.search);
            const data = urlParams.get('data');
            
            if (data) {
              // If your backend returns base64 encoded data
              try {
                const decodedData = atob(data);
                window.ReactNativeWebView.postMessage(JSON.stringify({
                  type: 'PAYMENT_SUCCESS',
                  data: JSON.parse(decodedData),
                  source: 'url_params'
                }));
                return true;
              } catch (e) {
                console.error('Failed to decode data:', e);
              }
            }
            
            // Method 2: Try to get JSON response from page content
            const bodyText = document.body.innerText || document.body.textContent || '';
            try {
              // If your backend returns JSON directly
              const jsonMatch = bodyText.match(/\\{.*\\}/);
              if (jsonMatch) {
                const jsonData = JSON.parse(jsonMatch[0]);
                window.ReactNativeWebView.postMessage(JSON.stringify({
                  type: 'PAYMENT_SUCCESS',
                  data: jsonData,
                  source: 'page_content'
                }));
                return true;
              }
            } catch (e) {
              console.error('Failed to parse JSON from content:', e);
            }
            
            // Method 3: Look for specific elements with payment data
            const paymentDataElement = document.getElementById('payment-data') || 
                                     document.querySelector('[data-payment]') ||
                                     document.querySelector('.payment-response');
            
            if (paymentDataElement) {
              const paymentData = paymentDataElement.textContent || paymentDataElement.innerHTML;
              try {
                const parsedData = JSON.parse(paymentData);
                window.ReactNativeWebView.postMessage(JSON.stringify({
                  type: 'PAYMENT_SUCCESS',
                  data: parsedData,
                  source: 'element'
                }));
                return true;
              } catch (e) {
                console.error('Failed to parse element data:', e);
              }
            }
            
            // Method 4: Get all form data if present
            const forms = document.querySelectorAll('form');
            if (forms.length > 0) {
              const formData = {};
              const form = forms[0];
              const inputs = form.querySelectorAll('input');
              inputs.forEach(input => {
                if (input.name && input.value) {
                  formData[input.name] = input.value;
                }
              });
              
              if (Object.keys(formData).length > 0) {
                window.ReactNativeWebView.postMessage(JSON.stringify({
                  type: 'PAYMENT_SUCCESS',
                  data: formData,
                  source: 'form_data'
                }));
                return true;
              }
            }
            
            // Method 5: Fallback - send raw content for manual parsing
            window.ReactNativeWebView.postMessage(JSON.stringify({
              type: 'PAYMENT_SUCCESS',
              data: 'Payment completed - manual verification required',
              source: 'fallback'
            }));
            
          } catch (error) {
            window.ReactNativeWebView.postMessage(JSON.stringify({
              type: 'PAYMENT_ERROR',
              error: error.message,
              stack: error.stack
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
        const message = JSON.parse(event.nativeEvent.data);
        console.log("Received message:", message);

        if (message.type === "PAYMENT_SUCCESS") {
          await handlePaymentSuccess(message.data, message.source);
        } else if (message.type === "PAYMENT_FAILURE") {
          await handlePaymentFailure(message.data);
        } else if (message.type === "PAYMENT_ERROR") {
          console.error("WebView error:", message.error);
          await handlePaymentError(message.error);
        }
      } catch (error) {
        console.error("Message parsing error:", error);
        setIsLoading(false);
        setShowWebView(false);
        Alert.alert("Error", "Failed to process payment response");
      }
      //   try {
      //     const message: WebViewMessage = JSON.parse(event.nativeEvent.data);

      //     if (message.type === "PAYMENT_SUCCESS") {
      //       if (message.data) {
      //         await handlePaymentSuccess(message.data);
      //       } else {
      //         await handlePaymentSuccess({ status: PAYMENT_STATUS.COMPLETE });
      //       }
      //     }
      //   } catch (error) {
      //     console.error("WebView message parsing error:", error);
      //     await handlePaymentSuccess({ status: PAYMENT_STATUS.COMPLETE });
      //   }
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
