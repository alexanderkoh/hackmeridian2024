'use client'

import { useState, useEffect } from 'react'

interface CheckoutData {
  companyName: string
  itemName: string
  amount: number
  currency: string
}

// Dummy data for testing
const dummyData: CheckoutData = {
  companyName: "Alice's Company",
  itemName: "Basic Website Development",
  amount: 1000,
  currency: "USD"
}

export default function PaymentLinkPage() {
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [isSignedUp, setIsSignedUp] = useState(false)
  const [isWalletGenerated, setIsWalletGenerated] = useState(false)
  const [canPay, setCanPay] = useState(false)
  const [data] = useState<CheckoutData>(dummyData)

  useEffect(() => {
    const allFieldsFilled = email !== '' && phone !== ''
    const walletReady = isSignedUp || isWalletGenerated
    setCanPay(allFieldsFilled && walletReady)
  }, [email, phone, isSignedUp, isWalletGenerated])

  const handleSignUp = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      setIsSignedUp(true)
      console.log('User signed up and wallet connected via passkey')
    } catch (error) {
      console.error('Sign up failed:', error)
    }
  }

  const handleGenerateWallet = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      setIsWalletGenerated(true)
      console.log('Wallet generated successfully')
    } catch (error) {
      console.error('Wallet generation failed:', error)
    }
  }

  const handlePay = () => {
    if (canPay) {
      console.log('Processing payment...')
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
          <button 
            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded" 
            onClick={handleSignUp}
            disabled={isSignedUp}
          >
            {isSignedUp ? 'Signed Up & Wallet Connected' : 'Sign Up & Connect Wallet'}
          </button>
          <button 
            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded" 
            onClick={handleGenerateWallet}
            disabled={isWalletGenerated}
          >
            {isWalletGenerated ? 'Wallet Generated' : 'Generate Wallet'}
          </button>
          <button 
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" 
            onClick={handlePay}
            disabled={!canPay}
          >
            Pay
          </button>
        </div>

        {(isSignedUp || isWalletGenerated) && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2 text-white">Account Balance</h3>
            <p className="text-2xl font-bold text-white">$12,345.67 <span className="text-green-600 text-sm">+2.5%</span></p>
            <p className="text-xl text-white">$10,000.00 <span className="text-green-600 text-sm">+1.2%</span></p>
          </div>
        )}
      </div>
    </div>
  )
}
