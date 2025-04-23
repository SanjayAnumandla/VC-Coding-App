import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from 'styles/home.module.css';

function Home() {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.content}>
          <h1>Build Better Apps Faster</h1>
          <p className={styles.subtitle}>Collaborative coding environment for teams</p>
          <button 
            className={styles.ctaButton}
            onClick={() => navigate('/login')}
          >
            Get Started
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path 
                stroke="currentColor" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M14 5l7 7m0 0l-7 7m7-7H3" 
              />
            </svg>
          </button>
        </div>
      </section>

      <div className={styles.features}>
        <div className={styles.card}>
          <h3>Real-Time Editing</h3>
          <div className={styles.codePreview}>
            <span className={styles.keyword}>function</span> helloWorld() {'{'}
            <br />
            &nbsp;&nbsp;<span className={styles.comment}>// Edit together in real-time</span>
            <br />
            &nbsp;&nbsp;console.<span className={styles.keyword}>log</span>(
            <span className={styles.string}>'Hello, World!'</span>);
            <br />
            {'}'}
          </div>
        </div>

        <div className={styles.card}>
          <h3>Video Collaboration</h3>
          <div className={styles.codePreview}>
            <span className={styles.keyword}>const</span> collab = 
            <span className={styles.keyword}> new</span> VideoCall();
            <br />
            <span className={styles.keyword}>await</span> collab.start();
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;