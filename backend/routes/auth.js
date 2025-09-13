// import { Router } from 'express';
// import { signup, login } from '../controllers/authController.js';

// const router = Router();

// router.post('/signup', signup);
// router.post('/login', login);

// export default router;

// backend/routes/auth.js

import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User.js'; // Assumes the User model is at this path

const router = express.Router();

// === SIGNUP ROUTE ===
// URL: POST /signup
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Email already in use.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // --- FIX 1: Changed 'password' to 'passwordHash' to match your User model ---
    const newUser = new User({
      name,
      email,
      passwordHash: hashedPassword, // This line was corrected
    });
    await newUser.save();

    res.status(201).json({ success: true, message: 'User registered successfully!' });

  } catch (error) {
    console.error('Signup Error:', error);
    res.status(500).json({ success: false, message: 'Server error during signup.' });
  }
});


// === LOGIN ROUTE ===
// URL: POST /login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid credentials!' });
    }

    // --- FIX 2: Compare against 'user.passwordHash' from the database ---
    const isMatch = await bcrypt.compare(password, user.passwordHash); // This line was corrected
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid credentials!' });
    }

    res.json({
      success: true,
      user: {
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ success: false, message: 'Server error during login.' });
  }
});

export default router;