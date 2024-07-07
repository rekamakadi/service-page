import React, { useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { ObjectToMove } from "./ObjectToMove";

export const CanvasForObjectToMove = ({ objectName }) => {
  const objectRef = useRef();
  const [cursor, setCursor] = useState("default");

  const handlePointerOver = () => {
    setCursor("pointer");
  };

  const handlePointerOut = () => {
    setCursor("default");
  };

  return (
    <div
      id="container3D"
      style={{ width: "100%", height: "100vh", cursor: cursor }}
    >
      <Canvas
        style={{ width: "100%", height: "100%" }}
        onCreated={({ gl }) => {
          gl.domElement.style.touchAction = "none";
        }}
      >
        <ambientLight intensity={2} color={0xffffff} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <ObjectToMove
          objectName={objectName}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
        />
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          enableRotate={true} // Enable rotation for OrbitControls
          enableDamping={true}
          dampingFactor={0.1}
          args={[objectRef.current]}
        />
      </Canvas>
    </div>
  );
};
