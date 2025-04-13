import React from 'react';
import '../styles/pages.css';

function Dashboard() {
  return (
    <div className="page dashboard-page">
      <h1>Your Projects</h1>
      <div className="project-grid">{/* Project cards would go here */}</div>
    </div>
  );
}

export default Dashboard;
