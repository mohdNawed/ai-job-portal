import express from 'express';
import { getProfile, updateProfile } from '../controllers/userController.js';
import { protect } from '../middleware/auth.js';
import { uploadResume } from '../middleware/upload.js';
const router = express.Router();
router.get('/profile', protect, getProfile);
router.put('/profile', protect, uploadResume.single('resume'), updateProfile);
export default router;
