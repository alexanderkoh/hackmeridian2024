'use client'

import { useState } from "react"

interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  link: string;
}

function generateUniqueId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export default function AddProduct({ onProductAdded }: { onProductAdded: (product: Product) => void }) {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProduct((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const productId = generateUniqueId();
    const newProduct: Product = {
      id: productId,
      ...product,
      link: `/payment-link/${productId}`
    }
    onProductAdded(newProduct)
    setProduct({ name: "", description: "", price: "" })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Add Product</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold mb-4">Product Details</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Product Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={product.name}
                onChange={handleInputChange}
                placeholder="Enter product name"
                className="mt-1 block w-full border rounded px-3 py-2"
                required
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={product.description}
                onChange={handleInputChange}
                placeholder="Enter product description"
                className="mt-1 block w-full border rounded px-3 py-2"
                rows={4}
                required
              />
            </div>
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                Price
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={product.price}
                onChange={handleInputChange}
                placeholder="Enter price"
                className="mt-1 block w-full border rounded px-3 py-2"
                min="0"
                step="0.01"
                required
              />
            </div>
            <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Add Product
            </button>
          </form>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold mb-4">Preview</h2>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{product.name || "Product Name"}</h3>
            <p className="text-gray-600">{product.description || "Product description will appear here"}</p>
            <p className="text-xl font-bold">{product.price ? `$${product.price}` : "$0.00"}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
