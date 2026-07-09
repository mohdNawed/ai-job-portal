import Job from '../models/Job.js';

export const listJobs = async (req, res) => {
  const { search = '', location = '', page = 1, limit = 10 } = req.query;
  const query = { status: 'approved' };
  if (search) query.$or = [
    { title: new RegExp(search, 'i') },
    { company: new RegExp(search, 'i') },
    { skillsRequired: new RegExp(search, 'i') }
  ];
  if (location) query.location = new RegExp(location, 'i');
  const skip = (Number(page) - 1) * Number(limit);
  const [jobs, total] = await Promise.all([
    Job.find(query).populate('recruiterId', 'name email').sort({ premium: -1, createdAt: -1 }).skip(skip).limit(Number(limit)),
    Job.countDocuments(query)
  ]);
  res.json({ jobs, total, page: Number(page), pages: Math.ceil(total / limit) });
};

export const getJob = async (req, res) => {
  const job = await Job.findById(req.params.id).populate('recruiterId', 'name email');
  if (!job) return res.status(404).json({ message: 'Job not found' });
  res.json(job);
};

export const createJob = async (req, res) => {
  const job = await Job.create({ ...req.body, recruiterId: req.user._id });
  res.status(201).json(job);
};

export const recruiterJobs = async (req, res) => res.json(await Job.find({ recruiterId: req.user._id }).sort({ createdAt: -1 }));

export const updateJob = async (req, res) => {
  const job = await Job.findOneAndUpdate({ _id: req.params.id, recruiterId: req.user._id }, req.body, { new: true });
  if (!job) return res.status(404).json({ message: 'Job not found' });
  res.json(job);
};

export const deleteJob = async (req, res) => {
  const job = await Job.findOneAndDelete({ _id: req.params.id, recruiterId: req.user._id });
  if (!job) return res.status(404).json({ message: 'Job not found' });
  res.json({ message: 'Job deleted' });
};
