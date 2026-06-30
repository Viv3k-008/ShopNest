const Order = require("../model/Order");

const sendEmail = require("../utils/sendEmail");

// Create a new order
const createOrder = async (req, res) => {
  try {
    const { products, totalPrice, address, paymentId } = req.body;
    if (!products || products.length === 0 || !totalPrice || !address || !paymentId) {
      return res.status(400).json({ message: "Invalid order data" });
    }
    const order = new Order({
      user: req.user._id,
      products,
      totalPrice,
      address,
      paymentId
    });
    await order.save();

    const message = `Dear ${req.user.name},\n\nYour order has been successfully placed. Here are the details:\n\nOrder ID: ${order._id}\nTotal Price: $${order.totalPrice}\nPayment Method: ${order.paymentMethod}\n\nThank you for shopping with us!\n\nBest regards,\nShopNest Team`;

    await sendEmail(req.user.email, message);
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const myOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id }).populate("products.productId");
        res.status(200).json(orders);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate("user");
        res.status(200).json(orders);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        order.status = status;
        await order.save();
        res.status(200).json(order);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { createOrder, myOrders, getOrders, updateOrderStatus };

