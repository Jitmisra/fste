import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Text, Grid, useHelper, PointMaterial, Points, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { gsap } from 'gsap';

// Building component with enhanced hover effects
const Building = ({ position, size, type, ...props }) => {
  const colors = {
    residential: '#4682B4', // Steel blue
    store: '#9370DB',       // Medium purple
    darkStore: '#FF6347',   // Tomato
    office: '#3CB371',      // Medium sea green
  };
  
  const glowColors = {
    residential: '#93c5fd', 
    store: '#c4b5fd',
    darkStore: '#fca5a5',  
    office: '#6ee7b7', 
  };
  
  const buildingRef = useRef();
  const [hovered, setHovered] = useState(false);
  
  useEffect(() => {
    if (buildingRef.current) {
      // Enhanced animation with bouncy effect
      gsap.to(buildingRef.current.scale, {
        y: hovered ? 1.2 : 1,
        duration: 0.4,
        ease: "elastic.out(1.2, 0.5)"
      });
      
      // Add glow effect on hover
      gsap.to(buildingRef.current.material, {
        emissive: new THREE.Color(hovered ? glowColors[type] : '#000000'),
        emissiveIntensity: hovered ? 0.5 : 0,
        duration: 0.3
      });
    }
  }, [hovered, type, glowColors]);

  return (
    <mesh
      position={position}
      ref={buildingRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      castShadow
      receiveShadow
      {...props}
    >
      <boxGeometry args={size} />
      <meshStandardMaterial 
        color={colors[type] || '#777777'} 
        roughness={0.3}
        metalness={0.5}
      />
      {hovered && (
        <Text
          position={[0, size[1]/2 + 0.5, 0]}
          fontSize={0.3}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.02}
          outlineColor="#000000"
        >
          {type === 'darkStore' ? 'Dark Store' : 
           type === 'residential' ? 'Residential' : 
           type === 'store' ? 'Retail Store' : 'Office'}
        </Text>
      )}
    </mesh>
  );
};

// Delivery rider with trailing effect
const DeliveryRider = ({ startPosition, endPosition, duration = 10, color = '#F4A460' }) => {
  const riderRef = useRef();
  const timeRef = useRef(0);
  const [active, setActive] = useState(true);
  const trailPoints = useRef([]);
  const maxTrailPoints = 10;
  
  useFrame((state, delta) => {
    if (riderRef.current && active) {
      timeRef.current += delta;
      
      // Reset after completing a delivery
      if (timeRef.current > duration) {
        timeRef.current = 0;
      }
      
      const t = timeRef.current / duration;
      
      // Move along a path with slight vertical movement to simulate riding
      riderRef.current.position.x = THREE.MathUtils.lerp(startPosition[0], endPosition[0], t);
      riderRef.current.position.z = THREE.MathUtils.lerp(startPosition[2], endPosition[2], t);
      riderRef.current.position.y = 0.1 + Math.sin(state.clock.elapsedTime * 10) * 0.05;
      
      // Rotate to face direction of travel
      const angle = Math.atan2(
        endPosition[0] - startPosition[0],
        endPosition[2] - startPosition[2]
      );
      riderRef.current.rotation.y = angle;
      
      // Add trail effect
      if (state.clock.elapsedTime % 0.1 < delta) {
        trailPoints.current.push({
          position: riderRef.current.position.clone(),
          time: state.clock.elapsedTime
        });
        
        // Remove old points
        if (trailPoints.current.length > maxTrailPoints) {
          trailPoints.current.shift();
        }
      }
    }
  });

  return (
    <group>
      {/* Trail effect */}
      {trailPoints.current.map((point, index) => (
        <mesh 
          key={index} 
          position={point.position}
          scale={[0.05, 0.05, 0.05].map(s => s * (index / maxTrailPoints))}
        >
          <sphereGeometry args={[1, 8, 8]} />
          <meshBasicMaterial 
            color={color}
            transparent={true}
            opacity={(index / maxTrailPoints) * 0.5}
          />
        </mesh>
      ))}
      
      {/* Main rider */}
      <mesh 
        ref={riderRef}
        position={startPosition}
        onClick={() => setActive(!active)}
      >
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial 
          color={color} 
          emissive={color}
          emissiveIntensity={0.5}
        />
        <pointLight
          color={color}
          intensity={1}
          distance={0.5}
        />
      </mesh>
    </group>
  );
};

