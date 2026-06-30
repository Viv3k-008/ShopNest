const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const connectDB = require('./config/database');
const User = require('./model/User');
const Product = require('./model/Product');
const Order = require('./model/Order');

dotenv.config();

const importData = async () => {
  try {
    await connectDB();

    await Promise.all([
      User.deleteMany({}),
      Product.deleteMany({}),
      Order.deleteMany({}),
    ]);

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('123456', salt);

    const users = await User.insertMany([
      {
        name: 'Admin User',
        email: 'admin@shopnest.com',
        password: hashedPassword,
        role: 'admin',
        verified: true,
      },
      {
        name: 'John Doe',
        email: 'john@example.com',
        password: hashedPassword,
        role: 'user',
        verified: true,
      },
      {
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: hashedPassword,
        role: 'user',
        verified: false,
      },
    ]);

    const products = await Product.insertMany([
      {
        name: 'Wireless Noise-Cancelling Headphones',
        description: 'Immersive sound experience with advanced active noise cancellation.',
        price: 299.99,
        category: 'Electronics',
        stock: 15,
        imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
        ratings: 4.8,
        numReviews: 24,
      },
      {
        name: 'Minimalist Modern Chair',
        description: 'A stylish and comfortable addition to any contemporary living room.',
        price: 150.0,
        category: 'Furniture',
        stock: 30,
        imageUrl: 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
        ratings: 4.2,
        numReviews: 12,
      },
      {
        name: 'Professional DSLR Camera',
        description: 'Capture stunning moments with high-resolution clarity and speed.',
        price: 1199.99,
        category: 'Electronics',
        stock: 8,
        imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
        ratings: 4.9,
        numReviews: 50,
      },
      {
        name: 'Classic White Sneakers',
        description: 'Versatile and comfortable, a staple for any casual outfit.',
        price: 85.0,
        category: 'Clothing',
        stock: 50,
        imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
        ratings: 4.5,
        numReviews: 89,
      },
    ]);

    const orders = await Order.insertMany([
      {
        user: users[1]._id,
        products: [
          { productId: products[0]._id, quantity: 1, price: products[0].price },
          { productId: products[2]._id, quantity: 1, price: products[2].price },
        ],
        totalPrice: products[0].price + products[2].price,
        address: {
          fullName: 'John Doe',
          street: '123 Main Street',
          city: 'Mumbai',
          postalCode: '400001',
          country: 'India',
        },
        paymentId: 'pay_seed_001',
        status: 'Delivered',
      },
      {
        user: users[2]._id,
        products: [
          { productId: products[1]._id, quantity: 2, price: products[1].price },
          { productId: products[3]._id, quantity: 1, price: products[3].price },
        ],
        totalPrice: products[1].price * 2 + products[3].price,
        address: {
          fullName: 'Jane Smith',
          street: '45 Park Avenue',
          city: 'Delhi',
          postalCode: '110001',
          country: 'India',
        },
        paymentId: 'cod_seed_001',
        status: 'Pending',
      },
    ]);

    console.log('✅ Data imported successfully!');
    console.log(`Created ${users.length} users, ${products.length} products, and ${orders.length} orders.`);
    console.log('\n📋 Seeded login credentials:');
    users.forEach((user) => {
      console.log(`- ${user.email} | password: 123456 | role: ${user.role}`);
    });
  } catch (error) {
    console.error('❌ Error with data import:', error.message);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
};

importData();