import { useEffect, useState } from 'react';
import { api } from '../api/api';
export default function MyApplications(){ const [apps,setApps]=useState([]); useEffect(()=>{api.get('/applications/my').then(r=>setApps(r.data))},[]); return <main className="max-w-5xl mx-auto p-6"><h1 className="text-3xl font-bold mb-5">My Applications</h1>{apps.map(a=><div className="card mb-4" key={a._id}><h2 className="text-xl font-bold">{a.jobId?.title}</h2><p>{a.jobId?.company}</p><p>Status: {a.status} • Match: {a.matchScore}%</p></div>)}</main> }
