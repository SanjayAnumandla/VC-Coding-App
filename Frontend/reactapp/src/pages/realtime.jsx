import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import styles from '../styles/realtime.module.css';

const RealtimeEditor = () => {
  const { user } = useAuth();
  const [code, setCode] = useState('// Start coding here...');
  const [output, setOutput] = useState('');
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState('python');
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  const languages = [
    { id: 'python', name: 'Python' },
    { id: 'javascript', name: 'JavaScript' },
    { id: 'java', name: 'Java' },
    { id: 'sql', name: 'SQL' },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsLanguageDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageChange = (langId) => {
    setSelectedLanguage(langId);
    setIsLanguageDropdownOpen(false);
    // Add any language-specific initialization here
  };

  const handleRunCode = () => {
    try {
      // Replace with actual code execution logic
      const mockOutput = `Running ${selectedLanguage} code...\nHello, World!\nExecution completed successfully`;
      setOutput(mockOutput);
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    }
  };

  return (
    <div className={styles.editorContainer}>
      <div className={styles.editorWrapper}>
        {/* Editor Section */}
        <div className={styles.editorSection}>
          <div className={styles.editorHeader}>
            <h3>Code Editor</h3>
            <div className={styles.editorActions}>
              <div className={styles.languageDropdownWrapper} ref={dropdownRef}>
                <button
                  className={styles.languageDropdownButton}
                  onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                  aria-expanded={isLanguageDropdownOpen}
                  aria-haspopup="true"
                >
                  {languages.find(lang => lang.id === selectedLanguage)?.name}
                  <span className={styles.dropdownIcon}>
                    {isLanguageDropdownOpen ? '▲' : '▼'}
                  </span>
                </button>
                
                {isLanguageDropdownOpen && (
                  <div className={styles.languageDropdownMenu}>
                    {languages.map((lang) => (
                      <button
                        key={lang.id}
                        className={`${styles.languageOption} ${
                          selectedLanguage === lang.id ? styles.selected : ''
                        }`}
                        onClick={() => handleLanguageChange(lang.id)}
                      >
                        {lang.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <button 
                className={styles.runButton}
                onClick={handleRunCode}
              >
                Run Code
              </button>
            </div>
          </div>
          
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className={styles.codeInput}
            spellCheck="false"
          />
        </div>

        {/* Output Section */}
        <div className={styles.outputSection}>
          <div className={styles.outputHeader}>
            <h3>Output</h3>
          </div>
          <pre className={styles.outputContent}>
            {output || 'Run your code to see output here...'}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default RealtimeEditor;