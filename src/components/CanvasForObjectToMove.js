import React, { useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { ObjectToMove } from "./ObjectToMove";

export const CanvasForObjectToMove = ({ objectName }) => {
  const mousePosition = useRef({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });

  useEffect(() => {
    const handleMouseMove = (event) => {
      mousePosition.current.x = event.clientX;
      mousePosition.current.y = event.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div id="container3D" style={{ width: "100%", height: "100vh" }}>
      <Canvas style={{ width: "100%", height: "100vh" }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} />
        <ObjectToMove objectName={objectName} mousePosition={mousePosition} />
        <OrbitControls enableZoom={true} />
      </Canvas>
    </div>
  );
};
