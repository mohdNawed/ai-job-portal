import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api/api';
export default function RecruiterJobs(){ const [jobs,setJobs]=useState([]); useEffect(()=>{api.get('/jobs/mine/list').then(r=>setJobs(r.data))},[]); return <main className="max-w-5xl mx-auto p-6"><h1 className="text-3xl font-bold mb-5">My Posted Jobs</h1>{jobs.map(j=><div className="card mb-4" key={j._id}><h2 className="text-xl font-bold">{j.title}</h2><p>{j.company} • Status: {j.status}</p><Link className="btn inline-block mt-3" to={`/recruiter/applicants/${j._id}`}>View Applicants</Link></div>)}</main> }
