import { useEffect, useState } from 'react';
import { api } from '../api/api';
export default function AdminDashboard(){ const [d,setD]=useState({}); useEffect(()=>{api.get('/admin/dashboard').then(r=>setD(r.data))},[]); return <main className="max-w-5xl mx-auto p-6"><h1 className="text-3xl font-bold mb-6">Admin Analytics</h1><div className="grid md:grid-cols-4 gap-4">{Object.entries(d).map(([k,v])=><div className="card" key={k}><p className="text-slate-400">{k}</p><h2 className="text-4xl font-bold">{v}</h2></div>)}</div></main> }
