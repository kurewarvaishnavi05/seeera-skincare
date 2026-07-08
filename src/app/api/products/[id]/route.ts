import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import Product from '@/models/Product';
import { headers } from 'next/headers';
import jwt from 'jsonwebtoken';

// Helper to check admin
async function isAdmin() {
  const authorization = headers().get('authorization');
  if (!authorization || !authorization.startsWith('Bearer ')) return { auth: false, reason: 'Missing or invalid token format' };
  
  try {
    const token = authorization.split(' ')[1];
    const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_key_for_dev';
    const decoded: any = jwt.verify(token, JWT_SECRET);
    if (decoded.role !== 'admin') return { auth: false, reason: 'User is not admin' };
    return { auth: true };
  } catch (error: any) {
    return { auth: false, reason: 'Token verification failed: ' + error.message };
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const adminCheck = await isAdmin();
    if (!adminCheck.auth) {
      return NextResponse.json({ message: 'Unauthorized', details: adminCheck.reason }, { status: 401 });
    }

    await dbConnect();
    const data = await req.json();
    const product = await Product.findByIdAndUpdate(params.id, data, { new: true });
    
    if (!product) return NextResponse.json({ message: 'Product not found' }, { status: 404 });
    return NextResponse.json(product, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: 'Server Error' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const adminCheck = await isAdmin();
    if (!adminCheck.auth) {
      return NextResponse.json({ success: false, message: 'Unauthorized', details: adminCheck.reason }, { status: 401 });
    }

    await dbConnect();
    const product = await Product.findByIdAndDelete(params.id);
    
    if (!product) return NextResponse.json({ success: false, message: 'Product not found' }, { status: 404 });
    return NextResponse.json({ success: true, message: 'Product deleted' }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: 'Server Error' }, { status: 500 });
  }
}
