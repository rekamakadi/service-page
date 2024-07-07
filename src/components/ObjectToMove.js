import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

export const ObjectToMove = ({ objectName }) => {
  const { scene } = useGLTF(
    `${process.env.PUBLIC_URL}/models/${objectName}/scene.gltf`
  );
  const objectRef = useRef();

  useFrame(() => {
    if (objectRef.current) {
      objectRef.current.rotation.y += 0.005; // Automatic rotation
      objectRef.current.rotation.x += 0.005; // Automatic rotation
    }
  });

  return <primitive ref={objectRef} object={scene} />;
};
