import React from 'react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <Link href="/dashboard">Go to Dashboard</Link>
    </div>
  );
}
