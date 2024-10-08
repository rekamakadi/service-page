import React, {
  useState,
  startTransition,
  useEffect,
  useContext,
  useCallback,
} from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import ArrowIcon from "./ArrowIcon";
import models from "../config/modelConfig";
import { ModelSceneContext } from "../context/ModelSceneContext";

const ModelSwitcher = React.memo(() => {
  const { setSelected, setRotationSpeed, setCameraSettings } =
    useContext(ModelSceneContext);
  const [currentModelIndex, setCurrentModelIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const gltf = useLoader(GLTFLoader, models[currentModelIndex].path);


  useEffect(() => {
    setIsLoading(true);
    const modelConfig = models[currentModelIndex];
    if (gltf) {
      setSelected(gltf.scene);
      setRotationSpeed(modelConfig.rotationSpeed || null); // Set rotation speed from modelConfig
      setCameraSettings(
        modelConfig.cameraSettings || { position: [0, 0, 5], fov: 75 }
      ); // Set camera settings
      setIsLoading(false);
    }
  }, [
    gltf,
    setSelected,
    setRotationSpeed,
    setCameraSettings,
    currentModelIndex,
  ]);

  const handleSwitch = useCallback(() => {
    startTransition(() => {
      setCurrentModelIndex((prevIndex) => (prevIndex + 1) % models.length);
    });
  }, []);

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
      disabled={isLoading} 
    >
      {isLoading ? "Loading..." : <ArrowIcon />}
    </button>
  );
});

export default ModelSwitcher;
