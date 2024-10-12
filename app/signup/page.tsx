'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { PasskeyKit } from 'passkey-kit'
import { env } from '../env'

// If necessary, extend the PasskeyKit type to include the generateWallet method
declare module 'passkey-kit' {
  interface PasskeyKit {
    generateWallet(): Promise<{ publicKey: string; privateKey: string }>; // Replace with actual return type
  }
}

export default function WelcomePage() {
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [passkeyKit, setPasskeyKit] = useState<PasskeyKit | null>(null)
  const router = useRouter()

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

  const handleSignUpWithPasskey = async () => {
    if (!passkeyKit) {
      console.error('PasskeyKit not initialized');
      return;
    }

    try {
      const userId = 'user-' + Date.now();
      const username = 'user@example.com'; // You might want to collect this from the user
      const { keyId, contractId } = await passkeyKit.createWallet(userId, username);

      localStorage.setItem('sp:keyId', keyId);
      localStorage.setItem(`sp:cId:${keyId}`, contractId);

      console.log('Passkey registration successful');
      router.push('/dashboard')
    } catch (error) {
      console.error('Sign up with passkey failed:', error)
    }
  }

  const handleGenerateWallet = async () => {
    if (!passkeyKit) {
      console.error('PasskeyKit not initialized');
      return;
    }

    try {
      const { keyId, contractId } = await passkeyKit.generateWallet();
      
      localStorage.setItem('sp:keyId', keyId);
      localStorage.setItem(`sp:cId:${keyId}`, contractId);

      console.log('Wallet generated', { keyId, contractId });
      router.push('/dashboard')
    } catch (error) {
      console.error('Wallet generation failed:', error)
    }
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
              onClick={handleSignUpWithPasskey}
              disabled={!agreedToTerms}
              className="w-full sm:w-1/2 justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              Sign Up with Passkey
            </button>
            <button
              onClick={handleGenerateWallet}
              disabled={!agreedToTerms}
              className="w-full sm:w-1/2 justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
            >
              Generate Wallet
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
