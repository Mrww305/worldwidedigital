"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { useEffect, useMemo, useRef } from "react";

/* Mutable pointer target shared with the camera rig (no re-renders). */
const pointer = { x: 0, y: 0 };

function gauss(scale: number): number {
  // Box–Muller
  const u = Math.max(Math.random(), 1e-6);
  const v = Math.random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v) * scale;
}

/* ------------------------------ Starfield ------------------------------ */

function Starfield({ count, reduced }: { count: number; reduced: boolean }) {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    // Reduce particle count for better performance
    const optimizedCount = Math.min(count, 800);
    const arr = new Float32Array(optimizedCount * 3);
    for (let i = 0; i < optimizedCount; i += 1) {
      arr[i * 3] = gauss(26);
      arr[i * 3 + 1] = gauss(16);
      arr[i * 3 + 2] = gauss(22) - 8;
    }
    return arr;
  }, [count]);

  useFrame((_, delta) => {
    if (!ref.current || reduced) return;
    ref.current.rotation.y += delta * 0.006;
    ref.current.rotation.x += delta * 0.0015;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.055}
        color={0xcfcfcf}
        transparent
        opacity={0.62}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* --------------------------- Neural constellation ---------------------- */

function NeuralConstellation({ reduced }: { reduced: boolean }) {
  const group = useRef<THREE.Group>(null);

  const { nodePositions, edgePositions } = useMemo(() => {
    // Reduce node count for better performance
    const nodeCount = 100;
    const nodes: [number, number, number][] = [];
    for (let i = 0; i < nodeCount; i += 1) {
      nodes.push([gauss(7.5), gauss(4.2), gauss(5.5) - 2]);
    }
    const edges: number[] = [];
    const MAX_DIST = 2.55;
    let budget = 160;
    for (let i = 0; i < nodeCount && budget > 0; i += 1) {
      let links = 0;
      for (let j = i + 1; j < nodeCount && links < 3 && budget > 0; j += 1) {
        const dx = nodes[i][0] - nodes[j][0];
        const dy = nodes[i][1] - nodes[j][1];
        const dz = nodes[i][2] - nodes[j][2];
        const d = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (d < MAX_DIST) {
          edges.push(...nodes[i], ...nodes[j]);
          links += 1;
          budget -= 1;
        }
      }
    }
    const np = new Float32Array(nodeCount * 3);
    nodes.forEach((n, i) => {
      np[i * 3] = n[0];
      np[i * 3 + 1] = n[1];
      np[i * 3 + 2] = n[2];
    });
    return { nodePositions: np, edgePositions: new Float32Array(edges) };
  }, []);

  useFrame((state, delta) => {
    if (!group.current) return;
    if (!reduced) {
      group.current.rotation.y -= delta * 0.018;
    }
    // Mouse-driven drift: normalized screen coords steer the network.
    const targetX = pointer.y * 0.16;
    const targetY = -pointer.x * 0.22;
    group.current.rotation.x = THREE.MathUtils.damp(
      group.current.rotation.x,
      targetX,
      2.2,
      delta
    );
    group.current.rotation.y = THREE.MathUtils.damp(
      group.current.rotation.y,
      group.current.rotation.y + targetY * delta * 0.6,
      1,
      delta
    );
    const mat = (group.current.children[0] as THREE.Points)
      ?.material as THREE.PointsMaterial | undefined;
    if (mat) {
      mat.opacity = 0.75 + Math.sin(state.clock.elapsedTime * 1.4) * 0.2;
    }
  });

  return (
    <group ref={group}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[nodePositions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.1}
          color={0xa8dceb}
          transparent
          opacity={0.85}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[edgePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial
          color={0x8fd0e0}
          transparent
          opacity={0.09}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}

/* ------------------------------- Core wire ----------------------------- */

function CoreWire({ reduced }: { reduced: boolean }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!ref.current || reduced) return;
    ref.current.rotation.y += delta * 0.05;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.25) * 0.12;
  });

  return (
    <Float speed={reduced ? 0 : 1.1} rotationIntensity={reduced ? 0 : 0.25} floatIntensity={reduced ? 0 : 0.6}>
      <group position={[4.6, 0.6, -4]}>
        <mesh ref={ref}>
          <icosahedronGeometry args={[3.1, 1]} />
          <meshBasicMaterial color={0xe8e8e8} wireframe transparent opacity={0.075} />
        </mesh>
        <mesh>
          <octahedronGeometry args={[1.05, 0]} />
          <meshBasicMaterial color={0x8fd0e0} wireframe transparent opacity={0.22} />
        </mesh>
      </group>
    </Float>
  );
}

/* ------------------------------ Camera rig ----------------------------- */

function Rig({ reduced }: { reduced: boolean }) {
  useFrame((state, delta) => {
    if (reduced) return;
    const cam = state.camera;
    cam.position.x = THREE.MathUtils.damp(cam.position.x, pointer.x * 1.35, 2.4, delta);
    cam.position.y = THREE.MathUtils.damp(cam.position.y, -pointer.y * 0.85, 2.4, delta);
    cam.lookAt(0, 0, 0);
  });
  return null;
}

/* ------------------------------ The Canvas ----------------------------- */

export default function WebGLBackground() {
  const reduced = useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <Canvas
      style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}
      camera={{ position: [0, 0, 14], fov: 50 }}
      dpr={[1, 1.5]}
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      frameloop={reduced ? "demand" : "always"}
      onCreated={({ invalidate }) => {
        if (reduced) invalidate();
      }}
    >
      <Starfield count={800} reduced={reduced} />
      <NeuralConstellation reduced={reduced} />
      <CoreWire reduced={reduced} />
      <Rig reduced={reduced} />
    </Canvas>
  );
}
