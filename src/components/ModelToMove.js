import React, { useRef, useState, useContext } from "react";
import { useFrame } from "@react-three/fiber";
import { ModelSceneContext } from '../context/ModelSceneContext';

const ModelToMove = ({ modelName, setHovering }) => {
  const modelRef = useRef();
  const { rotationSpeed } = useContext(ModelSceneContext);
  const defaultRotationSpeed = { x: 0.002, y: 0.002 };
  const [cursor, setCursor] = useState("default");
  let hoverTimeout = null;

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += (rotationSpeed?.y || defaultRotationSpeed.y);
      modelRef.current.rotation.x += (rotationSpeed?.x || defaultRotationSpeed.x);
    }
  });

  const handlePointerOver = (event) => {
    event.stopPropagation();
    setCursor("pointer");
    clearTimeout(hoverTimeout);
    setHovering(true);
  };

  const handlePointerOut = () => {
    setCursor("auto");
    hoverTimeout = setTimeout(() => setHovering(false), 1000); // Delay before disabling OrbitControls
  };

  return (
    <primitive
      object={modelName}
      ref={modelRef}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    />
  );
}

export default ModelToMove;
