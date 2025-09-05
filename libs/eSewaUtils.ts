import { PaymentData, PaymentInfo } from "@/hooks/useEsewa";
import CryptoJS from "crypto-js";

export const ESEWA_CONFIG: any = {
  // Test environment
  TEST: {
    epayUrl: "https://rc-epay.esewa.com.np/api/epay/main/v2/form",
    statusUrl: "https://rc.esewa.com.np/api/epay/transaction/status/",
    productCode: "EPAYTEST",
    secretKey: "8gBm/:&EnhH.1/q",
    successUrl: "https://developer.esewa.com.np/success",
    failureUrl: "https://developer.esewa.com.np/failure",
  },
  // Production environment
  PRODUCTION: {
    epayUrl: "https://epay.esewa.com.np/api/epay/main/v2/form",
    statusUrl: "https://epay.esewa.com.np/api/epay/transaction/status/",
    productCode: "YOUR_PRODUCT_CODE", // Replace with actual product code
    secretKey: "YOUR_SECRET_KEY", // Replace with actual secret key
    successUrl: "YOUR_SUCCESS_URL", // Replace with your success URL
    failureUrl: "YOUR_FAILURE_URL", // Replace with your failure URL
  },
};

export class ESewaService {
  public config;
  private environment;

  constructor(environment = "TEST") {
    this.config = ESEWA_CONFIG[environment];
    this.environment = environment;
  }

  // Generate HMAC SHA256 signature
  generateSignature(message: string) {
    const hash = CryptoJS.HmacSHA256(message, this.config.secretKey);
    return CryptoJS.enc.Base64.stringify(hash);
  }

  // Create payment data with signature
  createPaymentData(paymentInfo: PaymentInfo): PaymentData {
    const {
      amount,
      taxAmount = 0,
      productServiceCharge = 0,
      productDeliveryCharge = 0,
      successUrl,
      failureUrl,
    } = paymentInfo;

    // Validate required fields
    this.validatePaymentInfo(paymentInfo);

    if (!paymentInfo.transactionUuid) {
      paymentInfo.transactionUuid = eSewaUtils.generateUuid("TXN");
    }
    const transactionUuid = paymentInfo.transactionUuid;

    const totalAmount =
      amount + taxAmount + productServiceCharge + productDeliveryCharge;

    const signedFieldNames = "total_amount,transaction_uuid,product_code";
    const messageForSignature = `total_amount=${totalAmount},transaction_uuid=${transactionUuid},product_code=${this.config.productCode}`;
    const signature = this.generateSignature(messageForSignature);

    return {
      amount: amount.toString(),
      tax_amount: taxAmount.toString(),
      total_amount: totalAmount.toString(),
      transaction_uuid: transactionUuid,
      product_code: this.config.productCode,
      product_service_charge: productServiceCharge.toString(),
      product_delivery_charge: productDeliveryCharge.toString(),
      success_url: successUrl || this.config.successUrl,
      failure_url: failureUrl || this.config.failureUrl,
      signed_field_names: signedFieldNames,
      signature: signature,
    };
  }

  // Validate payment information
  validatePaymentInfo(paymentInfo: PaymentInfo) {
    const { amount, transactionUuid } = paymentInfo;

    if (!amount || amount <= 0) {
      throw new Error("Amount must be greater than 0");
    }

    if (!transactionUuid) {
      throw new Error("Transaction UUID is required");
    }

    // Check transaction UUID format (alphanumeric and hyphen only)
    const uuidRegex = /^[a-zA-Z0-9-]+$/;
    if (!uuidRegex.test(transactionUuid)) {
      throw new Error(
        "Transaction UUID can only contain alphanumeric characters and hyphens"
      );
    }
  }

  // Verify response signature
  verifyResponseSignature(responseData: any) {
    const {
      transaction_code,
      status,
      total_amount,
      transaction_uuid,
      product_code,
      signed_field_names,
      signature,
    } = responseData;

    const message = `transaction_code=${transaction_code},status=${status},total_amount=${total_amount},transaction_uuid=${transaction_uuid},product_code=${product_code},signed_field_names=${signed_field_names}`;
    const expectedSignature = this.generateSignature(message);

    return expectedSignature === signature;
  }

