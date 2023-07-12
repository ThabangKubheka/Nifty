import React from 'react';
import './Jobs.css';
import Plumbing from '../Assets/plumbing.jpeg';
import electrical from '../Assets/electrical.jpeg';
import carpentry from '../Assets/carpentry.jpeg';
import gardening from '../Assets/gardening.jpeg';
import pool from '../Assets/pool.jpeg';
import painting from '../Assets/painting.jpeg';
import { JobTile } from './JobTile';


const Jobs = () => {
  const handymanJobs = [
    {
      id: 1,
      title: 'Plumbing',
      image: Plumbing,
    },
    {
      id: 2,
      title: 'Electrical',
      image: electrical,
    },
    {
      id: 3,
      title: 'Carpentry',
      image: carpentry,
    },
    {
      id: 4,
      title: 'Painting',
      image: painting,
    },
    {
      id: 5,
      title: 'Pool Work',
      image: pool,
    },
    {
      id: 6,
      title: 'Gardening',
      image: gardening,
    },
  ];

  return (
    <div className="jobs-container">
      <h1 className="jobs-title">Find a contractor</h1>
      <div className="job-tiles">
        {handymanJobs.map(job => (
          <JobTile key={job.id} title={job.title} image={job.image} />
  
        ))}
      </div>
    </div>
  );
};

export default Jobs;

