import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Address from '@/models/Address';
import { protect } from '@/lib/auth';

export async function GET(request) {
  try {
    const user = await protect(request);
    await dbConnect();
    
    const addresses = await Address.find({ user: user._id });
    return NextResponse.json({ success: true, data: addresses });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 401 });
  }
}

export async function POST(request) {
  try {
    const user = await protect(request);
    await dbConnect();
    
    const body = await request.json();
    
    // If this is set to default, unset others
    if (body.isDefault) {
      await Address.updateMany({ user: user._id }, { isDefault: false });
    }

    const address = await Address.create({
      ...body,
      user: user._id
    });

    return NextResponse.json({ success: true, data: address }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 400 });
  }
}
