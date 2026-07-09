import User from '../models/User.js';

export const getProfile = async (req, res) => res.json(req.user);

export const updateProfile = async (req, res) => {
  const updates = (({ name, skills, education, experience }) => ({ name, skills, education, experience }))(req.body);
  if (req.file) updates.resume = req.file.path;
  const user = await User.findByIdAndUpdate(req.user._id, updates, { new: true }).select('-password');
  res.json(user);
};
