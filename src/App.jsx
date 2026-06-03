import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Stars } from '@react-three/drei';

const mouse = { x: 0, y: 0 };
const isMobile = window.innerWidth < 768;

function MovingStars() {
  const starsRef = useRef();

  useFrame(() => {
    if (!isMobile && starsRef.current) {
      const targetX = mouse.x * 0.8;
      const targetY = mouse.y * 0.8;
      starsRef.current.rotation.y += (targetX - starsRef.current.rotation.y) * 0.03;
      starsRef.current.rotation.x += (-targetY - starsRef.current.rotation.x) * 0.03;
    }
  });

  return (
    <group ref={starsRef}>
      <Stars radius={100} depth={50} count={1200} factor={6} saturation={0} fade speed={0.5} />
    </group>
  );
}

function ProductObject() {
  return (
    <Float speed={2.5} rotationIntensity={0.6} floatIntensity={0.8}>
      <mesh castShadow receiveShadow>

        <torusKnotGeometry args={[isMobile ? 0.45 : 0.8, 0.22, 200, 20]} />
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
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: "#030305",
        position: "relative",
        overflow: "hidden",
        fontFamily: "sans-serif",
        userSelect: "none"
      }}
      onMouseMove={(e) => {
        mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
        mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2;
      }}
      onMouseLeave={() => {
        mouse.x = 0;
        mouse.y = 0;
      }}
      onTouchMove={(e) => {
        const touch = e.touches[0];
        mouse.x = (touch.clientX / window.innerWidth - 0.5) * 2;
        mouse.y = -(touch.clientY / window.innerHeight - 0.5) * 2;
      }}
      onTouchEnd={() => {
        mouse.x = 0;
        mouse.y = 0;
      }}
    >
      <style>{`
        .hero-title {
          font-size: 3.8rem;
          font-weight: 800;
          margin: 0 0 20px 0;
          letter-spacing: -1px;
          line-height: 1.1;
        }
        .hero-desc {
          font-size: 1.1rem;
          color: #94a3b8;
          max-width: 460px;
          margin: 0 0 35px 0;
          line-height: 1.6;
        }
        .gradient-text {
          background: linear-gradient(to right, #c084fc, #a5b4fc, #22d3ee);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        @media (max-width: 768px) {
          .hero-title { font-size: 2.2rem !important; text-align: center; margin-bottom: 12px !important; }
          .hero-desc { font-size: 0.9rem !important; text-align: center; max-width: 100% !important; margin-bottom: 20px !important; }
          .interface-container { padding: 25px 20px !important; z-index: 5 !important; } /* მობილურზე ინტერფეისი გადადის ზემოთ */
          .main-content { align-items: center !important; text-align: center !important; justify-content: flex-start !important; padding-top: 20px; }
          .cta-button { align-self: center !important; pointer-events: auto !important; }
        }
      `}</style>

      {/* HTML INTERFACE OVERLAY */}
      <div className="interface-container" style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: isMobile ? 3 : 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxSizing: "border-box",
        padding: isMobile ? "30px 20px" : "40px 60px",
        pointerEvents: isMobile ? "none" : "auto",
        color: "#ffffff"
      }}>
        {/* Header */}
        <header style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", pointerEvents: "auto" }}>
          <div className="gradient-text" style={{ fontSize: "1.25rem", fontWeight: "700", letterSpacing: "0.1em" }}>
            AVTANDIL44 3D
          </div>
          <button style={{
            fontSize: "0.85rem",
            border: "1px solid rgba(255,255,255,0.1)",
            background: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(10px)",
            padding: "8px 20px",
            borderRadius: "30px",
            color: "#ffffff",
            cursor: "pointer"
          }}>
            Connect
          </button>
        </header>

        {/* Main Content - Raised higher on desktop */}
        <main className="main-content" style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          paddingTop: isMobile ? "20px" : "120px",
          flex: 1
        }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: isMobile ? "center" : "flex-start", pointerEvents: "auto" }}>
            <h1 className="hero-title">
              The Future of <br />
              <span className="gradient-text">Digital Artifacts</span>
            </h1>

            <p className="hero-desc">
              Interact with premium hardware-accelerated 3D graphics built directly for modern digital interfaces. Drag to explore.
            </p>

            <button className="cta-button" style={{
              background: "linear-gradient(to right, #9333ea, #0891b2)",
              color: "#ffffff",
              fontWeight: "600",
              padding: "14px 32px",
              borderRadius: "30px",
              border: "none",
              cursor: "pointer",
              boxShadow: "0 0 30px rgba(168,85,247,0.3)",
              transition: "all 0.3s ease"
            }}
              onMouseEnter={(e) => { e.target.style.boxShadow = "0 0 40px rgba(6,182,212,0.5)"; }}
              onMouseLeave={(e) => { e.target.style.boxShadow = "0 0 30px rgba(168,85,247,0.3)"; }}
            >
              Explore Showcase
            </button>
          </div>
        </main>

        {/* Footer */}
        <footer style={{ width: "100%", display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "#64748b", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "15px", pointerEvents: "auto" }}>
          <p>© 2026 Avtandil Abuashvili</p>
          {!isMobile && <p>Scroll or Drag to view</p>}
        </footer>
      </div>

      {/* INTERACTIVE CANVAS */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: isMobile ? 1 : 2,
        pointerEvents: "auto"
      }}>

        <Canvas
          camera={{ position: [0, 0, 4.5], fov: isMobile ? 65 : 50 }}
          dpr={[1, 2]}
          gl={{ powerPreference: "high-performance", antialias: true, alpha: true }}
        >
          <ambientLight intensity={0.8} />
          <pointLight position={[-4, 3, 3]} intensity={5} color="#a855f7" />
          <pointLight position={[4, -3, 3]} intensity={5} color="#06b6d4" />
          <directionalLight position={[0, 0, 4]} intensity={2.0} color="#ffffff" />
          <MovingStars />


          <group position={[isMobile ? 0 : 1.2, isMobile ? -0.6 : 0, 0]}>
            <ProductObject />
          </group>

          <OrbitControls enableZoom={false} enablePan={false} autoRotate={true} autoRotateSpeed={0.8} />
        </Canvas>
      </div>

    </div>
  );
}