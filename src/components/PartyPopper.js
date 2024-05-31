import React, { useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useLoader } from '@react-three/fiber';

function PartyPopper() {
  const gltf = useLoader(GLTFLoader, '/party_popper.gltf');

  const [scrollAcceleration, setScrollAcceleration] = useState(0);
  const [prevScrollY, setPrevScrollY] = useState(0);
  const requestRef = useRef();

  const animate = () => {
    setScrollAcceleration(window.scrollY - prevScrollY);
    setPrevScrollY(window.scrollY);
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(requestRef.current);
  }, [window.scrollY]);

  return (
    <Canvas style={{ display: 'inline-block', verticalAlign: 'middle', width: 'sm', height: 'sm', marginRight: 'md' }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[1.3, 1.3, 1.3]} intensity={9} />
      <primitive object={gltf.scene} scale={[2.7, 2.8, 2.3]} rotation={[scrollAcceleration * 0.009, 0, 0]} />
    </Canvas>
  );
}

export default PartyPopper;
