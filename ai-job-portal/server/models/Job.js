import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  description: { type: String, required: true },
  skillsRequired: [String],
  salary: String,
  location: String,
  jobType: { type: String, enum: ['Full-time', 'Part-time', 'Internship', 'Remote'], default: 'Full-time' },
  recruiterId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  premium: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model('Job', jobSchema);
