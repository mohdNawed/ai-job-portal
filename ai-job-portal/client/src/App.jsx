import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Auth from './pages/Auth';
import Jobs from './pages/Jobs';
import JobDetails from './pages/JobDetails';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import MyApplications from './pages/MyApplications';
import PostJob from './pages/PostJob';
import RecruiterJobs from './pages/RecruiterJobs';
import Applicants from './pages/Applicants';
import AdminDashboard from './pages/AdminDashboard';
import AdminJobs from './pages/AdminJobs';

export default function App(){return <AuthProvider><BrowserRouter><Navbar/><Routes><Route path="/" element={<Home/>}/><Route path="/login" element={<Auth/>}/><Route path="/register" element={<Auth/>}/><Route path="/jobs" element={<Jobs/>}/><Route path="/jobs/:id" element={<ProtectedRoute><JobDetails/></ProtectedRoute>}/><Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/><Route path="/profile" element={<ProtectedRoute><Profile/></ProtectedRoute>}/><Route path="/applications" element={<ProtectedRoute roles={['user']}><MyApplications/></ProtectedRoute>}/><Route path="/recruiter/post-job" element={<ProtectedRoute roles={['recruiter','admin']}><PostJob/></ProtectedRoute>}/><Route path="/recruiter/jobs" element={<ProtectedRoute roles={['recruiter','admin']}><RecruiterJobs/></ProtectedRoute>}/><Route path="/recruiter/applicants/:jobId" element={<ProtectedRoute roles={['recruiter','admin']}><Applicants/></ProtectedRoute>}/><Route path="/admin/dashboard" element={<ProtectedRoute roles={['admin']}><AdminDashboard/></ProtectedRoute>}/><Route path="/admin/jobs" element={<ProtectedRoute roles={['admin']}><AdminJobs/></ProtectedRoute>}/></Routes></BrowserRouter></AuthProvider>}
