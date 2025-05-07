import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Line, OrbitControls, Billboard, Sphere, useTexture, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { gsap } from 'gsap';

// Enhanced node component with glowing effect
const Node = ({ position, label, color = '#3B82F6', size = 0.7, ...props }) => {
  const nodeRef = useRef();
  const glowRef = useRef();
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  
  useEffect(() => {
    if (nodeRef.current) {
      // Enhanced elastic animation
      gsap.to(nodeRef.current.scale, {
        x: hovered || clicked ? 1.3 : 1,
        y: hovered || clicked ? 1.3 : 1,
        z: hovered || clicked ? 1.3 : 1,
        duration: 0.4,
        ease: "elastic.out(1.2, 0.5)"
      });
      
      // Animate glow intensity
      if (glowRef.current) {
        gsap.to(glowRef.current.material, {
          opacity: hovered || clicked ? 0.8 : 0.3,
          duration: 0.3
        });
      }
    }
  }, [hovered, clicked]);

  // Continuous subtle floating animation
  useFrame((state) => {
    if (nodeRef.current) {
      nodeRef.current.position.y = position.y + Math.sin(state.clock.elapsedTime + Math.random()) * 0.05;
    }
    if (glowRef.current) {
      glowRef.current.position.y = position.y + Math.sin(state.clock.elapsedTime + Math.random()) * 0.05;
    }
  });

  const activeColor = clicked ? '#10B981' : color;

  return (
    <group position={position} {...props}>
      {/* Glow sphere */}
      <mesh
        ref={glowRef}
        scale={[1.5, 1.5, 1.5]}
      >
        <sphereGeometry args={[size, 32, 32]} />
        <meshBasicMaterial 
          color={activeColor}
          transparent={true}
          opacity={0.3}
        />
      </mesh>
      
      {/* Main node sphere with shine effect */}
      <mesh 
        ref={nodeRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => setClicked(!clicked)}
      >
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial 
          color={activeColor} 
          metalness={0.7}
          roughness={0.2}
          emissive={activeColor}
          emissiveIntensity={hovered || clicked ? 0.5 : 0.2}
        />
      </mesh>
      
      {/* Add a point light for extra glow effect */}
      <pointLight 
        color={activeColor}
        intensity={hovered || clicked ? 1 : 0.5}
        distance={3}
      />
      
      <Billboard
        follow={true}
        lockX={false}
        lockY={false}
        lockZ={false}
      >
        <Text
          position={[0, size + 0.3, 0]}
          fontSize={0.4}
          color={clicked ? '#10B981' : '#000000'}
          anchorX="center"
          anchorY="middle"
          fontWeight={hovered || clicked ? 'bold' : 'normal'}
          outlineWidth={0.02}
          outlineColor="#ffffff"
        >
          {label}
        </Text>
      </Billboard>
    </group>
  );
};

// Enhanced arrow with flowing pulse effect
const Arrow = ({ start, end, curved = false, positive = true, pulseSpeed = 1, ...props }) => {
  const curveRef = useRef();
  const [t, setT] = useState(0);
  const [particles, setParticles] = useState([]);
  const particleCount = 5;
  
  useEffect(() => {
    // Create initial particles along the path
    const newParticles = [];
    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        t: i / particleCount,
        speed: 0.2 + Math.random() * 0.3
      });
    }
    setParticles(newParticles);
  }, [particleCount]);
  
  // Create points for curved or straight path
  const points = curved 
    ? [
        start,
        new THREE.Vector3(
          (start.x + end.x) / 2 + (Math.abs(end.z - start.z) * 0.5),
          (start.y + end.y) / 2 + 0.5,
          (start.z + end.z) / 2 + (Math.abs(end.x - start.x) * 0.5)
        ),
        end
      ]
    : [start, end];
    
  // Create curve from points
  const curve = new THREE.CatmullRomCurve3(points);
  
  // Animate multiple pulses along the curve
  useFrame((state, delta) => {
    setT((Math.sin(state.clock.elapsedTime * pulseSpeed) + 1) / 2);
    
    // Update particle positions
    setParticles(prev => 
      prev.map(particle => ({
        ...particle,
        t: (particle.t + delta * particle.speed) % 1
      }))
    );
  });
  
  // Calculate point positions along the curve for annotations
  const midPoint = curve.getPoint(0.5);
  
  const color = positive ? "#10B981" : "#EF4444";
  
  return (
    <group {...props}>
      {/* Line path with glow effect */}
      <Line
        points={curve.getPoints(50)}
        color={color}
        lineWidth={2}
        toneMapped={false}
      />
      
      {/* Pulse effect - multiple particles moving along the path */}
      {particles.map((particle, i) => (
        <mesh key={i} position={curve.getPoint(particle.t)}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshBasicMaterial 
            color={color}
            transparent={true}
            opacity={0.8}
          />
        </mesh>
      ))}
      
      {/* Arrowhead at the end with glow */}
      <mesh position={end} rotation={[0, Math.atan2(end.x - start.x, end.z - start.z), 0]}>
        <coneGeometry args={[0.15, 0.3, 32]} />
        <meshStandardMaterial 
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
        />
      </mesh>
      
      {/* Polarity symbol (+ or -) with clearer styling */}
      <Billboard position={[midPoint.x, midPoint.y + 0.2, midPoint.z]}>
        <Text
          fontSize={0.4}
          color={color}
          anchorX="center"
          anchorY="middle"
          fontWeight="bold"
          outlineWidth={0.03}
          outlineColor="#ffffff"
        >
          {positive ? "+" : "-"}
        </Text>
      </Billboard>
    </group>
  );
};

