# AI Job Portal + Resume Analyzer

Advanced MERN full-stack project for portfolio/resume.

## Features
- Candidate, recruiter and admin roles
- JWT authentication + bcrypt password hashing
- Profile update and PDF resume upload
- Job posting with admin approval
- Job search, filtering, pagination-ready API
- Candidate job application system
- Resume PDF parsing and skill match score
- Recruiter applicant management: shortlist/reject
- Admin dashboard: users, jobs, pending jobs, applications
- Tailwind responsive UI

## Tech Stack
Frontend: React, Vite, Tailwind CSS, React Router, Axios  
Backend: Node.js, Express.js, MongoDB, Mongoose  
Auth: JWT, bcryptjs  
Upload/AI: Multer, pdf-parse skill scoring

## How to Run

### 1. Install root dependency
```bash
cd ai-job-portal
npm install
```

### 2. Install client and server dependencies
```bash
npm run install-all
```

### 3. Setup backend env
```bash
cd server
copy .env.example .env
```

Update `.env` if needed:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/ai-job-portal
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:5173
```

### 4. Run MongoDB locally
```bash
mongod
```

### 5. Run full project
From root folder:
```bash
npm run dev
```

Frontend: http://localhost:5173  
Backend: http://localhost:5000

## Demo Flow
1. Register admin using role `admin`.
2. Register recruiter using role `recruiter`.
3. Recruiter posts a job.
4. Admin approves the job.
5. Candidate registers as user, uploads resume, applies.
6. Recruiter views applicants and shortlists/rejects.

## Important API Routes

### Auth
- POST `/api/auth/register`
- POST `/api/auth/login`

### Jobs
- GET `/api/jobs`
- GET `/api/jobs/:id`
- POST `/api/jobs`
- GET `/api/jobs/mine/list`

### Applications
- POST `/api/applications/apply`
- GET `/api/applications/my`
- GET `/api/applications/applicants/:jobId`
- PATCH `/api/applications/:id/status`
- POST `/api/applications/resume/analyze`

### Admin
- GET `/api/admin/dashboard`
- GET `/api/admin/jobs`
- PATCH `/api/admin/jobs/:id/status`

## Next Upgrade Ideas
- Razorpay premium job posting
- Socket.io recruiter-candidate chat
- Email notification using Nodemailer
- Real OpenAI/Gemini resume analysis
- Saved jobs model
- Better admin charts
