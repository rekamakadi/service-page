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
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });

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
    handleDrag(false);
  }, [handleHover, handleDrag]);

  const handlePointerDown = useCallback(
    (event) => {
      event.stopPropagation();
      setIsDragging(true);
      handleDrag(true);
      const { clientX, clientY } = event.touches ? event.touches[0] : event;
      setLastPosition({ x: clientX, y: clientY });
    },
    [handleDrag]
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
        const { clientX, clientY } = event.touches ? event.touches[0] : event;
        const deltaX = clientX - lastPosition.x;
        const deltaY = clientY - lastPosition.y;
        setLastPosition({ x: clientX, y: clientY });

        modelRef.current.rotation.y += deltaY * 0.01;
        modelRef.current.rotation.x += deltaX * 0.01;

        if (event.touches) {
          event.preventDefault();
        }
      }
    },
    [isDragging, lastPosition]
  );

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handlePointerMove);
      document.addEventListener("mouseup", handlePointerUp);
      document.addEventListener("touchmove", handlePointerMove, {
        passive: false,
      });
      document.addEventListener("touchend", handlePointerUp);
    } else {
      document.removeEventListener("mousemove", handlePointerMove);
      document.removeEventListener("mouseup", handlePointerUp);
      document.removeEventListener("touchmove", handlePointerMove);
      document.removeEventListener("touchend", handlePointerUp);
    }

    return () => {
      document.removeEventListener("mousemove", handlePointerMove);
      document.removeEventListener("mouseup", handlePointerUp);
      document.removeEventListener("touchmove", handlePointerMove);
      document.removeEventListener("touchend", handlePointerUp);
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
      onTouchStart={handlePointerDown}
      onTouchEnd={handlePointerUp}
    />
  );
};

export default React.memo(ModelToMove);
