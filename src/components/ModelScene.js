import React, { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import Lights from "./Lights";
import ModelSwitcher from "./ModelSwitcher";
import ModelToMove from "./ModelToMove";
import { ModelSceneContext } from "../context/ModelSceneContext";

export const ModelScene = () => {
  const [hovering, setHovering] = useState(false);
  const [selected, setSelected] = useState(null);
  const [cameraSettings, setCameraSettings] = useState({
    position: [0, 0, 5],
    fov: 75,
  });
  const [rotationSpeed, setRotationSpeed] = useState(null);
  const [cursor, setCursor] = useState("auto");

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
            enabled={hovering}
            maxPolarAngle={Math.PI}
            minPolarAngle={0}
          />
          <Suspense
            fallback={<mesh style={{ color: "white" }}>Loading...</mesh>}
          >
            {selected && (
              <ModelToMove modelName={selected} setHovering={setHovering} setCursor={setCursor} />
            )}
          </Suspense>
        </Canvas>
        <ModelSwitcher />
      </div>
    </ModelSceneContext.Provider>
  );
};
