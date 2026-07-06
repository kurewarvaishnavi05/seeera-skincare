import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Cart from '@/models/Cart';
import { protect } from '@/lib/auth';

export async function GET(request) {
  try {
    const user = await protect(request);
    await dbConnect();
    
    let cart = await Cart.findOne({ user: user._id }).populate('items.product', 'name price image');
    if (!cart) {
      cart = await Cart.create({ user: user._id, items: [], totalPrice: 0 });
    }
    
    return NextResponse.json({ success: true, data: cart });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 401 });
  }
}

export async function POST(request) {
  try {
    const user = await protect(request);
    await dbConnect();
    const { productId, quantity, price } = await request.json();

    let cart = await Cart.findOne({ user: user._id });

    if (cart) {
      // Check if product already exists in cart
      const itemIndex = cart.items.findIndex(p => p.product.toString() === productId);

      if (itemIndex > -1) {
        // Product exists in cart, update quantity
        let productItem = cart.items[itemIndex];
        productItem.quantity += quantity;
        cart.items[itemIndex] = productItem;
      } else {
        // Product does not exist, add it
        cart.items.push({ product: productId, quantity, price });
      }
      
      // Calculate total price
      cart.totalPrice = cart.items.reduce((acc, item) => acc + item.quantity * item.price, 0);
      cart = await cart.save();
    } else {
      // No cart exists, create new one
      const totalPrice = quantity * price;
      cart = await Cart.create({
        user: user._id,
        items: [{ product: productId, quantity, price }],
        totalPrice
      });
    }

    return NextResponse.json({ success: true, data: cart });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 400 });
  }
}

export async function DELETE(request) {
  try {
    const user = await protect(request);
    await dbConnect();
    
    // Clear cart entirely
    const cart = await Cart.findOneAndUpdate(
      { user: user._id },
      { items: [], totalPrice: 0 },
      { new: true }
    );
    
    return NextResponse.json({ success: true, data: cart });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 400 });
  }
}