// Enhanced loop indicator component
const LoopIndicator = ({ position, radius = 1, clockwise = true, label, type = "R" }) => {
  const groupRef = useRef();
  const ringRef = useRef();
  
  // Rotate and pulse effect
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clockwise 
        ? state.clock.elapsedTime * 0.2 
        : -state.clock.elapsedTime * 0.2;
    }
    
    if (ringRef.current) {
      // Pulse the ring size
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
      ringRef.current.scale.set(scale, scale, scale);
    }
  });
  
  const color = type === "R" ? "#10B981" : "#EF4444";
  
  return (
    <group position={position}>
      {/* Glowing ring */}
      <mesh ref={ringRef} rotation={[Math.PI/2, 0, 0]}>
        <torusGeometry args={[radius, 0.05, 16, 32]} />
        <meshBasicMaterial 
          color={color}
          transparent={true}
          opacity={0.5}
        />
      </mesh>
      
      {/* R or B indicator with enhanced styling */}
      <Billboard>
        <Text
          position={[0, 0, 0]}
          fontSize={0.5}
          color={color}
          anchorX="center"
          anchorY="middle"
          fontWeight="bold"
          outlineWidth={0.04}
          outlineColor="#ffffff"
        >
          {type}
        </Text>
      </Billboard>
      
      {/* Rotating arrow to show loop direction */}
      <group ref={groupRef}>
        <Line
          points={[
            new THREE.Vector3(radius, 0, 0),
            new THREE.Vector3(radius * 0.8, 0, radius * 0.2),
            new THREE.Vector3(radius * 0.6, 0, 0),
          ]}
          color={color}
          lineWidth={3}
        />
        <mesh position={[radius * 0.6, 0, 0]}>
          <coneGeometry args={[0.1, 0.2, 32]} rotation={[0, Math.PI/2, 0]} />
          <meshBasicMaterial color={color} />
        </mesh>
      </group>
      
      {/* Loop name with clear styling */}
      {label && (
        <Text
          position={[0, -0.6, 0]}
          fontSize={0.35}
          color="#000000"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.02}
          outlineColor="#ffffff"
        >
          {label}
        </Text>
      )}
    </group>
  );
};

// Background environment
const Environment = () => {
  return (
    <>
      {/* Subtle background particles */}
      <Sparkles 
        count={200}
        scale={10}
        size={1}
        speed={0.2}
        opacity={0.1}
        noise={[0.01, 0.01, 0.01]}
      />
      
      {/* Ambient gradient background */}
      <mesh position={[0, 0, -10]}>
        <planeGeometry args={[50, 50]} />
        <meshBasicMaterial color="#f0f6ff" />
      </mesh>
    </>
  );
};

