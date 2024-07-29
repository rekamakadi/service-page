const models = [
    { 
      path: `${process.env.PUBLIC_URL}/models/cube/cube.gltf`,
      //rotationSpeed: { x: 0.0020, y: -0.002 },
      //cameraSettings: { position: [0, 0, 5], fov: 20 } // Cube settings
    },
    { 
      path: `${process.env.PUBLIC_URL}/models/can/can.gltf`,
      //rotationSpeed: { x: 0.00, y: 0.00 },
      cameraSettings: { position: [0, 0, 5], fov: 45 } // Can settings
    }
  ];
  
  export default models;
  