// Enhanced road with neon effects
const Road = ({ start, end, width = 0.3 }) => {
  const roadRef = useRef();
  const glowRef = useRef();
  
  // Calculate length and position
  const length = Math.sqrt(
    Math.pow(end[0] - start[0], 2) + 
    Math.pow(end[2] - start[2], 2)
  );
  
  const position = [
    (start[0] + end[0]) / 2,
    0.01, // Slightly above ground
    (start[2] + end[2]) / 2
  ];
  
  // Calculate rotation
  const angle = Math.atan2(
    end[0] - start[0],
    end[2] - start[2]
  );

  useFrame((state) => {
    if (glowRef.current) {
      // Subtle pulsing effect
      glowRef.current.material.opacity = 0.3 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  return (
    <group>
      <mesh 
        ref={roadRef}
        position={position}
        rotation={[0, angle, 0]}
        receiveShadow
      >
        <planeGeometry args={[width, length]} />
        <meshStandardMaterial 
          color="#333333" 
          side={THREE.DoubleSide} 
          roughness={0.4}
        />
      </mesh>
      
      {/* Neon glow effect */}
      <mesh
        ref={glowRef}
        position={[position[0], position[1] + 0.001, position[2]]}
        rotation={[0, angle, 0]}
      >
        <planeGeometry args={[width * 0.6, length]} />
        <meshBasicMaterial
          color="#4361ee"
          transparent={true}
          opacity={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
};

// Ground plane with enhanced grid
const Ground = () => {
  return (
    <>
      {/* Base mesh */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color="#f0f0f0" />
      </mesh>
      
      {/* Grid overlay with animated fading */}
      <Grid 
        position={[0, 0.01, 0]} 
        args={[30, 30]} 
        cellSize={1}
        cellThickness={0.3}
        cellColor="#a0a0a0"
        sectionSize={5}
        sectionThickness={1}
        sectionColor="#4361ee"
        fadeDistance={30}
        fadeStrength={1.5}
        followCamera={false}
      />
      
      {/* Ambient particles */}
      <Sparkles 
        count={100}
        scale={10}
        size={1}
        speed={0.2}
        opacity={0.3}
        color="#61dafb"
        noise={[0.1, 0.1, 0.1]}
      />
    </>
  );
};

// Main city component with enhanced lighting
const City = () => {
  // Building layouts - positions, sizes, and types
  const buildings = [
    // Dark stores
    { position: [-4, 0.75, -3], size: [1.5, 1.5, 1.5], type: 'darkStore' },
    { position: [4, 0.75, 3], size: [1.5, 1.5, 1.5], type: 'darkStore' },
    { position: [-3, 0.75, 4], size: [1.5, 1.5, 1.5], type: 'darkStore' },
    
    // Residential buildings
    { position: [-6, 1.5, -6], size: [1, 3, 1], type: 'residential' },
    { position: [-4, 2, -6], size: [1, 4, 1], type: 'residential' },
    { position: [-2, 2.5, -6], size: [1, 5, 1], type: 'residential' },
    { position: [2, 2, 6], size: [1, 4, 1], type: 'residential' },
    { position: [4, 1.5, 6], size: [1, 3, 1], type: 'residential' },
    { position: [6, 2.5, 6], size: [1, 5, 1], type: 'residential' },
    { position: [6, 2, -2], size: [1, 4, 1], type: 'residential' },
    { position: [6, 2.5, 0], size: [1, 5, 1], type: 'residential' },
    { position: [6, 1.5, 2], size: [1, 3, 1], type: 'residential' },
    
    // Traditional stores
    { position: [0, 1, -6], size: [2, 2, 1], type: 'store' },
    { position: [-6, 1, 0], size: [1, 2, 2], type: 'store' },
    
    // Office buildings
    { position: [2, 3, -6], size: [1, 6, 1], type: 'office' },
    { position: [4, 4, -6], size: [1, 8, 1], type: 'office' },
    { position: [6, 3.5, -6], size: [1, 7, 1], type: 'office' },
  ];
  
  // Delivery routes
  const deliveryRoutes = [
    { start: [-4, 0.1, -3], end: [-6, 0.1, -6], duration: 8 },
    { start: [-4, 0.1, -3], end: [-4, 0.1, -6], duration: 6 },
    { start: [4, 0.1, 3], end: [6, 0.1, 2], duration: 5 },
    { start: [4, 0.1, 3], end: [4, 0.1, 6], duration: 7 },
    { start: [-3, 0.1, 4], end: [2, 0.1, 6], duration: 9 },
  ];
  
  // Roads to connect buildings
  const roads = [
    { start: [-6, 0, -6], end: [6, 0, -6] },
    { start: [-6, 0, 6], end: [6, 0, 6] },
    { start: [-6, 0, -6], end: [-6, 0, 6] },
    { start: [6, 0, -6], end: [6, 0, 6] },
    { start: [-6, 0, 0], end: [6, 0, 0] },
    { start: [0, 0, -6], end: [0, 0, 6] },
    { start: [-4, 0, -3], end: [-4, 0, -6] },
    { start: [4, 0, 3], end: [4, 0, 6] },
    { start: [-3, 0, 4], end: [0, 0, 4] },
  ];

  return (
    <>
      {/* Enhanced lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={1}
        castShadow 
        shadow-mapSize={[1024, 1024]}
      />
      
      {/* Add atmospheric fog */}
      <fog attach="fog" args={['#f0f0f0', 15, 30]} />
      
      {/* Ground */}
      <Ground />
      
      {/* Buildings */}
      {buildings.map((building, index) => (
        <Building 
          key={index}
          position={building.position}
          size={building.size}
          type={building.type}
        />
      ))}
      
      {/* Roads */}
      {roads.map((road, index) => (
        <Road 
          key={index}
          start={road.start}
          end={road.end}
        />
      ))}
      
      {/* Delivery riders */}
      {deliveryRoutes.map((route, index) => (
        <DeliveryRider 
          key={index}
          startPosition={route.start}
          endPosition={route.end}
          duration={route.duration}
        />
      ))}
      
      {/* Legend with enhanced styling */}
      <Text
        position={[-7, 0.1, -7]}
        fontSize={0.4}
        color="#000000"
        anchorX="left"
        anchorY="middle"
        maxWidth={8}
        outlineWidth={0.02}
        outlineColor="#ffffff"
      >
        Quick Commerce Ecosystem:
        Red = Dark Stores
        Blue = Residential
        Purple = Retail Stores
        Moving Dots = Delivery Riders
      </Text>
    </>
  );
};

// Main component with performance optimizations
const ThreeJsCity = () => {
  // Use a ref to store the canvas DOM element
  const canvasRef = useRef();
  const [isVisible, setIsVisible] = useState(false);
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    // Check if the element is in viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    
    if (canvasRef.current) {
      observer.observe(canvasRef.current);
    }
    
    return () => {
      if (canvasRef.current) {
        observer.unobserve(canvasRef.current);
      }
    };
  }, []);
  
  // Set loaded after a delay for smooth appearance
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      ref={canvasRef}
      className={`w-full h-[600px] bg-gray-100 rounded-lg overflow-hidden transition-all duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`}
    >
      {isVisible && (
        <Canvas
          camera={{ position: [0, 10, 15], fov: 50 }}
          shadows
          dpr={[1, 2]} // Optimize for different pixel ratios
          performance={{ min: 0.5 }} // Adjust performance for smoother rendering
          gl={{ 
            antialias: true,
            alpha: true,
            powerPreference: "high-performance"
          }}
        >
          <City />
          <OrbitControls 
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={5}
            maxDistance={20}
            maxPolarAngle={Math.PI / 2 - 0.1} // Prevent going below ground
            autoRotate={!isVisible} // Auto-rotate when not in focus
            autoRotateSpeed={0.5}
            enableDamping={true} // Add smooth damping effect
            dampingFactor={0.07}
          />
        </Canvas>
      )}
    </div>
  );
};

export default ThreeJsCity;
