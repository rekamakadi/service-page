import React, { useState, Suspense, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import Lights from "./Lights";
import ModelSwitcher from "./ModelSwitcher";
import ModelToMove from "./ModelToMove";
import { ModelSceneContext } from "../context/ModelSceneContext";

export const ModelScene = React.memo(() => {
  const [selected, setSelected] = useState(null);
  const [cameraSettings, setCameraSettings] = useState({
    position: [0, 0, 5],
    fov: 75,
  });
  const [rotationSpeed, setRotationSpeed] = useState(null);
  const [cursor, setCursor] = useState("auto");

  const handleHover = useCallback(
    (isHovering) => {
      setCursor(isHovering ? "pointer" : "auto");
    },
    [setCursor]
  );

  const handleDrag = useCallback(
    (isDragging) => {
      setCursor(isDragging ? "grabbing" : "auto");
    },
    [setCursor]
  );

  return (
    <ModelSceneContext.Provider
      value={{
        setSelected,
        setCameraSettings,
        rotationSpeed,
        setRotationSpeed,
      }}
    >
      <div style={{ position: "relative", height: "100vh", cursor }}>
        <Canvas style={{ background: "#121212" }}>
          <PerspectiveCamera makeDefault {...cameraSettings} />
          <Lights />
          <OrbitControls
            enabled={cursor === "grabbing"}
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
              />
            )}
          </Suspense>
        </Canvas>
        <ModelSwitcher />
      </div>
    </ModelSceneContext.Provider>
  );
});
