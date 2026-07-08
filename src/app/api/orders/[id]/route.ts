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

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getUserFromToken();
    if (!user) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    
    // Find order to make sure it belongs to the user or user is admin
    const order = await Order.findById(params.id);
    
    if (!order) {
      return NextResponse.json({ success: false, message: 'Order not found' }, { status: 404 });
    }
    
    if (order.user.toString() !== user.id && user.role !== 'admin') {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    await Order.findByIdAndDelete(params.id);
    
    return NextResponse.json({ success: true, message: 'Order deleted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Server Error' }, { status: 500 });
  }
}
