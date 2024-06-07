import React, { useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useLoader } from '@react-three/fiber';

export default function PartyPopper() {
  const party = useLoader(GLTFLoader, '/party_popper.gltf');
  const bottle = useLoader(GLTFLoader, '/bottle_with_popping_cork.gltf');

  const [scrollAcceleration, setScrollAcceleration] = useState(0);
  const [prevScrollY, setPrevScrollY] = useState(0);
  const requestRef = useRef();

  // Define a maximum rotation threshold in radians
  const maxRotation = Math.PI / 8; // 45 degrees in radians
  // Define a decay factor to reduce rotation gradually
  const decayFactor = 0.92; // Reduces rotation by 5% each frame

  // Function to clamp the rotation value within the max threshold
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
    <Canvas style={{ width: '100vw', height: '100vh', left: '8%' }}>
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
  );
}
