import React from 'react'
import './LoadingSpinner.css';

const WaitScreen = () => {
  return (
    <div className="spinner-overlay">
      <div className="spinner" />
    </div>
  )
}

export default WaitScreen;