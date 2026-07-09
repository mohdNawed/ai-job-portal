import fs from 'fs';
import pdf from 'pdf-parse';
import Application from '../models/Application.js';
import Job from '../models/Job.js';

const scoreResume = (resumeText, skills = []) => {
  const text = resumeText.toLowerCase();
  const matched = skills.filter(skill => text.includes(skill.toLowerCase()));
  const score = skills.length ? Math.round((matched.length / skills.length) * 100) : 50;
  return { score, matched, missing: skills.filter(s => !matched.includes(s)) };
};

export const applyJob = async (req, res) => {
  const { jobId, coverLetter } = req.body;
  const job = await Job.findById(jobId);
  if (!job) return res.status(404).json({ message: 'Job not found' });

  let resumePath = req.file?.path || req.user.resume;
  let matchScore = 0;
  if (resumePath && fs.existsSync(resumePath)) {
    const data = await pdf(fs.readFileSync(resumePath));
    matchScore = scoreResume(data.text, job.skillsRequired).score;
  }

  const application = await Application.create({ jobId, userId: req.user._id, resume: resumePath, coverLetter, matchScore });
  res.status(201).json(application);
};

export const myApplications = async (req, res) => {
  const apps = await Application.find({ userId: req.user._id }).populate('jobId').sort({ createdAt: -1 });
  res.json(apps);
};

export const applicantsByJob = async (req, res) => {
  const job = await Job.findOne({ _id: req.params.jobId, recruiterId: req.user._id });
  if (!job) return res.status(404).json({ message: 'Job not found' });
  const apps = await Application.find({ jobId: req.params.jobId }).populate('userId', 'name email skills education experience resume');
  res.json(apps);
};

export const updateApplicationStatus = async (req, res) => {
  const app = await Application.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
  if (!app) return res.status(404).json({ message: 'Application not found' });
  res.json(app);
};

export const analyzeResume = async (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'Resume PDF required' });
  const skills = (req.body.skills || '').split(',').map(s => s.trim()).filter(Boolean);
  const data = await pdf(fs.readFileSync(req.file.path));
  const result = scoreResume(data.text, skills);
  res.json({ ...result, words: data.text.split(/\s+/).length });
};
