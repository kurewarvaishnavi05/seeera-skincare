import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import Order from '@/models/Order';
import { headers } from 'next/headers';
import jwt from 'jsonwebtoken';

async function getUserFromToken() {
  const authorization = headers().get('authorization');
  if (!authorization || !authorization.startsWith('Bearer ')) return null;
  
  try {
    const token = authorization.split(' ')[1];
    const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_key_for_dev';
    return jwt.verify(token, JWT_SECRET) as any;
  } catch (error) {
    return null;
  }
}

export async function GET(req: Request) {
  try {
    const user = await getUserFromToken();
    if (!user) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const orders = await Order.find({ user: user.id }).sort({ createdAt: -1 });
    
    return NextResponse.json({ success: true, data: orders }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Server Error' }, { status: 500 });
  }
}
