import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/pages.css';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="page home-page">
      <section className="hero">
        <h1>Build Better Apps Faster</h1>
        <p className="hero-subtitle">Collaborative coding environment for teams</p>
        <button 
          className="cta-button"
          onClick={() => navigate('/login')}
        >
          Get Started
        </button>
      </section>

      <div className="features-container">
        <div className="feature-card">
          <h3>Real-Time Editing</h3>
          <div className="code-preview">
            <span className="code-keyword">function</span> helloWorld() {'{'}
            <br />
            &nbsp;&nbsp;{/* Edit together in real-time */}
            <br />
            &nbsp;&nbsp;console.<span className="code-keyword">log</span>(
            <span className="code-string">'Hello, World!'</span>);
            <br />
            {'}'}
          </div>
        </div>

        <div className="feature-card">
          <h3>Video Collaboration</h3>
          <div className="code-preview">
            <span className="code-keyword">const</span> collab = 
            <span className="code-keyword"> new</span> VideoCall();
            <br />
            <span className="code-keyword">await</span> collab.start();
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;