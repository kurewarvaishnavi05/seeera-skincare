import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import jwt from 'jsonwebtoken';

export async function POST(request) {
  try {
    await dbConnect();
    const { name, email, password, phone } = await request.json();

    // Check if user exists
    let user = await User.findOne({ email });
    if (user) {
      return NextResponse.json({ success: false, message: 'User already exists' }, { status: 400 });
    }

    // Create user
    user = await User.create({
      name,
      email,
      password,
      phone
    });

    // Create token
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '30d'
    });

    return NextResponse.json({ success: true, token, data: { _id: user._id, name: user.name, email: user.email, role: user.role } }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 400 });
  }
}
