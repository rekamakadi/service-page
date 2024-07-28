import React, {
  useRef,
  useState,
  useContext,
  useCallback,
  useEffect,
} from "react";
import { useFrame } from "@react-three/fiber";
import { ModelSceneContext } from "../context/ModelSceneContext";

const ModelToMove = ({ modelName, handleHover, handleDrag }) => {
  const modelRef = useRef();
  const { rotationSpeed } = useContext(ModelSceneContext);
  const defaultRotationSpeed = { x: 0.005, y: 0.005 };
  const [isDragging, setIsDragging] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useFrame(() => {
    if (modelRef.current && !isDragging) {
      modelRef.current.rotation.y += rotationSpeed?.y || defaultRotationSpeed.y;
      modelRef.current.rotation.x += rotationSpeed?.x || defaultRotationSpeed.x;
    }
  });

  const handlePointerOver = useCallback(
    (event) => {
      event.stopPropagation();
      setIsHovering(true);
      handleHover(true);
    },
    [handleHover]
  );

  const handlePointerOut = useCallback(() => {
    setIsHovering(false);
    setIsDragging(false);
    handleHover(false);
    handleDrag(false);
  }, [handleHover, handleDrag]);

  const handlePointerDown = useCallback(
    (event) => {
      event.stopPropagation();
      if (isHovering) {
        setIsDragging(true);
        handleDrag(true);
      }
    },
    [isHovering, handleDrag]
  );

  const handlePointerUp = useCallback(
    (event) => {
      event.stopPropagation();
      setIsDragging(false);
      handleDrag(false);
    },
    [handleDrag]
  );

  const handlePointerMove = useCallback(
    (event) => {
      if (isDragging && modelRef.current) {
        const { movementX, movementY } = event;
        modelRef.current.rotation.y -= movementX * 0.01;
        modelRef.current.rotation.x += movementY * 0.01;
      }
    },
    [isDragging]
  );

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("pointermove", handlePointerMove);
      document.addEventListener("pointerup", handlePointerUp);
    } else {
      document.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerup", handlePointerUp);
    }

    return () => {
      document.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerup", handlePointerUp);
    };
  }, [isDragging, handlePointerMove, handlePointerUp]);

  return (
    <primitive
      object={modelName}
      ref={modelRef}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerMove={handlePointerMove}
    />
  );
};

export default React.memo(ModelToMove);
