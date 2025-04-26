import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/home.module.css';

function Home() {
  const navigate = useNavigate();
  const [activeUsers, setActiveUsers] = useState(0);
  const [codeExamples, setCodeExamples] = useState([
    {
      id: 1,
      title: 'Real-Time Editing',
      code: `function helloWorld() {\n  // Edit together in real-time\n  console.log('Hello, World!');\n}`,
      language: 'javascript'
    },
    {
      id: 2,
      title: 'Video Collaboration',
      code: `const collab = new VideoCall();\nawait collab.start();`,
      language: 'javascript'
    }
  ]);
  const [typedTitle, setTypedTitle] = useState('');
  const [showTitle, setShowTitle] = useState(false);

  // Simulate active users count
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveUsers(prev => {
        const change = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1
        return Math.max(10, prev + change); // Never go below 10
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Typewriter effect for title
  useEffect(() => {
    const fullTitle = "Build Better Code Work Faster with Your Team ";
    let currentIndex = 0;
    
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullTitle.length) {
        setTypedTitle(fullTitle.substring(0, currentIndex));
        currentIndex++;
      } else {
        setShowTitle(true);
        clearInterval(typingInterval);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, []);

  // Handle code edit
  const handleCodeChange = (id, newCode) => {
    setCodeExamples(prev => 
      prev.map(example => 
        example.id === id ? { ...example, code: newCode } : example
      )
    );
  };

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.content}>
          <h1>
            {typedTitle}
            <span className={showTitle ? styles.cursorVisible : styles.cursorHidden}>|</span>
          </h1>
          <p className={styles.subtitle}>
            Collaborative coding environment for teams • {activeUsers}+ active developers
          </p>
          <button 
            className={styles.ctaButton}
            onClick={() => navigate('/login',{ 
                state: { 
                  fromHome: true,
                  email: 'demo@codecollab.com' // Optional: pre-fill demo email
                } 
            })}
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
        {codeExamples.map(example => (
          <div key={example.id} className={styles.card}>
            <h3>{example.title}</h3>
            <div 
              className={styles.codePreview}
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => handleCodeChange(example.id, e.target.textContent)}
            >
              <pre>
                <code>
                  {example.code.split('\n').map((line, i) => (
                    <div key={i}>
                      {line.includes('function') && <span className={styles.keyword}>function</span>}
                      {line.includes('const') && <span className={styles.keyword}>const</span>}
                      {line.includes('new') && <span className={styles.keyword}>new</span>}
                      {line.includes('await') && <span className={styles.keyword}>await</span>}
                      {line.includes('console.log') && (
                        <>
                          console.<span className={styles.keyword}>log</span>
                        </>
                      )}
                      {line.includes('//') && <span className={styles.comment}>{line.trim()}</span>}
                      {line.includes("'Hello, World!'") && (
                        <span className={styles.string}>'Hello, World!'</span>
                      )}
                      {!line.includes('function') && 
                       !line.includes('const') && 
                       !line.includes('new') && 
                       !line.includes('await') && 
                       !line.includes('console.log') && 
                       !line.includes('//') &&
                       line}
                    </div>
                  ))}
                </code>
              </pre>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;