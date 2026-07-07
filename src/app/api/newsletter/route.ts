import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import Subscriber from '@/models/Subscriber';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ message: 'Email is required' }, { status: 400 });
    }

    await dbConnect();

    // Check if subscriber already exists
    const existingSubscriber = await Subscriber.findOne({ email });
    if (existingSubscriber) {
      return NextResponse.json(
        { message: 'You are already subscribed to our newsletter!' },
        { status: 400 }
      );
    }

    // Create new subscriber
    await Subscriber.create({ email });

    return NextResponse.json(
      { message: 'Successfully subscribed to the newsletter!' },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Newsletter Subscription Error:', error);
    
    // Handle mongoose validation errors
    if (error.name === 'ValidationError') {
      return NextResponse.json({ message: 'Please provide a valid email address' }, { status: 400 });
    }

    return NextResponse.json(
      { message: 'An error occurred while subscribing. Please try again later.' },
      { status: 500 }
    );
  }
}
