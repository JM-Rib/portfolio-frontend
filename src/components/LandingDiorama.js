import React, { useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useLoader } from '@react-three/fiber';
import { Box, Heading } from '@chakra-ui/react';
import { OrthographicCamera } from '@react-three/drei';

export default function LandingDiorama({ width }) {
  const party = useLoader(GLTFLoader, '/party_popper.gltf');
  const bottle = useLoader(GLTFLoader, '/bottle_with_popping_cork.gltf');

  const [scrollAcceleration, setScrollAcceleration] = useState(0);
  const [prevScrollY, setPrevScrollY] = useState(0);
  const requestRef = useRef();

  const maxRotation = Math.PI / 10; // Maximum rotation in radians (45 degrees)
  const decayFactor = 0.95; // Decay factor to gradually reset rotation

  const minWidth = 320; // Minimum width (e.g., mobile)
  const maxWidth = 1280; // Maximum width (e.g., large desktop)

  const clampRotation = (rotation) => {
    return Math.max(-maxRotation, Math.min(maxRotation, rotation));
  };

  const animate = () => {
    const deltaY = window.scrollY - prevScrollY;
    setScrollAcceleration((prev) => clampRotation(prev + deltaY * 0.009));
    setPrevScrollY(window.scrollY);

    setScrollAcceleration((prev) => prev * decayFactor);

    requestRef.current = requestAnimationFrame(animate);
  };

  const lerp = (start, end, factor) => start + (end - start) * factor;

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [window.scrollY]);

  const normalizedWidth = Math.min(Math.max((width - minWidth) / (maxWidth - minWidth), 0), 1);

  const bottlePosition = [
    lerp(0.2, 3.9, normalizedWidth), // X
    lerp(1.3, -0.1, normalizedWidth), // Y
    lerp(-0.5, 4, normalizedWidth), // Z
  ];

  const bottleScale = [
    lerp(1.3, 2.7, normalizedWidth),
    lerp(1.3, 2.7, normalizedWidth),
    lerp(1.0, 2.7, normalizedWidth),
  ];

  const partyPosition = [
    lerp(-0.7, 1.7, normalizedWidth), // X
    lerp(1.8, 1, normalizedWidth), // Y
    lerp(-1.2, -2, normalizedWidth), // Z
  ];

  const partyScale = [
    lerp(1, 2, normalizedWidth),
    lerp(1, 1.9, normalizedWidth),
    lerp(1, 1.8, normalizedWidth),
  ];

  const light1Position = [
    lerp(-0.6,  1.8,  normalizedWidth), // X
    lerp(2, 2.2,  normalizedWidth), // Y
    lerp( -0.5, -0.5, normalizedWidth), // Z
  ];

  const light2Position = [
    lerp( -1, 0.7, normalizedWidth), // X
    lerp( 0.8, -1.3, normalizedWidth), // Y
    lerp( -0.8, -1.5, normalizedWidth), // Z
  ];

  const light3Position = [
    lerp(0.6,  5,  normalizedWidth), // X
    lerp(1.8, 1.5,normalizedWidth), // Y
    lerp(1.3, 6.2,normalizedWidth), // Z
  ];

  const light1Intensity = lerp(1, 4, normalizedWidth);
  const light2Intensity = lerp(1, 4, normalizedWidth);
  const light3Intensity = lerp(14, 28, normalizedWidth);

  return (
    <Box position="relative" width="100%" height="100%" bottom={["3%", "3%", "7%", "7%"]} overflow="hidden">
      <Canvas style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
        <OrthographicCamera makeDefault position={[0, 0, 10]} zoom={100} near={0.1} far={100} />
        <ambientLight intensity={0.5} />
        <pointLight position={light1Position} intensity={light1Intensity} />
        <pointLight position={light2Position} intensity={light2Intensity} />
        <primitive
          object={party.scene}
          position={partyPosition}
          scale={partyScale}
          rotation={[clampRotation(scrollAcceleration), -0.25, -0.1]} // Apply clamped rotation
        />
        <pointLight position={light3Position} intensity={light3Intensity} />
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