  // Check payment status via API
  async checkPaymentStatus(transactionUuid: string, totalAmount: number) {
    try {
      const url = `${this.config.statusUrl}?product_code=${this.config.productCode}&total_amount=${totalAmount}&transaction_uuid=${transactionUuid}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Payment status check failed:", error);
      throw error;
    }
  }

  // Decode Base64 response from eSewa
  decodeESewaResponse(base64Data: string) {
    try {
      const decoded = atob(base64Data);
      return JSON.parse(decoded);
    } catch (error) {
      console.error("Failed to decode eSewa response:", error);
      throw new Error("Invalid response format from eSewa");
    }
  }

  // Generate HTML for payment form
  generatePaymentHTML(paymentData: PaymentData) {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>eSewa Payment Gateway</title>
          <style>
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            
            body { 
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              min-height: 100vh;
              display: flex;
              align-items: center;
              justify-content: center;
              padding: 20px;
            }
            
            .payment-container {
              background: white;
              padding: 40px;
              border-radius: 15px;
              box-shadow: 0 10px 30px rgba(0,0,0,0.2);
              text-align: center;
              max-width: 400px;
              width: 100%;
              position: relative;
              overflow: hidden;
            }
            
            .payment-container::before {
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              height: 5px;
              background: linear-gradient(90deg, #60D669, #4CAF50);
            }
            
            .logo {
              color: #60D669;
              font-size: 28px;
              font-weight: bold;
              margin-bottom: 10px;
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 10px;
            }
            
            .logo::before {
              content: '💳';
              font-size: 24px;
            }
            
            .tagline {
              color: #666;
              font-size: 14px;
              margin-bottom: 30px;
            }
            
            .amount-display {
              background: #f8f9fa;
              padding: 20px;
              border-radius: 10px;
              margin-bottom: 30px;
              border-left: 4px solid #60D669;
            }
            
            .currency {
              color: #666;
              font-size: 16px;
              margin-bottom: 5px;
            }
            
            .amount {
              font-size: 36px;
              font-weight: bold;
              color: #333;
              margin-bottom: 5px;
            }
            
            .transaction-id {
              font-size: 12px;
              color: #999;
              font-family: monospace;
            }
            
            .submit-btn {
              background: linear-gradient(135deg, #60D669, #4CAF50);
              color: white;
              border: none;
              padding: 16px 32px;
              font-size: 16px;
              font-weight: 600;
              border-radius: 8px;
              cursor: pointer;
              width: 100%;
              transition: all 0.3s ease;
              box-shadow: 0 4px 15px rgba(96, 214, 105, 0.3);
            }
            
            .submit-btn:hover {
              transform: translateY(-2px);
              box-shadow: 0 6px 20px rgba(96, 214, 105, 0.4);
            }
            
            .submit-btn:active {
              transform: translateY(0);
            }
            
            .loading {
              display: none;
              margin-top: 20px;
              color: #666;
              font-size: 14px;
            }
            
            .loading.show {
              display: block;
            }
            
            .spinner {
              display: inline-block;
              width: 20px;
              height: 20px;
              border: 3px solid #f3f3f3;
              border-top: 3px solid #60D669;
              border-radius: 50%;
              animation: spin 1s linear infinite;
              margin-right: 10px;
            }
            
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
            
            .security-info {
              margin-top: 25px;
              padding-top: 20px;
              border-top: 1px solid #eee;
              font-size: 12px;
              color: #666;
              line-height: 1.5;
            }
            
            .security-badge {
              display: inline-block;
              background: #e8f5e8;
              color: #2e7d32;
              padding: 4px 8px;
              border-radius: 4px;
              font-size: 11px;
              margin-top: 10px;
            }
          </style>
        </head>
        <body>
          <div class="payment-container">
            <div class="logo">eSewa</div>
            <div class="tagline">Secure Digital Payment</div>
            
            <div class="amount-display">
              <div class="currency">Nepali Rupees</div>
              <div class="amount">₹${paymentData.total_amount}</div>
              <div class="transaction-id">TXN: ${paymentData.transaction_uuid}</div>
            </div>
            
            <form action="${this.config.epayUrl}" method="POST" id="paymentForm">
              <input type="hidden" name="amount" value="${paymentData.amount}">
              <input type="hidden" name="tax_amount" value="${paymentData.tax_amount}">
              <input type="hidden" name="total_amount" value="${paymentData.total_amount}">
              <input type="hidden" name="transaction_uuid" value="${paymentData.transaction_uuid}">
              <input type="hidden" name="product_code" value="${paymentData.product_code}">
              <input type="hidden" name="product_service_charge" value="${paymentData.product_service_charge}">
              <input type="hidden" name="product_delivery_charge" value="${paymentData.product_delivery_charge}">
              <input type="hidden" name="success_url" value="${paymentData.success_url}">
              <input type="hidden" name="failure_url" value="${paymentData.failure_url}">
              <input type="hidden" name="signed_field_names" value="${paymentData.signed_field_names}">
              <input type="hidden" name="signature" value="${paymentData.signature}">
              
              <button type="submit" class="submit-btn" onclick="showLoading()">
                Proceed to Payment
              </button>
            </form>
            
            <div class="loading" id="loading">
              <div class="spinner"></div>
              Redirecting to eSewa...
            </div>
            
            <div class="security-info">
              You will be redirected to eSewa's secure payment gateway
              <div class="security-badge">🔒 SSL Secured</div>
            </div>
          </div>
          
          <script>
            function showLoading() {
              document.querySelector('.submit-btn').style.display = 'none';
              document.getElementById('loading').classList.add('show');
            }
            
            // Auto-submit after 3 seconds to give user time to see the page
            setTimeout(() => {
              document.getElementById('paymentForm').submit();
            }, 500);
          </script>
        </body>
      </html>
    `;
  }

  // Validate environment
  validateEnvironment() {
    if (
      !this.config.productCode ||
      this.config.productCode === "YOUR_PRODUCT_CODE"
    ) {
      throw new Error("Please configure your eSewa product code");
    }

    if (!this.config.secretKey || this.config.secretKey === "YOUR_SECRET_KEY") {
      throw new Error("Please configure your eSewa secret key");
    }

    if (this.environment === "PRODUCTION") {
      if (
        this.config.successUrl.includes("developer.esewa.com.np") ||
        this.config.failureUrl.includes("developer.esewa.com.np")
      ) {
        console.warn("Warning: Using test URLs in production environment");
      }
    }
  }
}

// Export utility functions
export const eSewaUtils = {
  // Generate random transaction UUID
  generateUuid: (prefix = "TXN") => {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, "0");
    return `${prefix}-${timestamp}-${random}`;
  },

