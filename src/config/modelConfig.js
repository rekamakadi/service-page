const models = [
  {
    path: `${process.env.PUBLIC_URL}/models/cube-logo/cube-logo.gltf`,
    rotationSpeed: { x: 0.002, y: -0.002 },
    cameraSettings: { position: [0, 0, 5], fov: 70 }, // Cube settings
  },
  {
    path: `${process.env.PUBLIC_URL}/models/can/can.gltf`,
    //rotationSpeed: { x: 0.00, y: 0.00 },
    cameraSettings: { position: [0, 0, 5], fov: 45 }, // Can settings
  },
  {
    path: `${process.env.PUBLIC_URL}/models/mug/mug1.gltf`,
    cameraSettings: { position: [0, 0, 5], fov: 5 },
  },
];

export default models;
