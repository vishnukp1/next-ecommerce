import { prisma } from "@/libs/prismadb";
import Link from "next/link";
import ProductCard from "./components/ProductCard";

// 1. Fetch data directly from DB (Server Side)
async function getProducts() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });
  return products;
}

export default async function Home() {
  const products = await getProducts();

  return (
    <main className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Featured Products</h1>

        {/* Link to Admin Page */}
        <Link
          href="/admin/products/new"
          className="text-sm bg-gray-100 px-4 py-2 rounded hover:bg-gray-200"
        >
          + Add Product (Admin)
        </Link>
      </div>

      {/* 2. Show the Grid */}
      {products.length === 0 ? (
        <p className="text-gray-500 text-center">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </main>
  );
}
