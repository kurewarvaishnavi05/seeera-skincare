import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Order from '@/models/Order';
import { protect } from '@/lib/auth';

export async function POST(request) {
  try {
    const user = await protect(request);
    await dbConnect();
    
    const { 
      products, 
      shippingAddress, 
      paymentMethod, 
      itemsPrice, 
      taxPrice, 
      shippingPrice, 
      totalPrice 
    } = await request.json();

    if (products && products.length === 0) {
      return NextResponse.json({ success: false, message: 'No order items' }, { status: 400 });
    }

    const order = await Order.create({
      user: user._id,
      products,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice
    });

    return NextResponse.json({ success: true, data: order }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 400 });
  }
}

export async function GET(request) {
  try {
    const user = await protect(request);
    await dbConnect();
    
    // Check if admin to get all orders, otherwise just user's orders
    let orders;
    if (user.role === 'admin') {
      orders = await Order.find({}).populate('user', 'id name email');
    } else {
      orders = await Order.find({ user: user._id });
    }
    
    return NextResponse.json({ success: true, data: orders });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 401 });
  }
}
