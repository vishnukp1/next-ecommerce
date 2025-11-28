import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Create Admin
  const hashedPassword = await bcrypt.hash('password123', 10)
  await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      name: 'Admin User',
      password: hashedPassword,
      role: 'ADMIN',
    },
  })

  // Create Demo Products
  await prisma.product.createMany({
    data: [
      {
        name: "Minimalist Watch",
        description: "Elegant time piece.",
        price: 120.00,
        category: "Accessories",
        images: ["https://placehold.co/400"],
        stock: 50
      },
      {
        name: "Leather Backpack",
        description: "Durable and stylish.",
        price: 85.00,
        category: "Bags",
        images: ["https://placehold.co/400"],
        stock: 20
      }
    ]
  })
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect())