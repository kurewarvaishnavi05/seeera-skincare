import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Review from '@/models/Review';
import Product from '@/models/Product';
import { protect } from '@/lib/auth';

export async function GET(request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('productId');
    
    let query = {};
    if (productId) {
      query.product = productId;
    }

    const reviews = await Review.find(query).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, count: reviews.length, data: reviews });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 400 });
  }
}

export async function POST(request) {
  try {
    const user = await protect(request);
    await dbConnect();
    
    const { productId, rating, comment, photo } = await request.json();

    const product = await Product.findById(productId);
    if (!product) {
      return NextResponse.json({ success: false, message: 'Product not found' }, { status: 404 });
    }

    // Check if already reviewed
    const alreadyReviewed = await Review.findOne({
      product: productId,
      user: user._id
    });

    if (alreadyReviewed) {
      return NextResponse.json({ success: false, message: 'Product already reviewed' }, { status: 400 });
    }

    const review = await Review.create({
      product: productId,
      user: user._id,
      name: user.name,
      rating: Number(rating),
      comment,
      photo
    });

    // Update product rating
    const reviews = await Review.find({ product: productId });
    product.numOfReviews = reviews.length;
    product.rating = reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length;
    await product.save();

    return NextResponse.json({ success: true, data: review }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 400 });
  }
}
