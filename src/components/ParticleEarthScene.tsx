import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useScrollDisperse } from "../hooks/useScrollDisperse";

function generateEarthPoints() {
    const positions: number[] = [];
    const colors: number[] = [];
    const surfaceCount = 12000;

    for (let i = 0; i < surfaceCount; i++) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const r = 2.5 + (Math.random() - 0.5) * 0.08;
        const x = r * Math.sin(phi) * Math.cos(theta);
        const y = r * Math.sin(phi) * Math.sin(theta);
        const z = r * Math.cos(phi);
        positions.push(x, y, z);

        const lat = Math.asin(z / r);
        const lng = Math.atan2(y, x);
        const landNoise =
            Math.sin(lat * 3 + 0.5) * Math.cos(lng * 2) +
            Math.sin(lat * 5) * Math.sin(lng * 3 + 1) * 0.5 +
            Math.cos(lat * 7 + 2) * Math.sin(lng * 5 - 1) * 0.3;

        if (landNoise > 0.2) {
            colors.push(0, 0.85 + Math.random() * 0.15, 0.85 + Math.random() * 0.15);
        } else if (landNoise > -0.1) {
            colors.push(0.7 + Math.random() * 0.3, 0.9 + Math.random() * 0.1, 0.9 + Math.random() * 0.1);
        } else {
            if (Math.random() > 0.6) {
                colors.push(0, 0.3 + Math.random() * 0.2, 0.4 + Math.random() * 0.2);
            } else {
                colors.push(0, 0.1, 0.15);
            }
        }
    }

    // Latitude lines
    for (let lat = -80; lat <= 80; lat += 20) {
        const phi = ((90 - lat) * Math.PI) / 180;
        const ringR = 2.52 * Math.sin(phi);
        const ringY = 2.52 * Math.cos(phi);
        for (let i = 0; i < 200; i++) {
            const theta = (i / 200) * Math.PI * 2;
            positions.push(ringR * Math.cos(theta), ringY, ringR * Math.sin(theta));
            colors.push(0, 0.5, 0.5);
        }
    }

    // Longitude lines
    for (let lng = 0; lng < 360; lng += 30) {
        const theta = (lng * Math.PI) / 180;
        for (let i = 0; i < 200; i++) {
            const phi = (i / 200) * Math.PI;
            const r = 2.52;
            positions.push(r * Math.sin(phi) * Math.cos(theta), r * Math.cos(phi), r * Math.sin(phi) * Math.sin(theta));
            colors.push(0, 0.4, 0.45);
        }
    }

    return {
        positions: new Float32Array(positions),
        colors: new Float32Array(colors),
        count: positions.length / 3,
    };
}

function generateAtmosphere() {
    const positions: number[] = [];
    const colors: number[] = [];
    for (let i = 0; i < 3000; i++) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const r = 2.6 + Math.random() * 0.4;
        positions.push(r * Math.sin(phi) * Math.cos(theta), r * Math.sin(phi) * Math.sin(theta), r * Math.cos(phi));
        const alpha = Math.random();
        colors.push(0, 0.8 * alpha, 0.9 * alpha);
    }
    return { positions: new Float32Array(positions), colors: new Float32Array(colors) };
}

