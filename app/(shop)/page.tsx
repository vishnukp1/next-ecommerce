import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/product/ProductCard";

// Server Component (Direct DB Access)
async function getProducts() {
  const products = await prisma.product.findMany({
    take: 20,
    orderBy: { createdAt: "desc" },
  });
  return products;
}

export default async function Home() {
  const products = await getProducts();

  return (
    <main className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
          New Arrivals
        </h1>
        <p className="mt-4 text-gray-500">Check out the latest trends.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}