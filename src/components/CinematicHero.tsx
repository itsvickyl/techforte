import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import {
    EffectComposer,
    Bloom,
    Vignette,
    ChromaticAberration,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { motion } from "framer-motion";
import Particles from "./Particles";



// ═══════════════════════════════════════════════════════════
//  NEBULA GLOW — soft atmospheric shader plane
// ═══════════════════════════════════════════════════════════

function NebulaGlow() {
    const material = useMemo(() => {
        return new THREE.ShaderMaterial({
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
            uniforms: {
                uTime: { value: 0 },
            },
            vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
            fragmentShader: `
        uniform float uTime;
        varying vec2 vUv;

        float hash(vec2 p) {
          return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
        }
        float noise(vec2 p) {
          vec2 i = floor(p);
          vec2 f = fract(p);
          f = f * f * (3.0 - 2.0 * f);
          return mix(
            mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
            mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
            f.y
          );
        }
        float fbm(vec2 p) {
          float v = 0.0, a = 0.5;
          for (int i = 0; i < 4; i++) {
            v += a * noise(p);
            p *= 2.0;
            a *= 0.5;
          }
          return v;
        }

        void main() {
          vec2 uv = vUv - 0.5;
          float dist = length(uv);

          // Nebula shape
          float n = fbm(uv * 2.5 + uTime * 0.04);
          float n2 = fbm(uv * 3.0 - uTime * 0.03 + 5.0);

          // Fade from center
          float mask = smoothstep(0.5, 0.05, dist);

          // Cyan + purple blend
          vec3 cyan = vec3(0.0, 0.6, 0.9);
          vec3 purple = vec3(0.35, 0.15, 0.7);
          vec3 col = mix(cyan, purple, n2);

          float alpha = mask * n * 0.08;
          gl_FragColor = vec4(col, alpha);
        }
      `,
        });
    }, []);

    useFrame(({ clock }) => {
        material.uniforms.uTime.value = clock.getElapsedTime();
    });

    return (
        <mesh position={[0, 0, -8]} material={material}>
            <planeGeometry args={[30, 30]} />
        </mesh>
    );
}

// ═══════════════════════════════════════════════════════════
//  HOLOGRAPHIC GLOBE — glass sphere + grid + orbital ring
// ═══════════════════════════════════════════════════════════

function createLatitudeLines(radius: number, count: number): THREE.BufferGeometry {
    const geometries: THREE.BufferGeometry[] = [];
    const segments = 96;

    for (let i = 0; i <= count; i++) {
        const phi = (i / count) * Math.PI;
        const y = radius * Math.cos(phi);
        const r = radius * Math.sin(phi);

        const points: THREE.Vector3[] = [];
        for (let j = 0; j <= segments; j++) {
            const theta = (j / segments) * Math.PI * 2;
            points.push(new THREE.Vector3(
                r * Math.cos(theta),
                y,
                r * Math.sin(theta)
            ));
        }

        const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
        geometries.push(lineGeo);
    }

    // Merge all latitude lines
    return mergeLineGeometries(geometries);
}

function createLongitudeLines(radius: number, count: number): THREE.BufferGeometry {
    const geometries: THREE.BufferGeometry[] = [];
    const segments = 96;

    for (let i = 0; i < count; i++) {
        const theta = (i / count) * Math.PI * 2;
        const points: THREE.Vector3[] = [];

        for (let j = 0; j <= segments; j++) {
            const phi = (j / segments) * Math.PI;
            points.push(new THREE.Vector3(
                radius * Math.sin(phi) * Math.cos(theta),
                radius * Math.cos(phi),
                radius * Math.sin(phi) * Math.sin(theta)
            ));
        }

        const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
        geometries.push(lineGeo);
    }

    return mergeLineGeometries(geometries);
}

function mergeLineGeometries(geometries: THREE.BufferGeometry[]): THREE.BufferGeometry {
    const merged = new THREE.BufferGeometry();
    const positions: number[] = [];

    for (const geo of geometries) {
        const pos = geo.attributes.position.array;
        for (let i = 0; i < pos.length; i++) {
            positions.push(pos[i]);
        }
    }

    merged.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    return merged;
}

function HolographicGlobe() {
    const groupRef = useRef<THREE.Group>(null);
    const ringRef = useRef<THREE.Mesh>(null);
    const mouseTarget = useRef({ x: 0, y: 0 });
    const mouseSmooth = useRef({ x: 0, y: 0 });
    const floatOffset = useRef(0);

    // Globe grid geometries
    const { latGeo, lonGeo } = useMemo(() => ({
        latGeo: createLatitudeLines(2.0, 12),
        lonGeo: createLongitudeLines(2.0, 18),
    }), []);

    // Orbital ring geometry
    const ringGeo = useMemo(() => {
        return new THREE.TorusGeometry(2.8, 0.015, 16, 128);
    }, []);

    // Grid line material — cyan glow
    const gridMaterial = useMemo(() => {
        return new THREE.LineBasicMaterial({
            color: new THREE.Color(0.0, 0.7, 1.0),
            transparent: true,
            opacity: 0.25,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
        });
    }, []);

    // Ring material — glowing
    const ringMaterial = useMemo(() => {
        return new THREE.MeshBasicMaterial({
            color: new THREE.Color(0.2, 0.5, 1.0),
            transparent: true,
            opacity: 0.5,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            side: THREE.DoubleSide,
        });
    }, []);

    // Second ring — purple accent
    const ring2Material = useMemo(() => {
        return new THREE.MeshBasicMaterial({
            color: new THREE.Color(0.5, 0.2, 0.9),
            transparent: true,
            opacity: 0.3,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            side: THREE.DoubleSide,
        });
    }, []);

    useEffect(() => {
        const handler = (e: PointerEvent) => {
            mouseTarget.current.x = ((e.clientX / window.innerWidth) * 2 - 1) * 0.3;
            mouseTarget.current.y = (-(e.clientY / window.innerHeight) * 2 + 1) * 0.3;
        };
        window.addEventListener("pointermove", handler);
        return () => window.removeEventListener("pointermove", handler);
    }, []);

    useFrame(({ clock }) => {
        const time = clock.getElapsedTime();

        // Smooth mouse follow
        mouseSmooth.current.x += (mouseTarget.current.x - mouseSmooth.current.x) * 0.03;
        mouseSmooth.current.y += (mouseTarget.current.y - mouseSmooth.current.y) * 0.03;

        // Floating motion
        floatOffset.current = Math.sin(time * 0.6) * 0.12;

        if (groupRef.current) {
            // Slow rotation
            groupRef.current.rotation.y = time * 0.15;

            // Mouse tilt
            groupRef.current.rotation.x = mouseSmooth.current.y * 0.4;
            groupRef.current.rotation.z = mouseSmooth.current.x * -0.15;

            // Float
            groupRef.current.position.y = floatOffset.current;
        }

        // Ring rotation
        if (ringRef.current) {
            ringRef.current.rotation.z = time * 0.08;
        }
    });

    return (
        <group ref={groupRef}>
            {/* Glass sphere */}
            <mesh>
                <sphereGeometry args={[2.0, 64, 64]} />
                <meshPhysicalMaterial
                    color="#0a1628"
                    metalness={0.1}
                    roughness={0.05}
                    transmission={0.92}
                    thickness={1.5}
                    ior={1.5}
                    envMapIntensity={0.5}
                    clearcoat={1}
                    clearcoatRoughness={0.1}
                    transparent
                    opacity={0.3}
                    side={THREE.FrontSide}
                    depthWrite={false}
                />
            </mesh>

            {/* Inner glow sphere */}
            <mesh>
                <sphereGeometry args={[1.95, 32, 32]} />
                <meshBasicMaterial
                    color={new THREE.Color(0.0, 0.15, 0.3)}
                    transparent
                    opacity={0.08}
                    blending={THREE.AdditiveBlending}
                    depthWrite={false}
                    side={THREE.BackSide}
                />
            </mesh>

            {/* Latitude grid lines */}
            <lineSegments geometry={latGeo} material={gridMaterial} />

            {/* Longitude grid lines */}
            <lineSegments geometry={lonGeo} material={gridMaterial} />

            {/* Brighter equator line */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[2.0, 0.008, 8, 128]} />
                <meshBasicMaterial
                    color={new THREE.Color(0.0, 0.9, 1.0)}
                    transparent
                    opacity={0.6}
                    blending={THREE.AdditiveBlending}
                    depthWrite={false}
                />
            </mesh>

            {/* Orbital ring 1 — tech style, tilted */}
            <mesh ref={ringRef} rotation={[Math.PI * 0.35, 0.2, 0]} geometry={ringGeo} material={ringMaterial} />

            {/* Orbital ring 2 — purple accent */}
            <mesh rotation={[Math.PI * 0.55, -0.3, 0.4]}>
                <torusGeometry args={[3.2, 0.01, 16, 128]} />
                <primitive object={ring2Material} attach="material" />
            </mesh>

            {/* Core glow point */}
            <mesh>
                <sphereGeometry args={[0.15, 16, 16]} />
                <meshBasicMaterial
                    color={new THREE.Color(0.0, 0.8, 1.0)}
                    transparent
                    opacity={0.6}
                    blending={THREE.AdditiveBlending}
                />
            </mesh>

            {/* Outer glow halo */}
            <mesh>
                <sphereGeometry args={[2.5, 32, 32]} />
                <meshBasicMaterial
                    color={new THREE.Color(0.0, 0.3, 0.6)}
                    transparent
                    opacity={0.03}
                    blending={THREE.AdditiveBlending}
                    depthWrite={false}
                    side={THREE.BackSide}
                />
            </mesh>
        </group>
    );
}

// ═══════════════════════════════════════════════════════════
//  CAMERA CONTROLLER — dolly-in + subtle motion
// ═══════════════════════════════════════════════════════════

function CameraController() {
    const { camera } = useThree();
    const startTime = useRef(0);

    useEffect(() => {
        camera.position.set(0, 0.3, 8);
        startTime.current = performance.now();
    }, [camera]);

    useFrame(() => {
        const elapsed = (performance.now() - startTime.current) / 1000;
        // Dolly in from 8 to 6 over 3 seconds
        const targetZ = 8 - Math.min(elapsed / 3, 1) * 2;
        camera.position.z += (targetZ - camera.position.z) * 0.03;
    });

    return null;
}

// ═══════════════════════════════════════════════════════════
//  POSTPROCESSING — Bloom + Vignette + ChromaticAberration
// ═══════════════════════════════════════════════════════════

function PostEffects() {
    return (
        <EffectComposer>
            <Bloom
                intensity={0.6}
                luminanceThreshold={0.15}
                luminanceSmoothing={0.9}
                mipmapBlur
            />
            <Vignette
                offset={0.3}
                darkness={0.6}
                blendFunction={BlendFunction.NORMAL}
            />
            <ChromaticAberration
                offset={new THREE.Vector2(0.0005, 0.0005)}
                blendFunction={BlendFunction.NORMAL}
                radialModulation={false}
                modulationOffset={0.5}
            />
        </EffectComposer>
    );
}

// ═══════════════════════════════════════════════════════════
//  COUNTDOWN TIMER
// ═══════════════════════════════════════════════════════════

const EVENT_DATE = new Date("2026-03-16T09:00:00+05:30").getTime();

function useCountdown() {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    useEffect(() => {
        const tick = () => {
            const diff = Math.max(0, EVENT_DATE - Date.now());
            setTimeLeft({
                days: Math.floor(diff / (1000 * 60 * 60 * 24)),
                hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((diff / (1000 * 60)) % 60),
                seconds: Math.floor((diff / 1000) % 60),
            });
        };
        tick();
        const id = setInterval(tick, 1000);
        return () => clearInterval(id);
    }, []);
    return timeLeft;
}

function CountdownUnit({ value, label, delay }: { value: number; label: string; delay: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay }}
            className="flex flex-col items-center"
        >
            <div className="cinematic-timer-unit">
                <span className="cinematic-timer-value">
                    {String(value).padStart(2, "0")}
                </span>
            </div>
            <span className="cinematic-timer-label">{label}</span>
        </motion.div>
    );
}

