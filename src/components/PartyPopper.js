import React, { useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useLoader } from '@react-three/fiber';
import { Box, Heading } from '@chakra-ui/react';

export default function PartyPopper() {
  const party = useLoader(GLTFLoader, '/party_popper.gltf');
  const bottle = useLoader(GLTFLoader, '/bottle_with_popping_cork.gltf');

  const [scrollAcceleration, setScrollAcceleration] = useState(0);
  const [prevScrollY, setPrevScrollY] = useState(0);
  const requestRef = useRef();

  const maxRotation = Math.PI / 10; // Maximum rotation in radians (45 degrees)
  const decayFactor = 0.95; // Decay factor to gradually reset rotation

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

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [window.scrollY]);

  return (
    <Box position="relative" width="100%" height="100vh" overflow="hidden">
      <Canvas style={{ position: 'absolute', top: 0, left: "8%", width: '100%', height: '100%' }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[1.3, 1.3, 1.3]} intensity={9} />
        <primitive
          object={party.scene}
          position={[-1, 0, -2]}
          scale={[2.7, 2.8, 2.3]}
          rotation={[clampRotation(scrollAcceleration), 0, 0]} // Apply clamped rotation
        />
        <pointLight position={[-1, 1.3, -1]} intensity={4} />
        <primitive
          object={bottle.scene}
          position={[1, 0, 1]}
          scale={[2, 2, 2]}
          rotation={[clampRotation(scrollAcceleration), 0, 0]} // Apply clamped rotation
        />
      </Canvas>
    </Box>
  );
}
