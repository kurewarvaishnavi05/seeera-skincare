import jwt from 'jsonwebtoken';
import User from '@/models/User';
import dbConnect from './mongodb';

export async function protect(request) {
  let token;

  const authHeader = request.headers.get('authorization');

  if (authHeader && authHeader.startsWith('Bearer')) {
    try {
      token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      await dbConnect();
      const user = await User.findById(decoded.id).select('-password');
      
      if (!user) {
        throw new Error('Not authorized to access this route');
      }

      return user;
    } catch (error) {
      throw new Error('Not authorized to access this route');
    }
  }

  if (!token) {
    throw new Error('Not authorized to access this route, no token');
  }
}