// ═══════════════════════════════════════════════════════════
//  HERO OVERLAY — Typography + Timer + Glass Button
// ═══════════════════════════════════════════════════════════

function HeroOverlay() {
    const { days, hours, minutes, seconds } = useCountdown();

    return (
        <div className="absolute inset-0 z-20 flex flex-col justify-center items-center pointer-events-none select-none">
            {/* Date badge */}
            <motion.p
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.5 }}
                className="cinematic-date"
            >
                MARCH 16 – 17, 2026
            </motion.p>

            {/* Main Title */}
            <motion.h1
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 1.2, delay: 2.0, ease: "easeOut" }}
                className="cinematic-title"
            >
                TECHFORTE
            </motion.h1>

            {/* Subtitle */}
            <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 2.8 }}
                className="cinematic-subtitle"
            >
                Inter Collegiate IT Fest
            </motion.p>

            {/* Countdown Timer */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 3.2 }}
                className="flex items-center gap-3 sm:gap-4 md:gap-6 mt-8"
            >
                <CountdownUnit value={days} label="Days" delay={3.3} />
                <span className="cinematic-timer-sep">:</span>
                <CountdownUnit value={hours} label="Hours" delay={3.4} />
                <span className="cinematic-timer-sep">:</span>
                <CountdownUnit value={minutes} label="Minutes" delay={3.5} />
                <span className="cinematic-timer-sep">:</span>
                <CountdownUnit value={seconds} label="Seconds" delay={3.6} />
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 4.0 }}
                className="pointer-events-auto mt-8 flex flex-col sm:flex-row items-center gap-4"
            >
                <button className="btn-primary px-10 py-3">REGISTER</button>
                <button className="cinematic-glass-btn">Explore Events</button>
            </motion.div>
        </div>
    );
}

