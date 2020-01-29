import React, {useEffect, useState} from 'react';
import './App.css';
import Jobs from './Jobs'
const JOB_API_URL = '/api/jobs'
const mockjobs=[
  {title:'SE1', company:'Google'},
  {title:'SE2', company:'Facebook'},
  {title:'SE3', company:'Microsoft'}
]
const fetchJobs = async(updateCb)=>{
  const res = await fetch(JOB_API_URL)
  const json = await res.json()
  updateCb(json)
  console.log({json})
}
function App() {
  const [jobList, updateJobs] = useState([])
  useEffect(()=>{
    fetchJobs(updateJobs)
  }, [])
  return (
    <div className="App">
      <Jobs jobs={jobList}/>
    </div>
  );
}

export default App;
