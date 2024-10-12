'use client'

import Sidebar from '../../components/Sidebar'

export default function ProfilePage() {
  return (
    <div className="flex h-screen bg-gray-100 text-gray-900">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-6 py-8">
            <h1 className="text-2xl font-semibold">Profile</h1>
          </div>
        </main>
      </div>
    </div>
  )
}