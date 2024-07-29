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
  const [lastTouchPosition, setLastTouchPosition] = useState({ x: 0, y: 0 });

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
      if (isHovering || event.type === "touchstart") {
        setIsDragging(true);
        handleDrag(true);
        if (event.type === "touchstart") {
          const touch = event.touches[0];
          setLastTouchPosition({ x: touch.clientX, y: touch.clientY });
        }
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
        if (event.type === "mousemove") {
          const { movementX, movementY } = event;
          modelRef.current.rotation.y -= movementX * 0.01;
          modelRef.current.rotation.x -= movementY * 0.01;
        } else if (event.type === "touchmove" && event.touches.length === 1) {
          const touch = event.touches[0];
          const deltaX = touch.clientX - lastTouchPosition.x;
          const deltaY = touch.clientY - lastTouchPosition.y;
          modelRef.current.rotation.y -= deltaX * 0.01;
          modelRef.current.rotation.x -= deltaY * 0.01;
          setLastTouchPosition({ x: touch.clientX, y: touch.clientY });
          event.preventDefault();
        }
      }
    },
    [isDragging, lastTouchPosition]
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
