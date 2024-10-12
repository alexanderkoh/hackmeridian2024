'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Sidebar() {
  const [activeNav, setActiveNav] = useState('Overview')

  const navItems = [
    { name: 'Overview', icon: '🏠', href: '/dashboard' },
    { name: 'My Products', icon: '📦', href: '/dashboard/my-products' },
    { name: 'Profile', icon: '👤', href: '/dashboard/profile' },
    { name: 'Settings', icon: '⚙️', href: '/dashboard/settings' },
  ]

  return (
    <div className="w-64 bg-white border-r">
      <div className="flex items-center justify-center h-16 border-b">
        <span className="text-xl font-bold">Soropay</span>
      </div>
      <nav className="mt-6">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 ${
              activeNav === item.name ? 'bg-gray-100' : ''
            }`}
            onClick={() => setActiveNav(item.name)}
          >
            <span className="mr-3">{item.icon}</span>
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  )
}
