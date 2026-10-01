const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// Get user by username
router.get('/:username', async (req, res) => {
  try {
    const { username } = req.params;

    const user = await User.findOne({ username })
      .select('-password')
      .populate('followers', 'username profilePicture')
      .populate('following', 'username profilePicture');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user by ID
router.get('/id/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId)
      .select('-password')
      .populate('followers', 'username profilePicture')
      .populate('following', 'username profilePicture');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update user profile
router.put('/profile/update', auth, async (req, res) => {
  try {
    const { bio, profilePicture } = req.body;
    const userId = req.userId;

    const user = await User.findByIdAndUpdate(
      userId,
      { bio, profilePicture },
      { new: true, runValidators: true }
    );

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Follow user
router.post('/:userId/follow', auth, async (req, res) => {
  try {
    const { userId } = req.params;
    const currentUserId = req.userId;

    if (userId === currentUserId) {
      return res.status(400).json({ error: 'Cannot follow yourself' });
    }

    const userToFollow = await User.findById(userId);
    const currentUser = await User.findById(currentUserId);

    if (!userToFollow || !currentUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (currentUser.following.includes(userId)) {
      return res.status(400).json({ error: 'Already following this user' });
    }

    currentUser.following.push(userId);
    userToFollow.followers.push(currentUserId);

    await currentUser.save();
    await userToFollow.save();

    res.json({ message: 'User followed successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Unfollow user
router.post('/:userId/unfollow', auth, async (req, res) => {
  try {
    const { userId } = req.params;
    const currentUserId = req.userId;

    const userToUnfollow = await User.findById(userId);
    const currentUser = await User.findById(currentUserId);

    if (!userToUnfollow || !currentUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    currentUser.following.pull(userId);
    userToUnfollow.followers.pull(currentUserId);

    await currentUser.save();
    await userToUnfollow.save();

    res.json({ message: 'User unfollowed successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
