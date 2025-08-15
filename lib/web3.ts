// Web3 utility functions
export interface PaymentResult {
  success: boolean
  transactionHash?: string
  error?: string
}

export const PLATFORM_FEE = "0.001" // 0.001 ETH platform fee
export const ADMIN_WALLET = "0x742d35Cc6634C0532925a3b8D4C9db96C4b5Da5e" // Replace with actual admin wallet

export async function sendPayment(amount: string): Promise<PaymentResult> {
  try {
    if (!window.ethereum) {
      throw new Error("MetaMask not found")
    }

    // Convert ETH to Wei
    const amountInWei = (Number.parseFloat(amount) * Math.pow(10, 18)).toString(16)

    // Send transaction
    const transactionHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [
        {
          from: (await window.ethereum.request({ method: "eth_accounts" }))[0],
          to: ADMIN_WALLET,
          value: `0x${amountInWei}`,
          gas: "0x5208", // 21000 gas limit for simple transfer
        },
      ],
    })

    return {
      success: true,
      transactionHash,
    }
  } catch (error: any) {
    console.error("Payment failed:", error)
    return {
      success: false,
      error: error.message || "Payment failed",
    }
  }
}

export async function verifyPayment(transactionHash: string): Promise<boolean> {
  try {
    if (!window.ethereum) return false

    const receipt = await window.ethereum.request({
      method: "eth_getTransactionReceipt",
      params: [transactionHash],
    })

    return receipt && receipt.status === "0x1"
  } catch (error) {
    console.error("Failed to verify payment:", error)
    return false
  }
}

// Type declarations for MetaMask
declare global {
  interface Window {
    ethereum?: {
      isMetaMask?: boolean
      request: (args: { method: string; params?: any[] }) => Promise<any>
      on: (event: string, callback: (data: any) => void) => void
      removeListener: (event: string, callback: (data: any) => void) => void
    }
  }
}
