import User from '../models/User.js';
import Job from '../models/Job.js';
import Application from '../models/Application.js';

export const dashboard = async (_, res) => {
  const [users, jobs, applications, pendingJobs] = await Promise.all([
    User.countDocuments(), Job.countDocuments(), Application.countDocuments(), Job.countDocuments({ status: 'pending' })
  ]);
  res.json({ users, jobs, applications, pendingJobs });
};

export const users = async (_, res) => res.json(await User.find().select('-password').sort({ createdAt: -1 }));
export const allJobs = async (_, res) => res.json(await Job.find().populate('recruiterId', 'name email').sort({ createdAt: -1 }));
export const setJobStatus = async (req, res) => res.json(await Job.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true }));
