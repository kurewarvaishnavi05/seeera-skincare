const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

async function run() {
  await mongoose.connect('mongodb+srv://vaishnavikurewar:vN3Dk5q52wT4z4Wj@cluster0.p716t.mongodb.net/test?retryWrites=true&w=majority');
  
  const db = mongoose.connection.useDb('test');
  const User = db.collection('users');
  
  const email = 'kurewarvaishnavi05@gmail.com';
  const user = await User.findOne({email});
  
  console.log('User found:', !!user);
  const hash = await bcrypt.hash('password123', 10);
  
  if (user) {
    await User.updateOne({email}, {$set: {password: hash}});
    console.log('Password reset to: password123');
  } else {
    await User.insertOne({ 
      name: 'Vaishnavi', 
      email, 
      password: hash, 
      role: 'user', 
      createdAt: new Date(), 
      updatedAt: new Date() 
    });
    console.log('User created with password: password123');
  }
  process.exit(0);
}

run().catch(console.error);
