import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import Subscriber from '@/models/Subscriber';
import nodemailer from 'nodemailer';

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

    // Send emails using Nodemailer
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      // 1. Email to the subscriber
      await transporter.sendMail({
        from: `"Seeera Skincare" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Welcome to the Seeera Community!',
        html: `
          <div style="font-family: sans-serif; text-align: center; color: #4A3B32;">
            <h1 style="color: #8C3A3A;">Welcome to Seeera!</h1>
            <p>Thank you for joining our community. We're thrilled to have you!</p>
            <p>You'll be the first to hear about new product launches, exclusive offers, and expert skincare tips.</p>
            <br/>
            <p>Stay glowing,</p>
            <p><strong>The Seeera Team</strong></p>
          </div>
        `,
      });

      // 2. Notification to the admin (your professional Google email)
      await transporter.sendMail({
        from: `"Seeera System" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_USER, // sends to the admin's own email
        subject: 'New Newsletter Subscriber!',
        text: `You have a new subscriber to the Seeera community: ${email}`,
      });
    } catch (emailError) {
      console.error('Failed to send email. Check your EMAIL_USER and EMAIL_PASS in .env.local', emailError);
      // We don't return a 500 here because the subscription to MongoDB was still successful
    }

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
