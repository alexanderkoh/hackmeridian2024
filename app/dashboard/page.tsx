'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Sidebar from '../components/Sidebar'
import { PasskeyKit } from 'passkey-kit'
import { env } from '../env'

export default function DashboardPage() {
  const router = useRouter()
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    const checkWalletConnection = async () => {
      const storedKeyId = localStorage.getItem('sp:keyId')
      if (storedKeyId) {
        const storedContractId = localStorage.getItem(`sp:cId:${storedKeyId}`)
        if (storedContractId) {
          setIsConnected(true)
          // Here you can fetch wallet balance or perform other operations
        } else {
          router.push('/signup')
        }
      } else {
        router.push('/signup')
      }
    }

    checkWalletConnection()
  }, [router])

  if (!isConnected) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex h-screen bg-gray-100 text-gray-900">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-6 py-8">
            <h1 className="text-2xl font-semibold mb-6">Overview</h1>
            <div className="grid gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
              {[
                { title: 'Total Revenue', value: '$120K', change: '+5%', icon: '$' },
                { title: 'Total Sales', value: '$75K', change: '+2%', icon: '$' },
                { title: 'Total Costs', value: '$10K', change: '-1%', icon: '$' },
                { title: 'New Customers', value: '150', change: '+10%', icon: '#' },
              ].map((item, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow">
                  <div className="flex justify-between items-center mb-2">
                    <h2 className="text-sm font-medium">{item.title}</h2>
                    <span className="text-2xl font-bold">{item.icon}</span>
                  </div>
                  <div className="text-2xl font-bold">{item.value}</div>
                  <p className={`text-xs ${item.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                    {item.change} from last month
                  </p>
                </div>
              ))}
            </div>

            {/* Gross Volume Chart */}
            <div className="bg-white p-4 rounded-lg shadow mb-8">
              <h2 className="text-lg font-semibold mb-4">Gross Volume</h2>
              <div className="h-80 flex items-end justify-between">
                {[40, 25, 60, 30, 45, 60, 70, 80, 65, 75, 50, 70].map((height, index) => (
                  <div key={index} className="w-8 bg-blue-500 rounded-t" style={{ height: `${height}%` }}></div>
                ))}
              </div>
              <div className="flex justify-between mt-4">
                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month) => (
                  <div key={month} className="text-xs text-gray-500">{month}</div>
                ))}
              </div>
            </div>

            {/* Add Widget Button */}
            <div className="text-right">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Add Widget
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
