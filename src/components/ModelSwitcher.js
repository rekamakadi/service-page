import React, { useState, startTransition, useEffect, useContext } from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import ArrowIcon from "./ArrowIcon";
import models from "../modelConfig";
import { ModelSceneContext } from "../context/ModelSceneContext";

function ModelSwitcher() {
  const { setSelected, setRotationSpeed, setCameraSettings } =
    useContext(ModelSceneContext);
  const [currentModelIndex, setCurrentModelIndex] = useState(0);
  const gltf = useLoader(GLTFLoader, models[currentModelIndex].path);

  useEffect(() => {
    if (gltf) {
      const modelConfig = models[currentModelIndex];
      setSelected(gltf.scene);
      setRotationSpeed(modelConfig.rotationSpeed || null); // Set rotation speed from modelConfig
      setCameraSettings(
        modelConfig.cameraSettings || { position: [0, 0, 5], fov: 75 }
      ); // Set camera settings
    }
  }, [
    gltf,
    setSelected,
    setRotationSpeed,
    setCameraSettings,
    currentModelIndex,
  ]);

  const handleSwitch = () => {
    startTransition(() => {
      setCurrentModelIndex((prevIndex) => (prevIndex + 1) % models.length);
    });
  };

  return (
    <button
      style={{
        position: "absolute",
        top: "calc(50% + 150px)",
        left: "50%",
        transform: "translateX(-50%)",
        padding: "10px",
        background: "rgba(255, 255, 255, 0.7)",
        border: "none",
        cursor: "pointer",
        borderRadius: "50%",
        width: "80px",
        height: "80px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "1rem",
      }}
      onClick={handleSwitch}
    >
      <ArrowIcon />
    </button>
  );
}

export default ModelSwitcher;
