// src/components/Lights.js

import React from 'react';

function Lights() {
  return (
    
    <>

  {/* directions x/y/z */}

      <ambientLight intensity={2} /> {/* Reduced intensity to balance with other lights */}
       <hemisphereLight skyColor={0xc1ff2d} groundColor={0x9393ff} intensity={1} /> {/* Hemisphere light for a more natural look
    {/* <hemisphereLight skyColor={0xffffbb} groundColor={0x080820} intensity={1.6} />  Hemisphere light for a more natural look  */}
     
     
     
     <directionalLight position={[10, 10, 10]} intensity={0.5} />   {/* right */}
     <directionalLight position={[-10, 10, 10]} intensity={0.5} />  {/* left  */}
     <directionalLight position={[0, 1, 10]} intensity={0.3} />     {/* Front */}
     <directionalLight position={[0, 0, -10]} intensity={0.5} />    {/* back  */}

     <directionalLight position={[-5, -20, 0]} intensity={1.5} />    {/* under */}
     <directionalLight position={[5, 20, 0]} intensity={1.0} />     {/* above */}

      <pointLight position={[0, -10, 0]} intensity={0.5} />  {/*Additional point light */}
       {/*<spotLight position={[0, 5, 5]} intensity={2} angle={0.3} penumbra={0.1} />  Additional spot light */}
      
    </>
  );
}

export default Lights;