// ═══════════════════════════════════════════════════════════
//  MAIN EXPORT
// ═══════════════════════════════════════════════════════════

export const CinematicHero = () => {
    return (
        <section className="cinematic-hero-section">
            {/* OGL ambient particles — layered above background, below 3D canvas */}
            <div className="absolute inset-0 z-[2] pointer-events-none">
                <Particles
                    particleCount={800}
                    particleSpread={15}
                    speed={0.1}
                    particleColors={['#00FFFF', '#0891b2', '#06b6d4', '#164e63', '#ffffff']}
                    moveParticlesOnHover={true}
                    particleHoverFactor={0.6}
                    alphaParticles={true}
                    particleBaseSize={150}
                    sizeRandomness={1.8}
                    cameraDistance={20}
                    disableRotation={false}
                    pixelRatio={Math.min(window.devicePixelRatio, 2)}
                    className=""
                />
            </div>

            {/* 3D Canvas — globe + nebula + postprocessing */}
            <div className="absolute inset-0 z-10 pointer-events-none">
                <Canvas
                    camera={{ position: [0, 0.3, 8], fov: 55 }}
                    gl={{
                        alpha: true,
                        antialias: true,
                        toneMapping: THREE.ACESFilmicToneMapping,
                        toneMappingExposure: 1.0,
                    }}
                    style={{ background: "transparent" }}
                    dpr={[1, 2]}
                >
                    {/* Lighting */}
                    <ambientLight intensity={0.08} />
                    <pointLight position={[5, 3, 5]} intensity={0.4} color="#4488ff" distance={20} />
                    <pointLight position={[-4, -2, 3]} intensity={0.2} color="#8844ff" distance={15} />
                    <pointLight position={[0, 5, -3]} intensity={0.15} color="#00ccff" distance={12} />

                    {/* Nebula glow */}
                    <NebulaGlow />

                    {/* Globe */}
                    <HolographicGlobe />

                    {/* Camera */}
                    <CameraController />

                    {/* Post — no EffectComposer to preserve canvas alpha */}
                </Canvas>
            </div>

            {/* HTML overlay */}
            <HeroOverlay />

            {/* Bottom gradient fade */}
            <div className="cinematic-bottom-fade" />
        </section>
    );
};
