import { useRef, useMemo, useCallback } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useScrollDisperse } from "../hooks/useScrollDisperse";

// Generate points on a sphere surface
function spherePoints(count: number, radius: number) {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const r = radius * (0.8 + Math.random() * 0.2);
        positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = r * Math.cos(phi);
    }
    return positions;
}

// Generate points on a ring/torus
function ringPoints(count: number, majorRadius: number, minorRadius: number, tilt: number) {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI * 2;
        const x = (majorRadius + minorRadius * Math.cos(phi)) * Math.cos(theta);
        const y = (majorRadius + minorRadius * Math.cos(phi)) * Math.sin(theta);
        const z = minorRadius * Math.sin(phi);
        const cosT = Math.cos(tilt);
        const sinT = Math.sin(tilt);
        positions[i * 3] = x;
        positions[i * 3 + 1] = y * cosT - z * sinT;
        positions[i * 3 + 2] = y * sinT + z * cosT;
    }
    return positions;
}

// Generate random scatter targets
function generateScatterTargets(count: number, radius: number) {
    const targets = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const r = radius * (2 + Math.random() * 4);
        targets[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        targets[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        targets[i * 3 + 2] = r * Math.cos(phi);
    }
    return targets;
}

function ParticleRocket({ disperseFactor }: { disperseFactor: number }) {
    const groupRef = useRef<THREE.Group>(null);
    const sphereRef = useRef<THREE.Points>(null);
    const ring1Ref = useRef<THREE.Points>(null);
    const ring2Ref = useRef<THREE.Points>(null);
    const starsRef = useRef<THREE.Points>(null);
    const mouseTarget = useRef({ x: 0, y: 0 });
    const mouseSmooth = useRef({ x: 0, y: 0 });
    const disperseSmooth = useRef(0);

    const SPHERE_COUNT = 8000;
    const RING1_COUNT = 5000;
    const RING2_COUNT = 4000;
    const STARS_COUNT = 2000;

    // Sphere
    const { sphereGeo, sphereOriginal, sphereScatter } = useMemo(() => {
        const geo = new THREE.BufferGeometry();
        const original = spherePoints(SPHERE_COUNT, 1.8);
        geo.setAttribute("position", new THREE.BufferAttribute(original.slice(), 3));
        const colors = new Float32Array(SPHERE_COUNT * 3);
        for (let i = 0; i < SPHERE_COUNT; i++) {
            if (Math.random() > 0.4) {
                colors[i * 3] = 0; colors[i * 3 + 1] = 0.9 + Math.random() * 0.1; colors[i * 3 + 2] = 0.9 + Math.random() * 0.1;
            } else {
                colors[i * 3] = 1; colors[i * 3 + 1] = 0.6 + Math.random() * 0.3; colors[i * 3 + 2] = 0;
            }
        }
        geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
        return { sphereGeo: geo, sphereOriginal: original, sphereScatter: generateScatterTargets(SPHERE_COUNT, 3) };
    }, []);

    // Ring 1
    const { ring1Geo, ring1Original, ring1Scatter } = useMemo(() => {
        const geo = new THREE.BufferGeometry();
        const original = ringPoints(RING1_COUNT, 3.2, 0.15, Math.PI * 0.35);
        geo.setAttribute("position", new THREE.BufferAttribute(original.slice(), 3));
        const colors = new Float32Array(RING1_COUNT * 3);
        for (let i = 0; i < RING1_COUNT; i++) {
            if (Math.random() > 0.5) {
                colors[i * 3] = 1; colors[i * 3 + 1] = 0.7 + Math.random() * 0.2; colors[i * 3 + 2] = 0;
            } else {
                colors[i * 3] = 0; colors[i * 3 + 1] = 0.9 + Math.random() * 0.1; colors[i * 3 + 2] = 0.9 + Math.random() * 0.1;
            }
        }
        geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
        return { ring1Geo: geo, ring1Original: original, ring1Scatter: generateScatterTargets(RING1_COUNT, 4) };
    }, []);

    // Ring 2
    const { ring2Geo, ring2Original, ring2Scatter } = useMemo(() => {
        const geo = new THREE.BufferGeometry();
        const original = ringPoints(RING2_COUNT, 3.8, 0.1, -Math.PI * 0.25);
        geo.setAttribute("position", new THREE.BufferAttribute(original.slice(), 3));
        const colors = new Float32Array(RING2_COUNT * 3);
        for (let i = 0; i < RING2_COUNT; i++) {
            if (Math.random() > 0.3) {
                colors[i * 3] = 0; colors[i * 3 + 1] = 1; colors[i * 3 + 2] = 1;
            } else {
                colors[i * 3] = 1; colors[i * 3 + 1] = 0.8; colors[i * 3 + 2] = 0.1;
            }
        }
        geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
        return { ring2Geo: geo, ring2Original: original, ring2Scatter: generateScatterTargets(RING2_COUNT, 5) };
    }, []);

    // Stars
    const starsGeometry = useMemo(() => {
        const geo = new THREE.BufferGeometry();
        const positions = new Float32Array(STARS_COUNT * 3);
        const colors = new Float32Array(STARS_COUNT * 3);
        for (let i = 0; i < STARS_COUNT; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 30;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 30;
            const b = 0.3 + Math.random() * 0.7;
            colors[i * 3] = b; colors[i * 3 + 1] = b; colors[i * 3 + 2] = b;
        }
        geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
        return geo;
    }, []);

    const handlePointerMove = useCallback((e: { clientX: number; clientY: number }) => {
        mouseTarget.current.x = ((e.clientX / window.innerWidth) * 2 - 1) * 0.5;
        mouseTarget.current.y = (-(e.clientY / window.innerHeight) * 2 + 1) * 0.5;
    }, []);

    useMemo(() => {
        window.addEventListener("pointermove", handlePointerMove);
        return () => window.removeEventListener("pointermove", handlePointerMove);
    }, [handlePointerMove]);

    // Lerp positions between original and scatter
    const lerpPositions = (
        geo: THREE.BufferGeometry,
        original: Float32Array,
        scatter: Float32Array,
        factor: number
    ) => {
        const pos = geo.attributes.position.array as Float32Array;
        for (let i = 0; i < pos.length; i++) {
            pos[i] = original[i] + (scatter[i] - original[i]) * factor;
        }
        geo.attributes.position.needsUpdate = true;
    };

    useFrame(() => {
        // Smooth disperse
        disperseSmooth.current += (disperseFactor - disperseSmooth.current) * 0.05;
        const d = disperseSmooth.current;

        // Disperse particles
        lerpPositions(sphereGeo, sphereOriginal, sphereScatter, d);
        lerpPositions(ring1Geo, ring1Original, ring1Scatter, d);
        lerpPositions(ring2Geo, ring2Original, ring2Scatter, d);

        // Mouse
        mouseSmooth.current.x += (mouseTarget.current.x - mouseSmooth.current.x) * 0.05;
        mouseSmooth.current.y += (mouseTarget.current.y - mouseSmooth.current.y) * 0.05;

        if (groupRef.current) {
            groupRef.current.rotation.y = mouseSmooth.current.x * 0.8;
            groupRef.current.rotation.x = -mouseSmooth.current.y * 0.5;
        }
        if (sphereRef.current) {
            sphereRef.current.rotation.y += 0.002;
            sphereRef.current.rotation.x += 0.001;
        }
        if (ring1Ref.current) {
            ring1Ref.current.rotation.z += 0.003;
            ring1Ref.current.rotation.y += 0.001;
        }
        if (ring2Ref.current) {
            ring2Ref.current.rotation.z -= 0.002;
            ring2Ref.current.rotation.x += 0.001;
        }
        if (starsRef.current) {
            starsRef.current.rotation.y += 0.0002;
        }
    });

    const mat = useMemo(() => ({
        vertexColors: true, transparent: true, opacity: 0.9,
        blending: THREE.AdditiveBlending, depthWrite: false, sizeAttenuation: true,
    }), []);

    return (
        <>
            <points ref={starsRef} geometry={starsGeometry}>
                <pointsMaterial {...mat} size={0.03} opacity={0.6} />
            </points>
            <group ref={groupRef}>
                <points ref={sphereRef} geometry={sphereGeo}>
                    <pointsMaterial {...mat} size={0.02} />
                </points>
                <points ref={ring1Ref} geometry={ring1Geo}>
                    <pointsMaterial {...mat} size={0.015} />
                </points>
                <points ref={ring2Ref} geometry={ring2Geo}>
                    <pointsMaterial {...mat} size={0.015} />
                </points>
            </group>
        </>
    );
}

export const ParticleRocketScene = () => {
    const { containerRef, disperseFactor } = useScrollDisperse(0.4);

    return (
        <div ref={containerRef} className="absolute inset-0 z-0">
            <Canvas
                camera={{ position: [0, 0, 6], fov: 60 }}
                style={{ background: "transparent" }}
                gl={{ alpha: true, antialias: true }}
            >
                <ambientLight intensity={0.5} />
                <ParticleRocket disperseFactor={disperseFactor} />
            </Canvas>
        </div>
    );
};
