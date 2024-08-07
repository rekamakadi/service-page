import React, { useState, Suspense, useCallback, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import Lights from "./Lights";
import ModelSwitcher from "./ModelSwitcher";
import ModelToMove from "./ModelToMove";
import { ModelSceneContext } from "../context/ModelSceneContext";

export const ModelScene = React.memo(() => {
  const [hovering, setHovering] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [selected, setSelected] = useState(null);
  const [cameraSettings, setCameraSettings] = useState({
    position: [0, 0, 5],
    fov: 75,
  });
  const [rotationSpeed, setRotationSpeed] = useState(null);
  const [cursor, setCursor] = useState("auto");
  const [hoverTimeout, setHoverTimeout] = useState(null);

  const handleHover = useCallback(
    (isHovering) => {
      setCursor(isHovering ? "pointer" : "auto");
      if (!isHovering) {
        clearTimeout(hoverTimeout);
        setHoverTimeout(setTimeout(() => setHovering(false), 1000));
      }
      setHovering(isHovering);
    },
    [hoverTimeout]
  );

  const handleDrag = useCallback((isDragging) => {
    setCursor(isDragging ? "grabbing" : "auto");
    setDragging(isDragging);
  }, []);

  return (
    <ModelSceneContext.Provider
      value={{
        setSelected,
        setCameraSettings,
        rotationSpeed,
        setRotationSpeed,
        dragging,
        handleDrag,
      }}
    >
      <div
        style={{
          position: "relative",
          height: "100vh",
          cursor,
          touchAction: "none",
        }}
        onMouseLeave={() => handleDrag(false)}
      >
        <Canvas>
          <PerspectiveCamera makeDefault {...cameraSettings} />
          <Lights />
          <OrbitControls
            enabled={hovering || dragging}
            enableZoom={false}
            maxPolarAngle={Math.PI}
            minPolarAngle={0}
          />
          <Suspense
            fallback={<mesh style={{ color: "white" }}>Loading...</mesh>}
          >
            {selected && (
              <ModelToMove
                modelName={selected}
                handleHover={handleHover}
                handleDrag={handleDrag}
                dragging={dragging}
              />
            )}
          </Suspense>
        </Canvas>
        <ModelSwitcher />
      </div>
    </ModelSceneContext.Provider>
  );
});

export default ModelScene;