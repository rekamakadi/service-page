import React, {
  useRef,
  useState,
  useContext,
  useCallback,
  // useEffect,
} from "react";
import { useFrame } from "@react-three/fiber";
import { ModelSceneContext } from "../context/ModelSceneContext";

const ModelToMove = ({ modelName, handleHover, handleDrag }) => {
  const modelRef = useRef();
  const { rotationSpeed } = useContext(ModelSceneContext);
  const defaultRotationSpeed = { x: 0.005, y: 0.005 };
  const [isDragging, setIsDragging] = useState(false);

  useFrame(() => {
    if (modelRef.current && !isDragging) {
      modelRef.current.rotation.y += rotationSpeed?.y || defaultRotationSpeed.y;
      modelRef.current.rotation.x += rotationSpeed?.x || defaultRotationSpeed.x;
    }
  });

  const handlePointerOver = useCallback(
    (event) => {
      event.stopPropagation();
      handleHover(true);
    },
    [handleHover]
  );

  const handlePointerOut = useCallback(() => {
    handleHover(false);
  }, [handleHover]);

  const handlePointerDown = useCallback(
    (event) => {
      event.stopPropagation();
      setIsDragging(true);
      handleDrag(true);
    },
    [handleDrag]
  );

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
    handleDrag(false);
  }, [handleDrag]);

  // const handleDocumentPointerUp = useCallback(() => {
  //   handlePointerUp();
  // }, [handlePointerUp]);

  // useEffect(() => {
  //   if (isDragging) {
  //     document.addEventListener("pointerUp", handleDocumentPointerUp);
  //   } else {
  //     document.removeEventListener("pointerUp", handleDocumentPointerUp);
  //   }

  //   return () => {
  //     document.removeEventListener("pointerUp", handleDocumentPointerUp);
  //   };
  // }, [isDragging, handleDocumentPointerUp]);

  return (
    <primitive
      object={modelName}
      ref={modelRef}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
    />
  );
};

export default React.memo(ModelToMove);
