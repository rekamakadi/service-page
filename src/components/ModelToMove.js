import React, { useRef, useState, useContext, useCallback } from "react";
import { useFrame } from "@react-three/fiber";
import { ModelSceneContext } from "../context/ModelSceneContext";

const ModelToMove = ({ modelName, handleHover }) => {
  const modelRef = useRef();
  const { rotationSpeed, /*dragging, handleDrag*/ } = useContext(ModelSceneContext);
  const defaultRotationSpeed = { x: 0.002, y: 0.002 };
  // let hoverTimeout = null;
  // const [isDragging, setIsDragging] = useState(false);

  useFrame(() => {
    if (modelRef.current /*&& !isDragging*/) {
      modelRef.current.rotation.y += rotationSpeed?.y || defaultRotationSpeed.y;
      modelRef.current.rotation.x += rotationSpeed?.x || defaultRotationSpeed.x;
    }
  });

  const handlePointerOver = useCallback(
    (event) => {
      event.stopPropagation();
      // clearTimeout(hoverTimeout);
      handleHover(true);
    },
    [handleHover]
  );

  const handlePointerOut = useCallback(() => {
    // hoverTimeout = setTimeout(() => setHovering(false), 1000); // Delay before disabling OrbitControls
    handleHover(false);
  }, [handleHover]);

  // const handlePointerDown = useCallback(() => {
  //   setIsDragging(true);
  //   handleDrag(true);
  // }, [handleDrag]);

  // const handlePointerUp = useCallback(() => {
  //   setIsDragging(false);
  //   handleDrag(false);
  // }, [handleDrag]);

  return (
    <primitive
      object={modelName}
      ref={modelRef}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      // onPointerDown={handlePointerDown}
      // onPointerUp={handlePointerUp}
    />
  );
};

export default React.memo(ModelToMove);
