import React, { Suspense, useRef, useState } from 'react';
import { Canvas, useLoader, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Line } from '@react-three/drei';
import * as THREE from 'three';

const TexturedPlanet = ({
  textureUrl,
  position,
  size,
  info,
  onClick,
  speed = 0,
}: {
  textureUrl: string;
  position: [number, number, number];
  size: number;
  info: { name: string; density: string; temperature: string; gravity: string };
  onClick?: (position: [number, number, number]) => void;
  speed?: number;
}) => {
  const texture = useLoader(THREE.TextureLoader, textureUrl);
  const meshRef = useRef<THREE.Mesh>(null!);
  const groupRef = useRef<THREE.Group>(null!);
  const [hovered, setHovered] = useState(false);
  const isSun = textureUrl === "/sun.jpg";

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.001;
    }
    if (groupRef.current && speed > 0) {
      const t = clock.getElapsedTime() * speed;
      const radius = Math.sqrt(position[0] ** 2 + position[2] ** 2);
      groupRef.current.position.x = Math.cos(t) * radius;
      groupRef.current.position.z = Math.sin(t) * radius;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => onClick?.(position)}
        scale={hovered ? 1.1 : 1}
      >
        <sphereGeometry args={[size, 32, 32]} />
        {isSun ? (
          <meshBasicMaterial map={texture} />
        ) : (
          <meshStandardMaterial map={texture} emissive={hovered ? new THREE.Color('white') : new THREE.Color('black')} emissiveIntensity={hovered ? 0.05 : 0} />
        )}
      </mesh>
    </group>
  );
};

