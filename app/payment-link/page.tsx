import React from 'react';

export default function PaymentLink() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Payment Link</h1>
        <p className="mb-4">Use the link below to complete your payment:</p>
        <div className="bg-gray-100 p-4 rounded">
          <code className="text-sm">https://example.com/pay/abc123</code>
        </div>
        <button className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
          Copy Link
        </button>
      </div>
    </div>
  );
}
