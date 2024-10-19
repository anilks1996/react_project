// WishingScreen.js
import React from 'react';
import BreakingFlower from './BreakingFlower';
import './WishingScreen.css';

const WishingScreen = (prop) => {
  return (
    <div className="wishing-screen">      
      {/*<h2>GMDA ERP</h2> */}
      <h2>{prop.rolename}</h2>
      <BreakingFlower />
      <p>Best wishes for a wonderful day.</p>
    </div>
  );
}

export default WishingScreen;
