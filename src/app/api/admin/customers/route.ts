import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import User from '@/models/User';
import { headers } from 'next/headers';
import jwt from 'jsonwebtoken';

async function verifyAdmin() {
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

export async function GET() {
  try {
    const isAdmin = await verifyAdmin();
    if (!isAdmin) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const customers = await User.find({ role: 'user' }).sort({ createdAt: -1 });
    
    return NextResponse.json({ success: true, data: customers }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Server Error' }, { status: 500 });
  }
}