const PlanetScene = () => {
  const [targetPosition, setTargetPosition] = useState<[number, number, number]>([4, 0, 0]);
  const [selectedPlanet, setSelectedPlanet] = useState<{ name: string; density: string; temperature: string; gravity: string } | null>(null);

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <Canvas camera={{ position: [0, 0, 10] }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} />
        <Suspense fallback={null}>
          <directionalLight 
            position={[0, 0, 0]} 
            intensity={2}
            color="white"
            castShadow 
          />
          <directionalLight
            position={[50, 50, 50]}
            intensity={1}
            color="white"
            castShadow
          />
          {[6, 10, 15, 20, 25, 30].map((radius, i) => {
            const points = [];
            const segments = 64;
            for (let j = 0; j <= segments; j++) {
              const theta = (j / segments) * Math.PI * 2;
              points.push(new THREE.Vector3(Math.cos(theta) * radius, 0, Math.sin(theta) * radius));
            }
            return <Line key={i} points={points} color="rgba(255, 255, 255, 0.15)" lineWidth={0.5} dashed />;
          })}
          <TexturedPlanet 
            textureUrl="/sun.jpg" 
            position={[0, 0, 0]} 
            size={3.5} 
            info={{ name: "Sun", density: "1.41 g/cm³", temperature: "5,778 K", gravity: "274 m/s²" }} 
            onClick={() => {
              const x = 0, y = 0, z = 0;
              const newTarget = new THREE.Vector3(x, y, z);
              let progress = 0;
              const animate = () => {
                progress += 0.02;
                if (progress >= 1) {
                  setTargetPosition([x, y, z]);
                  return;
                }
                const current = new THREE.Vector3(...targetPosition).lerp(newTarget, progress);
                setTargetPosition([current.x, current.y, current.z]);
                requestAnimationFrame(animate);
              };
              animate();
              setSelectedPlanet({ name: "Sun", density: "1.41 g/cm³", temperature: "5,778 K", gravity: "274 m/s²" });
            }} 
          />
          <TexturedPlanet 
            textureUrl="/earth.jpg" 
            position={[6, 0, 0]} 
            size={1.5} 
            info={{ name: "Earth", density: "5.51 g/cm³", temperature: "15°C", gravity: "9.8 m/s²" }} 
            onClick={() => {
              const x = 6, y = 0, z = 0;
              const newTarget = new THREE.Vector3(x, y, z);
              let progress = 0;
              const animate = () => {
                progress += 0.02;
                if (progress >= 1) {
                  setTargetPosition([x, y, z]);
                  return;
                }
                const current = new THREE.Vector3(...targetPosition).lerp(newTarget, progress);
                setTargetPosition([current.x, current.y, current.z]);
                requestAnimationFrame(animate);
              };
              animate();
              setSelectedPlanet({ name: "Earth", density: "5.51 g/cm³", temperature: "15°C", gravity: "9.8 m/s²" });
            }} 
            speed={0.25}
          />
          <TexturedPlanet 
            textureUrl="/mars.jpg" 
            position={[10, 0, 0]} 
            size={1.2} 
            info={{ name: "Mars", density: "3.93 g/cm³", temperature: "-63°C", gravity: "3.7 m/s²" }} 
            onClick={() => {
              const x = 10, y = 0, z = 0;
              const newTarget = new THREE.Vector3(x, y, z);
              let progress = 0;
              const animate = () => {
                progress += 0.02;
                if (progress >= 1) {
                  setTargetPosition([x, y, z]);
                  return;
                }
                const current = new THREE.Vector3(...targetPosition).lerp(newTarget, progress);
                setTargetPosition([current.x, current.y, current.z]);
                requestAnimationFrame(animate);
              };
              animate();
              setSelectedPlanet({ name: "Mars", density: "3.93 g/cm³", temperature: "-63°C", gravity: "3.7 m/s²" });
            }} 
            speed={0.19}
          />
          <TexturedPlanet 
            textureUrl="/jupiter.jpg" 
            position={[15, 0, 0]} 
            size={2} 
            info={{ name: "Jupiter", density: "1.33 g/cm³", temperature: "-145°C", gravity: "24.8 m/s²" }} 
            onClick={() => {
              const x = 15, y = 0, z = 0;
              const newTarget = new THREE.Vector3(x, y, z);
              let progress = 0;
              const animate = () => {
                progress += 0.02;
                if (progress >= 1) {
                  setTargetPosition([x, y, z]);
                  return;
                }
                const current = new THREE.Vector3(...targetPosition).lerp(newTarget, progress);
                setTargetPosition([current.x, current.y, current.z]);
                requestAnimationFrame(animate);
              };
              animate();
              setSelectedPlanet({ name: "Jupiter", density: "1.33 g/cm³", temperature: "-145°C", gravity: "24.8 m/s²" });
            }} 
            speed={0.13}
          />
          <TexturedPlanet 
            textureUrl="/saturn.jpg" 
            position={[20, 0, 0]} 
            size={1.8} 
            info={{ name: "Saturn", density: "0.687 g/cm³", temperature: "-178°C", gravity: "10.4 m/s²" }} 
            onClick={() => {
              const x = 20, y = 0, z = 0;
              const newTarget = new THREE.Vector3(x, y, z);
              let progress = 0;
              const animate = () => {
                progress += 0.02;
                if (progress >= 1) {
                  setTargetPosition([x, y, z]);
                  return;
                }
                const current = new THREE.Vector3(...targetPosition).lerp(newTarget, progress);
                setTargetPosition([current.x, current.y, current.z]);
                requestAnimationFrame(animate);
              };
              animate();
              setSelectedPlanet({ name: "Saturn", density: "0.687 g/cm³", temperature: "-178°C", gravity: "10.4 m/s²" });
            }} 
            speed={0.096}
          />
          <TexturedPlanet 
            textureUrl="/uranus.jpg" 
            position={[25, 0, 0]} 
            size={1.6} 
            info={{ name: "Uranus", density: "1.27 g/cm³", temperature: "-224°C", gravity: "8.7 m/s²" }} 
            onClick={() => {
              const x = 25, y = 0, z = 0;
              const newTarget = new THREE.Vector3(x, y, z);
              let progress = 0;
              const animate = () => {
                progress += 0.02;
                if (progress >= 1) {
                  setTargetPosition([x, y, z]);
                  return;
                }
                const current = new THREE.Vector3(...targetPosition).lerp(newTarget, progress);
                setTargetPosition([current.x, current.y, current.z]);
                requestAnimationFrame(animate);
              };
              animate();
              setSelectedPlanet({ name: "Uranus", density: "1.27 g/cm³", temperature: "-224°C", gravity: "8.7 m/s²" });
            }} 
            speed={0.068}
          />
          <TexturedPlanet 
            textureUrl="/neptune.jpg" 
            position={[30, 0, 0]} 
            size={1.6} 
            info={{ name: "Neptune", density: "1.64 g/cm³", temperature: "-214°C", gravity: "11.2 m/s²" }} 
            onClick={() => {
              const x = 30, y = 0, z = 0;
              const newTarget = new THREE.Vector3(x, y, z);
              let progress = 0;
              const animate = () => {
                progress += 0.02;
                if (progress >= 1) {
                  setTargetPosition([x, y, z]);
                  return;
                }
                const current = new THREE.Vector3(...targetPosition).lerp(newTarget, progress);
                setTargetPosition([current.x, current.y, current.z]);
                requestAnimationFrame(animate);
              };
              animate();
              setSelectedPlanet({ name: "Neptune", density: "1.64 g/cm³", temperature: "-214°C", gravity: "11.2 m/s²" });
            }} 
            speed={0.054}
          />
        </Suspense>
        <OrbitControls
          makeDefault
          enableDamping
          dampingFactor={0.1}
          enablePan={false}
          maxDistance={50}
          minDistance={3}
          target={[targetPosition[0], targetPosition[1], targetPosition[2]]}
          onUpdate={(controls) => {
            if (controls && controls.object) {
              controls.target.set(targetPosition[0], targetPosition[1], targetPosition[2]);
            }
          }}
        />
        <Stars
          radius={200}
          depth={60}
          count={8000}
          factor={6}
          saturation={0}
          fade
          speed={2}
        />
      </Canvas>
      {selectedPlanet && (
        <div style={{ position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)', background: 'rgba(0,0,0,0.7)', padding: '1rem 1.5rem', borderRadius: '12px', color: 'white' }}>
          <h3>{selectedPlanet.name}</h3>
          <p>Density: {selectedPlanet.density}</p>
          <p>Temperature: {selectedPlanet.temperature}</p>
          <p>Gravity: {selectedPlanet.gravity}</p>
        </div>
      )}
    </div>
  );
};

export default PlanetScene;