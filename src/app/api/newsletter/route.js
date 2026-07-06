import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Newsletter from '@/models/Newsletter';

export async function POST(request) {
  try {
    await dbConnect();
    const { email } = await request.json();
    
    // Check if already subscribed
    let subscriber = await Newsletter.findOne({ email });
    
    if (subscriber) {
      if (!subscriber.isActive) {
        subscriber.isActive = true;
        await subscriber.save();
        return NextResponse.json({ success: true, message: 'Resubscribed successfully' }, { status: 200 });
      }
      return NextResponse.json({ success: false, message: 'Email already subscribed' }, { status: 400 });
    }

    subscriber = await Newsletter.create({ email });

    return NextResponse.json({ success: true, data: subscriber }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 400 });
  }
}

export async function GET(request) {
  try {
    // Admin only
    await dbConnect();
    const subscribers = await Newsletter.find({ isActive: true }).sort({ subscribedAt: -1 });
    
    return NextResponse.json({ success: true, count: subscribers.length, data: subscribers });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 400 });
  }
}
