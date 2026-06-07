import express from 'express';
import { authenticate } from '../middleware/auth.js';
import { saveSubscription } from '../utils/push.js';

const router = express.Router();

router.post('/subscribe', authenticate, (req, res) => {
  const subscription = req.body;
  const userId = req.user.userId;
  
  saveSubscription(userId, subscription);
  
  res.status(201).json({ message: 'Subscribed to push notifications' });
});

export default router;
