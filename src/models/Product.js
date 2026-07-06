import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a product name'],
    trim: true,
    maxlength: [100, 'Name cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please provide product description'],
    maxlength: [2000, 'Description cannot be more than 2000 characters']
  },
  price: {
    type: Number,
    required: [true, 'Please provide product price'],
    min: [0, 'Price must be greater than or equal to 0']
  },
  images: [
    {
      type: String, // Cloudinary URLs will go here
    }
  ],
  category: {
    type: String,
    required: [true, 'Please select category for this product'],
    enum: {
      values: [
        'Sunscreen',
        'Lip Care',
        'Face Wash',
        'Serum',
        'Moisturizer',
        'Body Care'
      ],
      message: 'Please select correct category for product'
    }
  },
  stock: {
    type: Number,
    required: [true, 'Please provide product stock'],
    default: 0
  },
  ingredients: {
    type: [String],
    default: []
  },
  benefits: {
    type: [String],
    default: []
  },
  rating: {
    type: Number,
    default: 0
  },
  numOfReviews: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Avoid OverwriteModelError in Next.js development
export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
