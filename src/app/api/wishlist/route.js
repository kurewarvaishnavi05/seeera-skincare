import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import { protect } from '@/lib/auth';

export async function GET(request) {
  try {
    const user = await protect(request);
    await dbConnect();
    
    // Populate the wishlist items
    const populatedUser = await User.findById(user._id).populate('wishlist', 'name price image');
    
    return NextResponse.json({ success: true, data: populatedUser.wishlist });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 401 });
  }
}

export async function POST(request) {
  try {
    const user = await protect(request);
    await dbConnect();
    const { productId } = await request.json();

    const currentUser = await User.findById(user._id);

    // Toggle logic
    if (currentUser.wishlist.includes(productId)) {
      // Remove from wishlist
      currentUser.wishlist = currentUser.wishlist.filter(id => id.toString() !== productId);
    } else {
      // Add to wishlist
      currentUser.wishlist.push(productId);
    }

    await currentUser.save();
    
    // Populate updated wishlist
    const updatedUser = await User.findById(user._id).populate('wishlist', 'name price image');

    return NextResponse.json({ success: true, data: updatedUser.wishlist });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 400 });
  }
}
