"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Wallet, ExternalLink, Copy, Check } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface WalletState {
  connected: boolean
  address: string | null
  balance: string | null
  network: string | null
}

export function WalletConnect() {
  const [wallet, setWallet] = useState<WalletState>({
    connected: false,
    address: null,
    balance: null,
    network: null,
  })
  const [isConnecting, setIsConnecting] = useState(false)
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  // Check if MetaMask is installed
  const isMetaMaskInstalled = () => {
    return typeof window !== "undefined" && window.ethereum && window.ethereum.isMetaMask
  }

  // Connect to MetaMask
  const connectWallet = async () => {
    if (!isMetaMaskInstalled()) {
      toast({
        title: "MetaMask Not Found",
        description: "Please install MetaMask to connect your wallet.",
        variant: "destructive",
      })
      return
    }

    setIsConnecting(true)
    try {
      // Request account access
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      })

      if (accounts.length > 0) {
        const address = accounts[0]

        // Get balance
        const balance = await window.ethereum.request({
          method: "eth_getBalance",
          params: [address, "latest"],
        })

        // Convert balance from wei to ETH
        const balanceInEth = (Number.parseInt(balance, 16) / Math.pow(10, 18)).toFixed(4)

        // Get network
        const chainId = await window.ethereum.request({
          method: "eth_chainId",
        })

        const networkNames: { [key: string]: string } = {
          "0x1": "Ethereum Mainnet",
          "0x89": "Polygon Mainnet",
          "0x13881": "Polygon Mumbai Testnet",
          "0x5": "Goerli Testnet",
          "0xaa36a7": "Sepolia Testnet",
        }

        setWallet({
          connected: true,
          address,
          balance: balanceInEth,
          network: networkNames[chainId] || "Unknown Network",
        })

        // Store in localStorage
        localStorage.setItem("walletConnected", "true")
        localStorage.setItem("walletAddress", address)

        toast({
          title: "Wallet Connected",
          description: `Connected to ${address.slice(0, 6)}...${address.slice(-4)}`,
        })
      }
    } catch (error: any) {
      console.error("Failed to connect wallet:", error)
      toast({
        title: "Connection Failed",
        description: error.message || "Failed to connect to MetaMask",
        variant: "destructive",
      })
    } finally {
      setIsConnecting(false)
    }
  }

  // Disconnect wallet
  const disconnectWallet = () => {
    setWallet({
      connected: false,
      address: null,
      balance: null,
      network: null,
    })
    localStorage.removeItem("walletConnected")
    localStorage.removeItem("walletAddress")
    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been disconnected",
    })
  }

  // Copy address to clipboard
  const copyAddress = async () => {
    if (wallet.address) {
      await navigator.clipboard.writeText(wallet.address)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
      toast({
        title: "Address Copied",
        description: "Wallet address copied to clipboard",
      })
    }
  }

  // Check for existing connection on mount
  useEffect(() => {
    const checkConnection = async () => {
      if (isMetaMaskInstalled() && localStorage.getItem("walletConnected")) {
        try {
          const accounts = await window.ethereum.request({
            method: "eth_accounts",
          })
          if (accounts.length > 0) {
            connectWallet()
          }
        } catch (error) {
          console.error("Failed to check existing connection:", error)
        }
      }
    }
    checkConnection()
  }, [])

  // Listen for account changes
  useEffect(() => {
    if (isMetaMaskInstalled()) {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
          disconnectWallet()
        } else if (accounts[0] !== wallet.address) {
          connectWallet()
        }
      }

      const handleChainChanged = () => {
        connectWallet()
      }

      window.ethereum.on("accountsChanged", handleAccountsChanged)
      window.ethereum.on("chainChanged", handleChainChanged)

      return () => {
        window.ethereum.removeListener("accountsChanged", handleAccountsChanged)
        window.ethereum.removeListener("chainChanged", handleChainChanged)
      }
    }
  }, [wallet.address])

  if (!wallet.connected) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            <Wallet className="h-5 w-5" />
            Connect Wallet
          </CardTitle>
          <CardDescription>Connect your MetaMask wallet to access Web3 features</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!isMetaMaskInstalled() ? (
            <div className="text-center space-y-4">
              <p className="text-sm text-muted-foreground">MetaMask is required to connect your wallet</p>
              <Button onClick={() => window.open("https://metamask.io/download/", "_blank")} className="w-full">
                <ExternalLink className="h-4 w-4 mr-2" />
                Install MetaMask
              </Button>
            </div>
          ) : (
            <Button onClick={connectWallet} disabled={isConnecting} className="w-full">
              {isConnecting ? "Connecting..." : "Connect MetaMask"}
            </Button>
          )}
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Wallet className="h-5 w-5 text-green-500" />
            Wallet Connected
          </span>
          <Button variant="outline" size="sm" onClick={disconnectWallet}>
            Disconnect
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Address</label>
          <div className="flex items-center gap-2">
            <code className="flex-1 p-2 bg-muted rounded text-sm">
              {wallet.address?.slice(0, 6)}...{wallet.address?.slice(-4)}
            </code>
            <Button variant="outline" size="sm" onClick={copyAddress}>
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Balance</label>
          <p className="p-2 bg-muted rounded text-sm">{wallet.balance} ETH</p>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Network</label>
          <p className="p-2 bg-muted rounded text-sm">{wallet.network}</p>
        </div>
      </CardContent>
    </Card>
  )
}
