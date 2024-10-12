'use client'

import Image from 'next/image'

export default function Navbar() {
  return (
    <header className="flex items-center justify-between h-16 px-6 bg-white border-b">
      <div className="flex items-center flex-1">
        <div className="relative">
          <input
            type="search"
            placeholder="Search..."
            className="pl-8 pr-4 py-2 w-64 border rounded"
          />
        </div>
      </div>
      <button className="rounded-full">
        <Image
          src="/placeholder.svg"
          alt="User avatar"
          width={32}
          height={32}
          className="rounded-full"
        />
        <span className="sr-only">User menu</span>
      </button>
    </header>
  )
}
