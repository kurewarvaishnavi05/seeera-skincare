import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import Product from '@/models/Product';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import { products } from '@/lib/products';

export async function GET() {
  try {
    await dbConnect();

    // 1. Clear existing data
    await Product.deleteMany({});
    await User.deleteMany({});

    // 2. Insert Admin User
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);
    
    await User.create({
      name: 'Admin',
      email: 'admin@seeera.com',
      password: hashedPassword,
      role: 'admin'
    });

    // 3. Insert Products
    const dbProducts = products.map(p => ({
      name: p.name,
      slug: p.slug,
      description: p.description || 'Premium skincare product by Seeera.',
      price: p.price,
      image: p.image || '/images/hero-woman.jpg',
      category: p.tags?.[0] || 'Skincare',
      inStock: true,
      inventoryCount: 100,
    }));

    await Product.insertMany(dbProducts);

    return NextResponse.json({ message: 'Database seeded successfully with admin user and products', success: true });
  } catch (error: any) {
    console.error('Seed Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
