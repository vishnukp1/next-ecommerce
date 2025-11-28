export let productsStore = [
  {
    id: "1",
    name: "Minimalist Watch",
    description: "A clean, modern timepiece.",
    price: 120.00,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=80",
    category: "Accessories",
    stock: 10
  },
  {
    id: "2",
    name: "Leather Backpack",
    description: "Durable and stylish.",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=500&q=80",
    category: "Bags",
    stock: 5
  }
];


export const addProduct = (product: any) => {
  productsStore.unshift(product); 
}