import React, { useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useLoader } from '@react-three/fiber';
import { Box, Heading } from '@chakra-ui/react';

export default function LandingDiorama({width}) {
  const party = useLoader(GLTFLoader, `/party_popper.gltf`);
  const bottle = useLoader(GLTFLoader, `/bottle_with_popping_cork.gltf`);

  const [scaleFactor, setScaleFactor] = useState(0);
  const [scrollAcceleration, setScrollAcceleration] = useState(0);
  const [prevScrollY, setPrevScrollY] = useState(0);
  const requestRef = useRef();

  const maxRotation = Math.PI / 10; // Maximum rotation in radians (45 degrees)
  const decayFactor = 0.95; // Decay factor to gradually reset rotation
    
  const minWidth = 320; // Minimum width (e.g., mobile)
  const maxWidth = 1280; // Maximum width (e.g., large desktop)

  // Function to clamp rotation within the specified maximum threshold
  const clampRotation = (rotation) => {
    return Math.max(-maxRotation, Math.min(maxRotation, rotation));
  };

  const animate = () => {
    const deltaY = window.scrollY - prevScrollY;
    setScrollAcceleration((prev) => clampRotation(prev + deltaY * 0.009));
    setPrevScrollY(window.scrollY);

    // Apply decay to gradually reset the rotation
    setScrollAcceleration((prev) => prev * decayFactor);

    requestRef.current = requestAnimationFrame(animate);
  };
    
  const lerp = (start, end, factor) => start + (end - start) * factor;

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [window.scrollY]);
  
  // Normalize width to a factor between 0 (minWidth) and 1 (maxWidth)
  const normalizedWidth = Math.min(Math.max((width - minWidth) / (maxWidth - minWidth), 0), 1);

  // Interpolate positions and scales based on normalizedWidth
  let bottlePosition = [
    lerp(-0.5, 1, normalizedWidth), // X
    lerp(2, 0, normalizedWidth),     // Y
    lerp(-0.5, 1, normalizedWidth)    // Z
  ];

  let bottleScale = [
    lerp(1.7, 2.3, normalizedWidth), 
    lerp(1.7, 2.3, normalizedWidth), 
    lerp(1.4, 2.3, normalizedWidth)
  ];

  let partyPosition = [
    lerp(0.3, -1, normalizedWidth), // X
    lerp(0.2, 0, normalizedWidth),   // Y
    lerp(1.2, -2, normalizedWidth)    // Z
  ];

  let partyScale = [
    lerp(1, 3, normalizedWidth), 
    lerp(1, 3.1, normalizedWidth), 
    lerp(1, 2.6, normalizedWidth)
  ];

//  let partyLightPos = [
//    lerp(0.9, 0.9, normalizedWidth), 
//    lerp(1, 1, normalizedWidth), 
//    lerp(2.1, 2.1, normalizedWidth)
//  ];

  return (
    <Box position="relative" width="100%" height="100%" overflow="hidden" bottom="8%">
      <Canvas style={{ position: 'absolute', top: 0, left: "8%", width: '100%', height:"100%" }}>
      <ambientLight intensity={0.5} />
        <pointLight position={[1.3, 1.3, 1.3]} intensity={9} />
        <primitive
          object={party.scene}
          position={partyPosition}
          scale={partyScale}
          rotation={[clampRotation(scrollAcceleration), 0, 0]} // Apply clamped rotation
        />
        <pointLight position={[-1, 1.3, -1]} intensity={4} />
        <primitive
          object={bottle.scene}
          position={bottlePosition}
          scale={bottleScale}
          rotation={[clampRotation(scrollAcceleration), 0, 0]} // Apply clamped rotation
        />
      </Canvas>
    </Box>
  );
}



//         <ambientLight intensity={0.5} />
//         <pointLight position={[1.3, 1.3, 1.3]} intensity={9} />
//         <primitive
//           object={party.scene}
//           position={[-1, 0, -2]}
//           scale={[3, 3.1, 2.6]}
//           rotation={[clampRotation(scrollAcceleration), 0, 0]} // Apply clamped rotation
//         />
//         <pointLight position={[-1, 1.3, -1]} intensity={4} />
//         <primitive
//           object={bottle.scene}
//           position={[1, 0, 1]}
//           scale={[2.3, 2.3, 2.3]}
//           rotation={[clampRotation(scrollAcceleration), 0, 0]} // Apply clamped rotation
//         />