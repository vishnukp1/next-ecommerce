// app/admin/page.tsx
"use client";

import { useState } from "react";

export default function AdminPage() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: 0,
    category: "",
    imageUrl: "", // Using URL instead of file upload for simplicity
    stock: 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/products", {
      method: "POST",
      body: JSON.stringify(form),
    });

    if (res.ok) {
      alert("Product added!");
      setForm({ name: "", description: "", price: 0, category: "", imageUrl: "", stock: 0 });
    } else {
      alert("Failed to add product");
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-6">Add Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          placeholder="Product Name"
          className="w-full border p-2 rounded"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <textarea
          placeholder="Description"
          className="w-full border p-2 rounded"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        />
        <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            placeholder="Price"
            className="w-full border p-2 rounded"
            onChange={(e) => setForm({ ...form, price: parseFloat(e.target.value) })}
            required
          />
          <input
            type="number"
            placeholder="Stock"
            className="w-full border p-2 rounded"
            onChange={(e) => setForm({ ...form, stock: parseInt(e.target.value) })}
            required
          />
        </div>
        <input
          placeholder="Category"
          className="w-full border p-2 rounded"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          required
        />
        <input
          placeholder="Image URL (e.g. from Unsplash)"
          className="w-full border p-2 rounded"
          value={form.imageUrl}
          onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
          required
        />
        <button className="w-full bg-blue-600 text-white p-2 rounded">
          Create Product
        </button>
      </form>
    </div>
  );
}