const express = require('express');
const multer = require('multer');
const Photo = require('../models/Photo');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Get all photos
router.get('/', async (req, res) => {
  try {
    const photos = await Photo.find()
      .sort({ createdAt: -1 })
      .populate('userId', 'username');
    
    res.json(photos);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch photos' });
  }
});

// Upload photo
router.post('/upload', auth, upload.single('photo'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const photo = new Photo({
      userId: req.userId,
      username: user.username,
      data: req.file.buffer,
      mimetype: req.file.mimetype,
      caption: req.body.caption || '',
    });

    await photo.save();
    res.json({ message: 'Photo uploaded successfully', photo });
  } catch (err) {
    res.status(500).json({ error: 'Failed to upload photo' });
  }
});

// Delete photo
router.delete('/:photoId', auth, async (req, res) => {
  try {
    const photo = await Photo.findById(req.params.photoId);
    
    if (!photo) {
      return res.status(404).json({ error: 'Photo not found' });
    }

    if (photo.userId.toString() !== req.userId) {
      return res.status(403).json({ error: 'Not authorized to delete this photo' });
    }

    await Photo.deleteOne({ _id: req.params.photoId });
    res.json({ message: 'Photo deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete photo' });
  }
});

// Like photo
router.post('/:photoId/like', auth, async (req, res) => {
  try {
    const photo = await Photo.findById(req.params.photoId);
    
    if (!photo) {
      return res.status(404).json({ error: 'Photo not found' });
    }

    if (photo.likedBy.includes(req.userId)) {
      photo.likedBy = photo.likedBy.filter(id => id.toString() !== req.userId);
      photo.likes = Math.max(0, photo.likes - 1);
    } else {
      photo.likedBy.push(req.userId);
      photo.likes += 1;
    }

    await photo.save();
    res.json({ likes: photo.likes, liked: photo.likedBy.includes(req.userId) });
  } catch (err) {
    res.status(500).json({ error: 'Failed to like photo' });
  }
});

// Add comment
router.post('/:photoId/comment', auth, async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || text.trim() === '') {
      return res.status(400).json({ error: 'Comment cannot be empty' });
    }

    const photo = await Photo.findById(req.params.photoId);
    const user = await User.findById(req.userId);
    
    if (!photo) {
      return res.status(404).json({ error: 'Photo not found' });
    }

    photo.comments.push({
      userId: req.userId,
      username: user.username,
      text,
    });

    await photo.save();
    res.json({ message: 'Comment added successfully', comments: photo.comments });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add comment' });
  }
});

module.exports = router;
