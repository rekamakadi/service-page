import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export const ObjectToMove = ({ objToRender }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Create a Three.js Scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    // OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.1;
    controls.maxPolarAngle = Math.PI;
    controls.minPolarAngle = 0;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 1);
    scene.add(ambientLight);

    const directionalLight1 = new THREE.DirectionalLight(0x404040, 2);
    directionalLight1.position.set(1, 1, 1).normalize();
    scene.add(directionalLight1);

    const directionalLight2 = new THREE.DirectionalLight(0x404040, 2);
    directionalLight2.position.set(-1, 1, -1).normalize();
    scene.add(directionalLight2);

    const directionalLight3 = new THREE.DirectionalLight(0x404040, 3);
    directionalLight3.position.set(1, -1, -1).normalize();
    scene.add(directionalLight3);

    const directionalLight4 = new THREE.DirectionalLight(0x404040, 3);
    directionalLight4.position.set(-1, -1, 1).normalize();
    scene.add(directionalLight4);

    const pointLight = new THREE.PointLight(0x00ffff, 1, 3);
    pointLight.position.set(0, 0.1, 0);
    scene.add(pointLight);

    const spotLight1 = new THREE.SpotLight(0x404040, 0.1);
    spotLight1.position.set(0, 3, 0);
    spotLight1.angle = Math.PI / 6;
    spotLight1.penumbra = 0.1;
    scene.add(spotLight1);

    const spotLight2 = new THREE.SpotLight(0x404040, 0.1);
    spotLight2.position.set(0, -3, 0);
    spotLight2.angle = Math.PI / 6;
    spotLight2.penumbra = 0.1;
    scene.add(spotLight2);

    const hemisphereLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
    scene.add(hemisphereLight);

    // Load GLTF Model
    const loader = new GLTFLoader();
    let object, mixer;

    loader.load(
      `${process.env.PUBLIC_URL}/models/${objToRender}/scene.gltf`,
      (gltf) => {
        object = gltf.scene;
        scene.add(object);

        if (gltf.animations && gltf.animations.length) {
          mixer = new THREE.AnimationMixer(object);
          gltf.animations.forEach((animation) => {
            mixer.clipAction(animation).play();
          });
        }
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      (error) => {
        console.error("An error occurred loading the model:", error);
      }
    );

    camera.position.z = 3;

    // Handle Window Resize
    const handleResize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    // Mouse Movement
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    document.onmousemove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (object && objToRender === "can") {
        object.rotation.y = -3 + (mouseX / window.innerWidth) * 3;
        object.rotation.x = -1.2 + (mouseY * 2.5) / window.innerHeight;
      }
    };

    // Animate
    const animate = () => {
      requestAnimationFrame(animate);

      if (mixer) {
        mixer.update(0.01);
      }

      if (object) {
        object.rotation.x += 0.005;
        object.rotation.y += 0.005;
      }

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // Clean up on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
      document.onmousemove = null;
      if (container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [objToRender]);

  return (
    <div
      id="container3D"
      ref={containerRef}
      style={{ width: "100%", height: "100vh" }}
    />
  );
};