function generateScatterTargets(count: number, radius: number) {
    const t = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const r = radius * (2 + Math.random() * 4);
        t[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        t[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        t[i * 3 + 2] = r * Math.cos(phi);
    }
    return t;
}

function ParticleEarth({ disperseFactor }: { disperseFactor: number }) {
    const earthRef = useRef<THREE.Points>(null);
    const atmosphereRef = useRef<THREE.Points>(null);
    const mouseTarget = useRef({ x: 0, y: 0 });
    const mouseSmooth = useRef({ x: 0, y: 0 });
    const disperseSmooth = useRef(0);

    const { earthGeo, earthOriginal, earthScatter } = useMemo(() => {
        const data = generateEarthPoints();
        const geo = new THREE.BufferGeometry();
        geo.setAttribute("position", new THREE.BufferAttribute(data.positions.slice(), 3));
        geo.setAttribute("color", new THREE.BufferAttribute(data.colors, 3));
        return {
            earthGeo: geo,
            earthOriginal: data.positions,
            earthScatter: generateScatterTargets(data.count, 4),
        };
    }, []);

    const { atmoGeo, atmoOriginal, atmoScatter } = useMemo(() => {
        const data = generateAtmosphere();
        const count = data.positions.length / 3;
        const geo = new THREE.BufferGeometry();
        geo.setAttribute("position", new THREE.BufferAttribute(data.positions.slice(), 3));
        geo.setAttribute("color", new THREE.BufferAttribute(data.colors, 3));
        return {
            atmoGeo: geo,
            atmoOriginal: data.positions,
            atmoScatter: generateScatterTargets(count, 5),
        };
    }, []);

    useMemo(() => {
        const handler = (e: PointerEvent) => {
            mouseTarget.current.x = ((e.clientX / window.innerWidth) * 2 - 1) * 0.8;
            mouseTarget.current.y = (-(e.clientY / window.innerHeight) * 2 + 1) * 0.8;
        };
        window.addEventListener("pointermove", handler);
        return () => window.removeEventListener("pointermove", handler);
    }, []);

    const lerpPositions = (geo: THREE.BufferGeometry, orig: Float32Array, scatter: Float32Array, f: number) => {
        const pos = geo.attributes.position.array as Float32Array;
        for (let i = 0; i < pos.length; i++) {
            pos[i] = orig[i] + (scatter[i] - orig[i]) * f;
        }
        geo.attributes.position.needsUpdate = true;
    };

    useFrame(() => {
        disperseSmooth.current += (disperseFactor - disperseSmooth.current) * 0.05;
        const d = disperseSmooth.current;

        lerpPositions(earthGeo, earthOriginal, earthScatter, d);
        lerpPositions(atmoGeo, atmoOriginal, atmoScatter, d);

        mouseSmooth.current.x += (mouseTarget.current.x - mouseSmooth.current.x) * 0.06;
        mouseSmooth.current.y += (mouseTarget.current.y - mouseSmooth.current.y) * 0.06;

        if (earthRef.current) {
            earthRef.current.rotation.y += 0.003;
            earthRef.current.rotation.x = 0.3 + mouseSmooth.current.y * 1.2;
            earthRef.current.rotation.z = mouseSmooth.current.x * 0.8;
        }
        if (atmosphereRef.current) {
            atmosphereRef.current.rotation.y += 0.002;
            atmosphereRef.current.rotation.x = 0.3 + mouseSmooth.current.y * 1.0;
        }
    });

    return (
        <group position={[0, 0.5, 0]} scale={0.7}>
            <points ref={earthRef} geometry={earthGeo}>
                <pointsMaterial size={0.018} vertexColors transparent opacity={0.85} blending={THREE.AdditiveBlending} depthWrite={false} sizeAttenuation />
            </points>
            <points ref={atmosphereRef} geometry={atmoGeo}>
                <pointsMaterial size={0.025} vertexColors transparent opacity={0.3} blending={THREE.AdditiveBlending} depthWrite={false} sizeAttenuation />
            </points>
        </group>
    );
}

export const ParticleEarthScene = () => {
    const { containerRef, disperseFactor } = useScrollDisperse(0.3);

    return (
        <div ref={containerRef} className="absolute inset-0 z-0 pointer-events-none">
            <Canvas
                camera={{ position: [0, 0, 6], fov: 55 }}
                style={{ background: "transparent" }}
                gl={{ alpha: true, antialias: true }}
            >
                <ambientLight intensity={0.3} />
                <ParticleEarth disperseFactor={disperseFactor} />
            </Canvas>
        </div>
    );
};