  // Format currency
  formatCurrency: (amount: number, currency = "NPR") => {
    return new Intl.NumberFormat("ne-NP", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 2,
    }).format(amount);
  },

  getStatusMessage(status: string) {
    const statusMessages: any = {
      COMPLETE: "Payment completed successfully",
      PENDING: "Payment is being processed",
      FULL_REFUND: "Payment has been fully refunded",
      PARTIAL_REFUND: "Payment has been partially refunded",
      AMBIGUOUS: "Payment is in an uncertain state",
      NOT_FOUND: "Payment session expired or not found",
      CANCELED: "Payment was canceled",
    };

    return statusMessages[status] || "Unknown payment status";
  },
};

// Error classes for better error handling
export class ESewaError extends Error {
  private code;
  private details;
  constructor(message: string, code: string, details: any = {}) {
    super(message);
    this.name = "ESewaError";
    this.code = code;
    this.details = details;
  }
}

export class ESewaValidationError extends ESewaError {
  constructor(message: string, field = null) {
    super(message, "VALIDATION_ERROR", { field });
    this.name = "ESewaValidationError";
  }
}

export class ESewaNetworkError extends ESewaError {
  constructor(message: string, statusCode = null) {
    super(message, "NETWORK_ERROR", { statusCode });
    this.name = "ESewaNetworkError";
  }
}

export class ESewaSignatureError extends ESewaError {
  constructor(message: string) {
    super(message, "SIGNATURE_ERROR");
    this.name = "ESewaSignatureError";
  }
}

export default ESewaService;
