import { ENVIRONMENT } from "@/constants/eSewa";
import useESewa, { PaymentSummary } from "@/hooks/useEsewa";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { WebView } from "react-native-webview";

const ESewaPaymentExample = () => {
  const [amount, setAmount] = useState("100");
  const [paymentSummary, setPaymentSummary] = useState<PaymentSummary | null>(
    null
  );

  const {
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
    generateTransactionUuid,
  } = useESewa(ENVIRONMENT.TEST as any);

  useEffect(() => {
    setPaymentSummary(getPaymentSummary());
  }, [currentTransaction, getPaymentSummary]);

  const handlePayment = async (amount: number) => {
    if (!amount || amount <= 0) {
      Alert.alert("Invalid Amount", "Please enter a valid amount");
      return;
    }

    const paymentInfo = {
      amount: amount,
      taxAmount: 0,
      productServiceCharge: 0,
      productDeliveryCharge: 0,
      transactionUuid: generateTransactionUuid("PAY"),
      // You can customize success/failure URLs
      // successUrl: 'https://yourdomain.com/success',
      // failureUrl: 'https://yourdomain.com/failure'
    };

    const result = await initiatePayment(paymentInfo);

    if (!result.success) {
      Alert.alert("Payment Failed", result.error);
    }
  };

  const handleVerifyPayment = async () => {
    if (!currentTransaction) {
      Alert.alert("No Transaction", "No transaction to verify");
      return;
    }

    const result = await verifyTransaction();

    if (result.success) {
      Alert.alert(
        "Verification Result",
        `Status: ${result.status}\nReference ID: ${result.ref_id || "N/A"}`,
        [{ text: "OK" }]
      );
    } else {
      Alert.alert("Verification Failed", result.error);
    }
  };

  const renderWebView = () => (
    <Modal visible={showWebView} animationType="slide">
      {/* <View style={styles.webViewHeader}>
        <Text style={styles.webViewTitle}>eSewa Payment</Text>
        <TouchableOpacity
          style={styles.cancelWebViewButton}
          onPress={cancelPayment}
        >
          <Text style={styles.cancelWebViewText}>Cancel</Text>
        </TouchableOpacity>
      </View> */}

      {isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#60D669" />
          <Text style={styles.loadingText}>Processing payment...</Text>
        </View>
      )}

      <WebView
        ref={webViewRef}
        source={{ html: getPaymentHTML() }}
        onNavigationStateChange={handleWebViewNavigation}
        onMessage={handleWebViewMessage}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        style={styles.webView}
      />
    </Modal>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" /> */}

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>eSewa Payment Integration</Text>
          <Text style={styles.subtitle}>React Native Expo Demo</Text>
        </View>

        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => handlePayment(100)}
          >
            <Text style={styles.primaryButtonText}>Make Payment</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={handleVerifyPayment}
            disabled={isLoading}
          >
            <Text style={styles.secondaryButtonText}>Check Status</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {renderWebView()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
  },
  currentTransactionCard: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  currentTransactionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  currentTransactionContent: {
    marginBottom: 15,
  },
  currentTransactionUuid: {
    fontSize: 14,
    color: "#666",
    fontFamily: "monospace",
    marginBottom: 5,
  },
  currentTransactionAmount: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#60D669",
    marginBottom: 5,
  },
  currentTransactionStatus: {
    fontSize: 16,
    fontWeight: "500",
  },
  verifyButton: {
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  verifyButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "500",
  },
  actionsContainer: {
    marginBottom: 30,
  },
  primaryButton: {
    backgroundColor: "#60D669",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 10,
    shadowColor: "#60D669",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  primaryButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  secondaryButton: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  secondaryButtonText: {
    color: "#333",
    fontSize: 16,
    fontWeight: "500",
  },
  historyContainer: {
    marginBottom: 30,
  },
  historyHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  historyTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  clearHistoryText: {
    color: "#ff4444",
    fontSize: 14,
    fontWeight: "500",
  },
  emptyHistoryText: {
    textAlign: "center",
    color: "#999",
    fontSize: 16,
    fontStyle: "italic",
    padding: 30,
  },
  transactionCard: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: "#60D669",
  },
  transactionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  transactionId: {
    fontSize: 14,
    fontFamily: "monospace",
    color: "#333",
    flex: 1,
  },
  transactionStatus: {
    fontSize: 12,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  transactionDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  transactionDate: {
    fontSize: 12,
    color: "#666",
  },
  transactionCode: {
    fontSize: 12,
    color: "#666",
    marginTop: 5,
    fontFamily: "monospace",
  },
  infoContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  featureList: {
    gap: 8,
  },
  featureItem: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  closeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: {
    fontSize: 20,
    color: "#666",
    fontWeight: "bold",
  },
  formContainer: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    fontSize: 16,
    color: "#333",
  },
  summaryCard: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  summaryLabel: {
    fontSize: 14,
    color: "#666",
  },
  summaryValue: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
  },
  divider: {
    height: 1,
    backgroundColor: "#eee",
    marginVertical: 10,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  totalValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#60D669",
  },
  payButton: {
    backgroundColor: "#60D669",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#60D669",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  payButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  testCredentials: {
    backgroundColor: "#f8f9fa",
    padding: 15,
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: "#007bff",
  },
  credentialsTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  credentialsText: {
    fontSize: 13,
    color: "#666",
    lineHeight: 18,
    fontFamily: "monospace",
  },
  webViewContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  webViewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#60D669",
    paddingTop: 50,
  },
  webViewTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  cancelWebViewButton: {
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  cancelWebViewText: {
    color: "white",
    fontSize: 14,
    fontWeight: "500",
  },
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  loadingText: {
    marginTop: 15,
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
  webView: {
    flex: 1,
  },
});

export default ESewaPaymentExample;
