import React from 'react';
import styles from './LoadingSpinner.module.css';

const LoadingSpinner = () => {
  return (
    <div className={styles.spinner}>
      <div className={styles.spinnerInner}></div>
    </div>
  );
};

export default LoadingSpinner;