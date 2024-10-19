import React, { useEffect, useState } from 'react';
import './BreakingFlower.css';

const BreakingFlower = () => {
  const [isBroken, setIsBroken] = useState(false);
    useEffect(()=>{

    },[]);
  const breakFlower = () => {
    setIsBroken(true);
    setTimeout(() => setIsBroken(false), 2000); // Reset flower after 2 seconds
  };

  return (
    <div className={`breaking-flower ${isBroken ? 'broken' : ''}`} onClick={breakFlower}>
      {/* Flower petals */}
      <div className={`petal ${isBroken ? 'break' : ''}`}></div>
      <div className={`petal ${isBroken ? 'break' : ''}`}></div>
      <div className={`petal ${isBroken ? 'break' : ''}`}></div>
      <div className={`petal ${isBroken ? 'break' : ''}`}></div>
      <div className={`petal ${isBroken ? 'break' : ''}`}></div>
      <div className={`petal ${isBroken ? 'break' : ''}`}></div>
      <div className={`petal ${isBroken ? 'break' : ''}`}></div>
      <div className={`petal ${isBroken ? 'break' : ''}`}></div>
      {/* Flower center */}
      <div className={`center ${isBroken ? 'break' : ''}`}></div>
    </div>
  );
}

export default BreakingFlower;
