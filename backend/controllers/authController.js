const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
      expiresIn: "1h", // Token expiration time
    });
}

// Register a new user
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
  try {
    // Todos : Implement proper validation for the input fields (name, email, password)
    if(!name || !email || !password) {
      return res.status(400).json({ message: "Please provide all required fields" });
    }

    // Check if the user already exists in the database
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Todos : Hash the password before saving it to the database
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
  
    // Todos : welcome email after successful registration
    const user = new User({ name, email, password: hashedPassword});
    await user.save();

    // Todos : OTP verification for email confirmation
    if(user) {
      // Send OTP email
      // const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP

      const message = `Thank you ${name} for registering with ShopNest. Hope you have a great experience with us.`;

      await sendEmail(email, "Welcome to ShopNest", message);

      res.status(201).json({
        _id:user._id,
        name:user.name,
        email:user.email,
        role:user.role,
        token:generateToken(user._id),
        message: "User registered successfully. Please check your email for welcome message."
      })
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Todos : Implement proper validation for the input fields (email, password)
    if(!email || !password) {
      return res.status(400).json({ message: "Please provide all required fields" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "No registration found with this email" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id)
    });

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// getUser
const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Exclude password field
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { registerUser, loginUser, getUsers };
