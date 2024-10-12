'use client'

import { useState, useEffect } from 'react'
import { PasskeyKit } from 'passkey-kit'
import { env } from '../env'

interface CheckoutData {
  companyName: string
  itemName: string
  amount: number
  currency: string
}

const dummyData: CheckoutData = {
  companyName: "Alice's Company",
  itemName: "Basic Website Development",
  amount: 1000,
  currency: "USD"
}

export default function PaymentLinkPage() {
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [isConnected, setIsConnected] = useState(false)
  const [canPay, setCanPay] = useState(false)
  const [data] = useState<CheckoutData>(dummyData)
  const [passkeyKit, setPasskeyKit] = useState<PasskeyKit | null>(null)
  const [accountBalance, setAccountBalance] = useState<string | null>(null)

  useEffect(() => {
    const initPasskeyKit = () => {
      if (env.PUBLIC_rpcUrl && env.PUBLIC_networkPassphrase && env.PUBLIC_factoryContractId) {
        const kit = new PasskeyKit({
          rpcUrl: env.PUBLIC_rpcUrl,
          networkPassphrase: env.PUBLIC_networkPassphrase,
          factoryContractId: env.PUBLIC_factoryContractId,
        });
        setPasskeyKit(kit);
      } else {
        console.error('Environment variables are not set correctly');
      }
    };

    initPasskeyKit();
  }, []);

  useEffect(() => {
    const allFieldsFilled = email !== '' && phone !== ''
    setCanPay(allFieldsFilled && isConnected)
  }, [email, phone, isConnected])

  const handleConnectWallet = async () => {
    if (!passkeyKit) {
      console.error('PasskeyKit not initialized');
      return;
    }

    try {
      const { keyId, contractId } = await passkeyKit.connectWallet();
      const keyIdString = Buffer.from(keyId).toString('hex');
      localStorage.setItem('sp:keyId', keyIdString);
      localStorage.setItem(`sp:cId:${keyIdString}`, contractId);
      setIsConnected(true);
      await fetchAccountBalance(contractId);
    } catch (error) {
      console.error('Connect wallet failed:', error)
    }
  }

  const handleCreateWallet = async () => {
    if (!passkeyKit) {
      console.error('PasskeyKit not initialized');
      return;
    }

    try {
      const userId = 'user-' + Date.now();
      const username = email; // Use email as username
      const { keyId, contractId } = await passkeyKit.createWallet(userId, username);
      const keyIdString = Buffer.from(keyId).toString('hex');
      localStorage.setItem('sp:keyId', keyIdString);
      localStorage.setItem(`sp:cId:${keyIdString}`, contractId);
      setIsConnected(true);
      await fetchAccountBalance(contractId);
    } catch (error) {
      console.error('Create wallet failed:', error)
    }
  }

  const fetchAccountBalance = async (contractId: string) => {
    if (!passkeyKit) {
      console.error('PasskeyKit not initialized');
      return;
    }

    try {
      const balance = await passkeyKit.getBalance(contractId);
      setAccountBalance(balance.toString());
    } catch (error) {
      console.error('Failed to fetch account balance:', error);
    }
  }

  const handlePay = () => {
    if (canPay) {
      console.log('Processing payment...')
      // Implement payment logic here
    }
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Column */}
      <div className="w-full md:w-1/2 bg-gray-100 p-8">
        <h1 className="text-2xl font-bold mb-6 text-gray-900">{data.companyName}</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">Payment Details</h2>
          <div className="mb-4">
            <p className="font-medium text-gray-900">Item: {data.itemName}</p>
            <p className="text-2xl font-bold text-gray-900">{data.amount} {data.currency}</p>
          </div>
          <div className="border-t pt-4">
            <p className="flex justify-between text-gray-900"><span>Subtotal</span><span>{data.amount} {data.currency}</span></p>
            <p className="flex justify-between font-bold mt-2 text-gray-900"><span>Total Due Today</span><span>{data.amount} {data.currency}</span></p>
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div className="w-full md:w-1/2 p-8 bg-black">
        <h2 className="text-xl font-semibold mb-6 text-white">Contact</h2>
        <div className="space-y-4 mb-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white">Email</label>
            <input 
              id="email" 
              type="email" 
              placeholder="you@example.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full border rounded px-3 py-2 text-gray-900"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-white">Phone</label>
            <input 
              id="phone" 
              type="tel" 
              placeholder="+1 (555) 000-0000" 
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-1 block w-full border rounded px-3 py-2 text-gray-900"
            />
          </div>
        </div>

        <div className="space-y-4">
          {!isConnected && (
            <>
              <button 
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded" 
                onClick={handleConnectWallet}
              >
                Connect Wallet
              </button>
              <button 
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded" 
                onClick={handleCreateWallet}
              >
                Create New Wallet
              </button>
            </>
          )}
          {isConnected && (
            <button 
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" 
              onClick={handlePay}
              disabled={!canPay}
            >
              Pay
            </button>
          )}
        </div>

        {isConnected && accountBalance !== null && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2 text-white">Account Balance</h3>
            <p className="text-2xl font-bold text-white">{accountBalance} {data.currency}</p>
          </div>
        )}
      </div>
    </div>
  )
}

