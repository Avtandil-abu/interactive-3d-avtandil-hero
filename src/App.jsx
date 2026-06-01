import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';

function InteractiveStars() {
  const starsRef = useRef();
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const [positions] = useState(() => {
    const pos = [];
    for (let i = 0; i < 400; i++) {
      pos.push((Math.random() - 0.5) * 25);
      pos.push((Math.random() - 0.5) * 25);
      pos.push((Math.random() - 0.5) * 25);
    }
    return new Float32Array(pos);
  });

  useFrame((state) => {
    starsRef.current.rotation.x = state.clock.getElapsedTime() * 0.008 + mouse.current.y * 0.03;
    starsRef.current.rotation.y = state.clock.getElapsedTime() * 0.008 + mouse.current.x * 0.03;
  });

  return (
    <points ref={starsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#ffffff"
        size={0.04}
        sizeAttenuation={true}
        transparent
        opacity={0.4}
        depthWrite={false}
      />
    </points>
  );
}

function ProductObject() {
  return (
    <Float
      speed={2.5}
      rotationIntensity={0.6}
      floatIntensity={0.8}
    >
      <mesh castShadow receiveShadow>
        {/* დავაპატარავეთ მოდელის საწყისი რადიუსი 0.8-მდე */}
        <torusKnotGeometry args={[0.8, 0.26, 200, 20]} />

        <meshPhysicalMaterial
          metalness={0.95}
          roughness={0.15}
          color="#2e2a63"
          clearcoat={1.0}
          clearcoatRoughness={0.05}
          reflectivity={1}
        />
      </mesh>
    </Float>
  );
}

export default function App() {
  return (
    <div className="relative w-screen h-screen bg-[#030305] text-white overflow-hidden font-sans select-none">

      {/* 3D სცენა – დიდ ეკრანზე იკავებს ზუსტად მარჯვენა 50%-ს, რომ მარცხნივ მაუსი თავისუფლად მუშაობდეს */}
      <div className="absolute inset-0 z-0 md:left-[50%] w-full md:w-[50%] h-full">
        {/* camera.position 3.8-დან ავწიეთ 4.5-მდე, რამაც ფიგურა პროპორციულად დააპატარავა ეკრანზე */}
        <Canvas camera={{ position: [0, 0, 4.5], fov: 50 }}>
          <ambientLight intensity={1.0} />

          <pointLight position={[-4, 3, 3]} intensity={18} color="#a855f7" />
          <pointLight position={[4, -3, 3]} intensity={18} color="#06b6d4" />

          <directionalLight position={[0, 0, 4]} intensity={3.5} color="#ffffff" />
          <directionalLight position={[0, 4, -2]} intensity={2.5} color="#ffffff" />
          <directionalLight position={[-3, -3, -2]} intensity={2} color="#ffffff" />

          <InteractiveStars />
          <ProductObject />

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate={true}
            autoRotateSpeed={0.8}
          />
        </Canvas>
      </div>

      {/* UI ინტერფეისი */}
      <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-12 pointer-events-none z-10 max-w-7xl mx-auto w-full left-1/2 -translate-x-1/2">

        <header className="w-full flex justify-between items-center pointer-events-auto">
          <div className="text-xl font-bold tracking-wider bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            AVTANDIL44 3D
          </div>
          <button className="text-sm border border-white/10 bg-white/5 backdrop-blur-md px-5 py-2 rounded-full hover:bg-white/10 transition-all duration-300">
            Connect
          </button>
        </header>

        {/* ტექსტის ბლოკი – მივეცით pointer-events-auto, რომ აქ მაუსის მარჯვენა კლიკი ყოველთვის მუშაობდეს */}
        <main className="w-full flex flex-col items-center md:items-start text-center md:text-left my-auto max-w-xl pointer-events-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.1] mb-6">
            The Future of <br />
            <span className="bg-gradient-to-r from-purple-400 via-indigo-300 to-cyan-400 bg-clip-text text-transparent">
              Digital Artifacts
            </span>
          </h1>

          <p className="text-gray-400 text-sm sm:text-base md:text-lg mb-8 leading-relaxed max-w-md">
            Interact with premium hardware-accelerated 3D graphics built directly for modern digital interfaces. Drag to explore.
          </p>

          <button className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-medium px-8 py-3.5 rounded-full shadow-[0_0_30px_rgba(168,85,247,0.3)] hover:shadow-[0_0_40px_rgba(6,182,212,0.5)] transition-all duration-300 transform hover:-translate-y-0.5">
            Explore Showcase
          </button>
        </main>

        <footer className="w-full flex justify-between text-xs text-gray-500 pt-4 border-t border-white/5">
          <p>© 2026 Avtandil Abuashvili</p>
          <p className="hidden sm:block">Scroll or Drag to view</p>
        </footer>

      </div>
    </div>
  );
}