// The main causal loop diagram component with smoother animations
const CausalLoopDiagram = () => {
  // Define the nodes (variables) in the diagram
  const nodes = [
    { id: 'demand', label: 'Customer Demand\nfor Speed', position: new THREE.Vector3(-3, 0, -2) },
    { id: 'darkstores', label: 'Dark Store\nNetwork', position: new THREE.Vector3(0, 0, -3) },
    { id: 'service', label: 'Service Speed\n& Availability', position: new THREE.Vector3(3, 0, -2) },
    { id: 'adoption', label: 'Customer\nAdoption', position: new THREE.Vector3(3, 0, 1) },
    { id: 'revenue', label: 'Platform Revenue\n& Investment', position: new THREE.Vector3(0, 0, 2) },
    { id: 'pressure', label: 'Delivery Rider\nPressure', position: new THREE.Vector3(-3, 0, 1) },
    { id: 'impact', label: 'Environmental\nImpact', position: new THREE.Vector3(-1.5, 0, 3.5) },
    { id: 'regulation', label: 'Regulatory\nPressure', position: new THREE.Vector3(1.5, 0, 3.5) },
  ];
  
  // Define the connections between nodes
  const connections = [
    { from: 'demand', to: 'darkstores', positive: true, curved: true },
    { from: 'darkstores', to: 'service', positive: true, curved: false },
    { from: 'service', to: 'adoption', positive: true, curved: false },
    { from: 'adoption', to: 'revenue', positive: true, curved: false },
    { from: 'revenue', to: 'darkstores', positive: true, curved: true },
    { from: 'service', to: 'pressure', positive: true, curved: true },
    { from: 'pressure', to: 'impact', positive: true, curved: true },
    { from: 'impact', to: 'regulation', positive: true, curved: false },
    { from: 'regulation', to: 'darkstores', positive: false, curved: true },
    { from: 'adoption', to: 'demand', positive: true, curved: true },
  ];
  
  // Define feedback loops
  const loops = [
    { position: new THREE.Vector3(0, 0, 0), radius: 1, type: "R", label: "Growth Engine", clockwise: true },
    { position: new THREE.Vector3(2, 0, -0.5), radius: 0.8, type: "R", label: "Expectation Inflation", clockwise: true },
    { position: new THREE.Vector3(-1, 0, 2.5), radius: 0.8, type: "B", label: "Environmental Strain", clockwise: false },
  ];

  // Animation state for staggered appearance
  const [visibleNodes, setVisibleNodes] = useState([]);
  const [visibleConnections, setVisibleConnections] = useState([]);
  const [visibleLoops, setVisibleLoops] = useState([]);
  
  useEffect(() => {
    // Staggered appearance for elements
    const nodeTimer = setTimeout(() => {
      const intervalId = setInterval(() => {
        setVisibleNodes(prev => {
          if (prev.length < nodes.length) {
            return [...prev, nodes[prev.length].id];
          }
          clearInterval(intervalId);
          return prev;
        });
      }, 150);
      
      return () => clearInterval(intervalId);
    }, 500);
    
    // Start connections after nodes start appearing
    const connectionTimer = setTimeout(() => {
      const intervalId = setInterval(() => {
        setVisibleConnections(prev => {
          if (prev.length < connections.length) {
            return [...prev, prev.length];
          }
          clearInterval(intervalId);
          return prev;
        });
      }, 200);
      
      return () => clearInterval(intervalId);
    }, 1000);
    
    // Start loops after connections
    const loopTimer = setTimeout(() => {
      const intervalId = setInterval(() => {
        setVisibleLoops(prev => {
          if (prev.length < loops.length) {
            return [...prev, prev.length];
          }
          clearInterval(intervalId);
          return prev;
        });
      }, 300);
      
      return () => clearInterval(intervalId);
    }, 3000);
    
    return () => {
      clearTimeout(nodeTimer);
      clearTimeout(connectionTimer);
      clearTimeout(loopTimer);
    };
  }, []);

  return (
    <group>
      <Environment />
      
      {/* Render visible nodes with smoother transitions */}
      {nodes.map((node, index) => (
        visibleNodes.includes(node.id) && (
          <Node
            key={node.id}
            position={node.position}
            label={node.label}
          />
        )
      ))}
      
      {/* Render visible connections */}
      {connections.map((conn, index) => {
        if (!visibleConnections.includes(index)) return null;
        
        const startNode = nodes.find(n => n.id === conn.from);
        const endNode = nodes.find(n => n.id === conn.to);
        
        return (
          <Arrow
            key={index}
            start={startNode.position}
            end={endNode.position}
            curved={conn.curved}
            positive={conn.positive}
            pulseSpeed={0.5 + index * 0.1} // Slightly different speeds for visual interest
          />
        );
      })}
      
      {/* Render visible feedback loop indicators */}
      {loops.map((loop, index) => (
        visibleLoops.includes(index) && (
          <LoopIndicator
            key={index}
            position={loop.position}
            radius={loop.radius}
            type={loop.type}
            label={loop.label}
            clockwise={loop.clockwise}
          />
        )
      ))}
    </group>
  );
};

// Main component with performance optimizations
const CausalLoopAnimation = () => {
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
  
  // Smooth appearance
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      ref={canvasRef}
      className={`w-full h-[600px] bg-gray-50 rounded-lg overflow-hidden transition-all duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`}
    >
      {isVisible && (
        <Canvas
          camera={{ position: [0, 6, 0], fov: 50 }}
          dpr={[1, 2]} // Optimize for different pixel ratios
          performance={{ min: 0.5 }}
          gl={{ 
            antialias: true,
            powerPreference: "high-performance"
          }}
        >
          <ambientLight intensity={0.8} />
          <directionalLight position={[5, 10, 5]} intensity={1} />
          <CausalLoopDiagram />
          <OrbitControls 
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={5}
            maxDistance={15}
            enableDamping={true}
            dampingFactor={0.07}
            autoRotate={!isVisible}
            autoRotateSpeed={0.5}
          />
        </Canvas>
      )}
    </div>
  );
};

export default CausalLoopAnimation;
