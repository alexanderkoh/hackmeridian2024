'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function WelcomePage() {
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const router = useRouter()

  const handleGenerateWallet = () => {
    // Implement wallet generation logic here
    console.log('Generating wallet')
  }

  const handleSignUp = () => {
    // For now, we'll just redirect to the dashboard
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900">HackMeridian</h1>
          <p className="mt-2 text-sm text-gray-600">Choose an option to get started</p>
        </div>
        <div className="mt-8 space-y-6">
          <div className="flex items-center justify-center">
            <input 
              type="checkbox"
              id="terms" 
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" 
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
              I agree to the <Link href="/terms" className="text-indigo-600 hover:text-indigo-500">Terms and Conditions</Link>
            </label>
          </div>

          <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
            <button
              onClick={handleGenerateWallet}
              disabled={!agreedToTerms}
              className="w-full sm:w-1/2 justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
            >
              Generate Wallet
            </button>
            <button
              onClick={handleSignUp}
              disabled={!agreedToTerms}
              className="w-full sm:w-1/2 justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
