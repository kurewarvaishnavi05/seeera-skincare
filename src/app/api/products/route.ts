import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import Product from '@/models/Product';
import { headers } from 'next/headers';
import jwt from 'jsonwebtoken';

export const dynamic = 'force-dynamic';

// Helper to check admin
async function isAdmin() {
  const authorization = headers().get('authorization');
  if (!authorization || !authorization.startsWith('Bearer ')) return false;
  
  try {
    const token = authorization.split(' ')[1];
    const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_key_for_dev';
    const decoded: any = jwt.verify(token, JWT_SECRET);
    return decoded.role === 'admin';
  } catch (error) {
    return false;
  }
}

export async function GET(req: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    
    let filter = {};
    if (category && category !== 'All') {
      filter = { category };
    }
    
    const products = await Product.find(filter).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: products }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Server Error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    if (!(await isAdmin())) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const data = await req.json();
    const product = await Product.create(data);
    return NextResponse.json(product, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message || 'Server Error' }, { status: 500 });
  }
}
