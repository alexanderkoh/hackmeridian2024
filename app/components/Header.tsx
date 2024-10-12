import React from 'react';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-6 py-3">
        <ul className="flex space-x-4">
          <li><Link href="/home" className="hover:text-blue-500">Home</Link></li>
          <li><Link href="/signup" className="hover:text-blue-500">Sign Up</Link></li>
          <li><Link href="/dashboard" className="hover:text-blue-500">Dashboard</Link></li>
          <li><Link href="/payment-link" className="hover:text-blue-500">Payment Link</Link></li>
        </ul>
      </nav>
    </header>
  );
}
