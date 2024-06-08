import React, { useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useLoader } from '@react-three/fiber';

// HoverObject component handles the GLTF object and its rotation
function HoverObject({ model, rotation }) {
  // Use the useFrame hook to update the object's rotation based on the provided rotation
  useFrame(() => {
    if (rotation) {  // Only apply rotation if it is provided
      model.scene.rotation.x = rotation.y;
      model.scene.rotation.y = rotation.x;
    }
  });

  return <primitive object={model.scene} scale={[2.8, 2.8, 2.8]} />;
}

function TextEmoji(props) {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [hover, setHover] = useState(false);
  const [lightPos, setLightPos] = useState([1.3, 1.3, 1.3]);
  const [lightInt, setLightInt] = useState(9);
  const model = useLoader(GLTFLoader, `/${props.emoji}.gltf`);

  const handleMouseMove = (event) => {
    const { offsetX, offsetY, target } = event.nativeEvent;
    const width = target.clientWidth;
    const height = target.clientHeight;

    // Normalize x and y positions to be within the range of -1 to 1
    const x = (offsetX / width) * 2 - 1;
    const y = -(offsetY / height) * 2 + 1; // Invert y-axis

    // Limit the rotation to a smaller range for a subtle effect
    const rotationX = x * Math.PI * 0.1; // Convert to radians for a subtle rotation effect
    const rotationY = y * Math.PI * 0.1;

    setRotation({ x: rotationX, y: rotationY });
  };

  const handleMouseEnter = () => setHover(true);
  const handleMouseLeave = () => setHover(false);
  
  useEffect(() => {
    if(props.emoji === "flag_france"){
      //use different lighting bc it doesnt look good with default
      setLightPos([-4.7, 2, 2.3]);
      setLightInt(50);
    }
  }, []);

  return (
    <div
      style={{
        display: 'inline-block',
        verticalAlign: 'middle',
        width: '1.5em',
        height: '1.5em',
        marginRight: '0.2em',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Canvas>
        <ambientLight intensity={0.5} />
        <pointLight position={lightPos} intensity={lightInt} />
        <HoverObject model={model} rotation={hover ? rotation : { x: 0, y: 0 }} />
      </Canvas>
    </div>
  );
}

export default TextEmoji;
