import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { ObjectToMove } from "./ObjectToMove";

export const CanvasForObjectToMove = ({ objectName }) => {

  return (
    <div id="container3D" style={{ width: "100%", height: "100vh" }}>
      <Canvas style={{ width: "100%", height: "100%", cursor: "pointer" }}>
        <ambientLight intensity={1} />
        <directionalLight position={[5, 5, 5]} />
        <ObjectToMove objectName={objectName} />
        <OrbitControls enableZoom={true} />
      </Canvas>
    </div>
  );
};
