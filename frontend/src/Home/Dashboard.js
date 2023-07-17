import React from 'react';
import './Dashboard.css';

const Dashboard = ({component}) => {
  return (
    <div className="dashboard-container">
      <header className="navbar">
        <div className="logo">
          <h1>Nifty</h1>
        </div>
        <nav className="nav-links">
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/services">Services</a>
            </li>
            <li>
              <a href="/about">About</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
          </ul>
        </nav>
      </header>
      <main className="content">
        {component}
      </main>
      <footer className="footer">
        <p>&copy; 2023 InterTechSA. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Dashboard;
