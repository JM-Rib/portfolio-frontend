// EmojiComponent.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useLoader } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';

function TextEmoji() {
  const gltf = useLoader(GLTFLoader, '/star.gltf');

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
    <Canvas style={{ display: 'inline-block', verticalAlign: 'middle', width: '1.5em', height: '1.5em', marginRight: '0.2em' }}>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <primitive object={gltf.scene} scale={[2.8, 2.8, 2.8]} rotation={[scrollAcceleration * 0.009, 0, 0]} />
    </Canvas>
  );
}

export default TextEmoji;
