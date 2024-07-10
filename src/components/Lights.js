// src/components/Lights.js

import React from 'react';
import { DirectionalLight, AmbientLight } from 'three';

function Lights() {
  return (
    <>
      <ambientLight intensity={1} />
      <directionalLight position={[10, 10, 5]} intensity={1} />




    </>
  );
}

export default Lights;
