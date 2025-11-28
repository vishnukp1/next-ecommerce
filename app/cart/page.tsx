"use client";

import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function CartPage() {
  const { cart, removeFromCart, cartTotal } = useCart();
  
  // Fix Hydration Error: Ensure we only render after mounting on client
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Avoids server/client mismatch

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <p className="text-gray-500 mb-8">Looks like you haven't added anything yet.</p>
        <Link 
          href="/" 
          className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Cart Items List */}
        <div className="lg:col-span-2 space-y-6">
          {cart.map((item) => (
            <div key={item.id} className="flex gap-4 border-b pb-6">
              <div className="w-24 h-24 bg-gray-100 rounded-md overflow-hidden relative">
                 {/* Replace with Next/Image in production */}
                 <img src={item.image || "https://placehold.co/400"} alt={item.name} className="object-cover w-full h-full" />
              </div>
              
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-lg">{item.name}</h3>
                  <p className="font-medium">${item.price}</p>
                </div>
                <p className="text-gray-500 text-sm mt-1">Quantity: {item.quantity}</p>
                
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 text-sm mt-4 flex items-center gap-1 hover:text-red-700"
                >
                  <Trash2 size={16} /> Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 p-6 rounded-lg sticky top-24">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">${cartTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-4">
              <span className="text-gray-600">Shipping</span>
              <span className="text-green-600">Free</span>
            </div>
            <div className="border-t pt-4 flex justify-between mb-6">
              <span className="font-bold text-lg">Total</span>
              <span className="font-bold text-lg">${cartTotal.toFixed(2)}</span>
            </div>
            
            <button className="w-full bg-black text-white py-3 rounded-md font-medium hover:bg-gray-800 transition">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}