"use client";
import { useCart } from "@/context/CartContext";

export default function ProductCard({ product }: { product: any }) {
  const { addToCart } = useCart();

  return (
    <div className="group relative border rounded-lg overflow-hidden bg-white hover:shadow-lg transition-shadow">
      <div className="aspect-square bg-gray-100 relative">
         {/* Placeholder for real image */}
         <img 
            src={product.images[0] || "https://placehold.co/400"} 
            alt={product.name} 
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
         />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 truncate">{product.name}</h3>
        <p className="text-sm text-gray-500 mt-1">{product.category}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900">${product.price}</span>
          <button
            onClick={() => addToCart(product)}
            className="bg-black text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}