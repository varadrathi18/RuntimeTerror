// import { Router } from 'express';
// import { getProfile, updateProfile } from '../controllers/profileController.js';

// const router = Router();

// router.get('/profile', getProfile);
// router.put('/profile', updateProfile);

// export default router;
// backend/routes/profile.js

import express from 'express';
import User from '../models/User.js'; // Make sure the User model is available

const router = express.Router();

// === GET USER PROFILE ===
// Fetches a user's profile data
// URL: GET /profile/user@example.com
router.get('/profile/:email', async (req, res) => {
  try {
    const { email } = req.params;

    // Find the user by their email and select only the name and email fields
    const user = await User.findOne({ email }).select('name email');

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    // Send the user's data back
    res.json({ success: true, user });

  } catch (error) {
    console.error('Get Profile Error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});


// === UPDATE USER PROFILE ===
// Updates a user's profile data (e.g., their name)
// URL: PUT /profile/user@example.com
router.put('/profile/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const { name } = req.body; // Get the new name from the request body

    if (!name) {
      return res.status(400).json({ success: false, message: 'Name is required for update.' });
    }

    // Find the user by email and update their name
    // { new: true } ensures the updated user document is returned
    const updatedUser = await User.findOneAndUpdate(
      { email },
      { name },
      { new: true }
    ).select('name email');

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    // Send the updated user data back
    res.json({ success: true, user: updatedUser, message: 'Profile updated successfully!' });

  } catch (error) {
    console.error('Update Profile Error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

export default router;