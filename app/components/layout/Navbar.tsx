"use client";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { ShoppingBag, User } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react"; // 1. Import hooks

export default function Navbar() {
  const { cart } = useCart();
  const { data: session } = useSession();
  const [mounted, setMounted] = useState(false); // 2. Add state

  // 3. Set mounted to true only after client loads
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav className="border-b bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold tracking-tight text-gray-900">
          MyShop
        </Link>
        <div className="flex items-center gap-6">
          <Link href="/cart" className="relative text-gray-600 hover:text-black">
            <ShoppingBag size={24} />
            {/* 4. Only show badge if mounted and cart has items */}
            {mounted && cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-in zoom-in">
                {cart.length}
              </span>
            )}
          </Link>

          {/* Auth Section */}
          {session ? (
            <div className="flex gap-4 items-center">
              <span className="text-sm font-medium">{session.user?.name}</span>
              <button onClick={() => signOut()} className="text-sm text-red-500">Logout</button>
            </div>
          ) : (
            <Link href="/login" className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-black">
              <User size={20} /> Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}