import { useRef, useMemo, useEffect, useCallback } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const PARTICLE_COUNT = 10000;
const STAR_COUNT = 800;
const DISPERSE_RADIUS = 1.2;
const DISPERSE_STRENGTH = 0.6;

// ─── Shape generators ──────────────────────────────────────

function generateSphereShape(count: number, radius: number): Float32Array {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const r = radius * (0.85 + Math.random() * 0.15);
        pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
}

function generateRingShape(count: number, majorR: number, minorR: number, tilt: number): Float32Array {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI * 2;
        const x = (majorR + minorR * Math.cos(phi)) * Math.cos(theta);
        const y = (majorR + minorR * Math.cos(phi)) * Math.sin(theta);
        const z = minorR * Math.sin(phi);
        const cosT = Math.cos(tilt);
        const sinT = Math.sin(tilt);
        pos[i * 3] = x;
        pos[i * 3 + 1] = y * cosT - z * sinT;
        pos[i * 3 + 2] = y * sinT + z * cosT;
    }
    return pos;
}

function generateLaptopShape(count: number): Float32Array {
    const pos = new Float32Array(count * 3);
    // Laptop dimensions
    const screenW = 3.2, screenH = 2.2;
    const baseW = 3.4, baseD = 2.0;
    const screenTilt = Math.PI * 0.12; // slight tilt back
    const hingeY = -1.1; // hinge position

    // Allocate particles: 50% screen, 10% screen border, 30% keyboard base, 10% hinge + details
    const screenCount = Math.floor(count * 0.50);
    const borderCount = Math.floor(count * 0.10);
    const baseCount = Math.floor(count * 0.30);
    const detailCount = count - screenCount - borderCount - baseCount;
    let idx = 0;

    // Screen fill (tilted back from hinge)
    for (let i = 0; i < screenCount; i++) {
        const lx = (Math.random() - 0.5) * screenW;
        const ly = Math.random() * screenH;
        const x = lx;
        const y = hingeY + ly * Math.cos(screenTilt);
        const z = -ly * Math.sin(screenTilt);
        pos[idx * 3] = x + (Math.random() - 0.5) * 0.02;
        pos[idx * 3 + 1] = y + (Math.random() - 0.5) * 0.02;
        pos[idx * 3 + 2] = z + (Math.random() - 0.5) * 0.02;
        idx++;
    }

    // Screen border (thicker edges)
    for (let i = 0; i < borderCount; i++) {
        const edge = Math.floor(Math.random() * 4);
        let lx = 0, ly = 0;
        const bevel = 0.06;
        if (edge === 0) { lx = -screenW / 2 + (Math.random() - 0.5) * bevel; ly = Math.random() * screenH; }
        else if (edge === 1) { lx = screenW / 2 + (Math.random() - 0.5) * bevel; ly = Math.random() * screenH; }
        else if (edge === 2) { lx = (Math.random() - 0.5) * screenW; ly = screenH + (Math.random() - 0.5) * bevel; }
        else { lx = (Math.random() - 0.5) * screenW; ly = (Math.random() - 0.5) * bevel; }
        const x = lx;
        const y = hingeY + ly * Math.cos(screenTilt);
        const z = -ly * Math.sin(screenTilt);
        pos[idx * 3] = x;
        pos[idx * 3 + 1] = y;
        pos[idx * 3 + 2] = z;
        idx++;
    }

    // Keyboard base (flat, extending forward from hinge)
    const baseTilt = -Math.PI * 0.02; // very slight tilt
    for (let i = 0; i < baseCount; i++) {
        const lx = (Math.random() - 0.5) * baseW;
        const ld = Math.random() * baseD;
        const x = lx;
        const y = hingeY - ld * Math.sin(baseTilt);
        const z = ld * Math.cos(baseTilt);
        pos[idx * 3] = x + (Math.random() - 0.5) * 0.02;
        pos[idx * 3 + 1] = y + (Math.random() - 0.5) * 0.02;
        pos[idx * 3 + 2] = z + (Math.random() - 0.5) * 0.02;
        idx++;
    }

    // Hinge line + keyboard detail dots
    for (let i = 0; i < detailCount; i++) {
        if (i < detailCount * 0.4) {
            // Hinge line
            const lx = (Math.random() - 0.5) * baseW;
            pos[idx * 3] = lx;
            pos[idx * 3 + 1] = hingeY + (Math.random() - 0.5) * 0.05;
            pos[idx * 3 + 2] = (Math.random() - 0.5) * 0.05;
        } else {
            // Keyboard keys (grid dots on base)
            const rows = 4, cols = 10;
            const row = Math.floor(Math.random() * rows);
            const col = Math.floor(Math.random() * cols);
            const kx = (col / (cols - 1) - 0.5) * (baseW * 0.75);
            const ky = hingeY - 0.3 - (row / (rows - 1)) * (baseD * 0.5);
            pos[idx * 3] = kx + (Math.random() - 0.5) * 0.08;
            pos[idx * 3 + 1] = ky + (Math.random() - 0.5) * 0.05;
            pos[idx * 3 + 2] = (baseD * 0.15) + (Math.random() - 0.5) * 0.05;
        }
        idx++;
    }

    return pos;
}

function generateEarthShape(count: number): Float32Array {
    const pos = new Float32Array(count * 3);
    const radius = 2.5;
    for (let i = 0; i < count; i++) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const r = radius + (Math.random() - 0.5) * 0.08;
        pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
}

function generateColors(count: number): Float32Array {
    const colors = new Float32Array(count * 3);
    // Blue & Green color palette
    const palette = [
        [0.0, 0.4, 1.0],     // Bright blue
        [0.0, 0.6, 1.0],     // Sky blue
        [0.1, 0.3, 0.9],     // Deep blue
        [0.0, 0.8, 0.4],     // Emerald green
        [0.0, 1.0, 0.5],     // Neon green
        [0.1, 0.9, 0.3],     // Lime green
        [0.0, 0.7, 0.7],     // Teal
        [0.0, 0.5, 0.8],     // Ocean blue
    ];
    for (let i = 0; i < count; i++) {
        const c = palette[Math.floor(Math.random() * palette.length)];
        // Add slight random variation for organic feel
        colors[i * 3] = Math.min(1, Math.max(0, c[0] + (Math.random() - 0.5) * 0.1));
        colors[i * 3 + 1] = Math.min(1, Math.max(0, c[1] + (Math.random() - 0.5) * 0.1));
        colors[i * 3 + 2] = Math.min(1, Math.max(0, c[2] + (Math.random() - 0.5) * 0.1));
    }
    return colors;
}

// ─── Main particle system ──────────────────────────────────

function MorphingParticles({ scrollProgress }: { scrollProgress: React.MutableRefObject<number> }) {
    const mainRef = useRef<THREE.Points>(null);
    const starsRef = useRef<THREE.Points>(null);
    const mouseTarget = useRef({ x: 0, y: 0 });
    const mouseSmooth = useRef({ x: 0, y: 0 });
    const smoothProgress = useRef(0);
    // Store per-particle dispersion offsets
    const disperseOffsets = useRef(new Float32Array(PARTICLE_COUNT * 3));

    // Pre-compute all 3 shape targets
    const { geometry, shapeA, shapeB, shapeC } = useMemo(() => {
        const spherePositions = generateSphereShape(PARTICLE_COUNT, 1.8);

        // Shape A: Sphere + rings merged (rocket-like)
        const ringCount1 = Math.floor(PARTICLE_COUNT * 0.3);
        const ringCount2 = Math.floor(PARTICLE_COUNT * 0.2);
        const sphereCount = PARTICLE_COUNT - ringCount1 - ringCount2;
        const ring1 = generateRingShape(ringCount1, 3.2, 0.15, Math.PI * 0.35);
        const ring2 = generateRingShape(ringCount2, 3.8, 0.1, -Math.PI * 0.25);
        const sphereCore = generateSphereShape(sphereCount, 1.8);

        const a = new Float32Array(PARTICLE_COUNT * 3);
        a.set(sphereCore, 0);
        a.set(ring1, sphereCount * 3);
        a.set(ring2, (sphereCount + ringCount1) * 3);

        // Shape B: Laptop
        const b = generateLaptopShape(PARTICLE_COUNT);

        // Shape C: Earth
        const c = generateEarthShape(PARTICLE_COUNT);

        const geo = new THREE.BufferGeometry();
        geo.setAttribute("position", new THREE.BufferAttribute(spherePositions.slice(), 3));
        geo.setAttribute("color", new THREE.BufferAttribute(generateColors(PARTICLE_COUNT), 3));

        return { geometry: geo, shapeA: a, shapeB: b, shapeC: c };
    }, []);

    // Stars geometry
    const starsGeo = useMemo(() => {
        const geo = new THREE.BufferGeometry();
        const pos = new Float32Array(STAR_COUNT * 3);
        const col = new Float32Array(STAR_COUNT * 3);
        for (let i = 0; i < STAR_COUNT; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 30;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 30;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 30;
            const b = 0.3 + Math.random() * 0.7;
            col[i * 3] = b; col[i * 3 + 1] = b; col[i * 3 + 2] = b;
        }
        geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
        geo.setAttribute("color", new THREE.BufferAttribute(col, 3));
        return geo;
    }, []);

    // Mouse tracking — store both smooth coords for rotation AND raw NDC for dispersion
    const mouseNDC = useRef({ x: 0, y: 0 });
    const handlePointerMove = useCallback((e: PointerEvent) => {
        mouseTarget.current.x = ((e.clientX / window.innerWidth) * 2 - 1) * 0.5;
        mouseTarget.current.y = (-(e.clientY / window.innerHeight) * 2 + 1) * 0.5;
        mouseNDC.current.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouseNDC.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    }, []);

    useEffect(() => {
        window.addEventListener("pointermove", handlePointerMove);
        return () => window.removeEventListener("pointermove", handlePointerMove);
    }, [handlePointerMove]);

    useFrame(({ camera }) => {
        // Smooth scroll progress
        smoothProgress.current += (scrollProgress.current - smoothProgress.current) * 0.04;
        const p = smoothProgress.current;

        // Determine which two shapes to interpolate between
        // 0–0.5 = shape A → shape B, 0.5–1.0 = shape B → shape C
        const pos = geometry.attributes.position.array as Float32Array;

        if (p <= 0.5) {
            const t = p / 0.5;
            for (let i = 0; i < pos.length; i++) {
                pos[i] = shapeA[i] + (shapeB[i] - shapeA[i]) * t;
            }
        } else {
            const t = (p - 0.5) / 0.5;
            for (let i = 0; i < pos.length; i++) {
                pos[i] = shapeB[i] + (shapeC[i] - shapeB[i]) * t;
            }
        }

        // ─── Mouse hover dispersion ─────────────────────────
        // Project mouse NDC into 3D world space at z=0 plane
        const mouseWorld = new THREE.Vector3(mouseNDC.current.x, mouseNDC.current.y, 0.5);
        mouseWorld.unproject(camera);
        const dir = mouseWorld.sub(camera.position).normalize();
        const dist = -camera.position.z / dir.z;
        const mouse3D = camera.position.clone().add(dir.multiplyScalar(dist));

        const offsets = disperseOffsets.current;
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            const ix = i * 3, iy = i * 3 + 1, iz = i * 3 + 2;
            const dx = pos[ix] - mouse3D.x;
            const dy = pos[iy] - mouse3D.y;
            const dz = pos[iz] - mouse3D.z;
            const d = Math.sqrt(dx * dx + dy * dy + dz * dz);

            if (d < DISPERSE_RADIUS && d > 0.001) {
                const force = (1 - d / DISPERSE_RADIUS) * DISPERSE_STRENGTH;
                offsets[ix] += (dx / d) * force;
                offsets[iy] += (dy / d) * force;
                offsets[iz] += (dz / d) * force;
            }

            // Decay offsets back to zero (spring back)
            offsets[ix] *= 0.92;
            offsets[iy] *= 0.92;
            offsets[iz] *= 0.92;

            pos[ix] += offsets[ix];
            pos[iy] += offsets[iy];
            pos[iz] += offsets[iz];
        }

        geometry.attributes.position.needsUpdate = true;

        // Mouse follow rotation
        mouseSmooth.current.x += (mouseTarget.current.x - mouseSmooth.current.x) * 0.05;
        mouseSmooth.current.y += (mouseTarget.current.y - mouseSmooth.current.y) * 0.05;

        if (mainRef.current) {
            mainRef.current.rotation.y += 0.002;
            mainRef.current.rotation.x = mouseSmooth.current.y * 0.3;
        }

        if (starsRef.current) {
            starsRef.current.rotation.y += 0.0002;
        }
    });

    const mat = useMemo(() => ({
        vertexColors: true, transparent: true, opacity: 0.55,
        blending: THREE.AdditiveBlending, depthWrite: false, sizeAttenuation: true,
    }), []);

    return (
        <>
            <points ref={starsRef} geometry={starsGeo}>
                <pointsMaterial {...mat} size={0.025} opacity={0.35} />
            </points>
            <points ref={mainRef} geometry={geometry}>
                <pointsMaterial {...mat} size={0.018} />
            </points>
        </>
    );
}

// ─── Scene wrapper (fixed fullscreen) ──────────────────────

export const UnifiedParticleBackground = () => {
    const scrollProgress = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            scrollProgress.current = scrollHeight > 0 ? window.scrollY / scrollHeight : 0;
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="fixed inset-0 z-0 pointer-events-none">
            <Canvas
                camera={{ position: [0, 0, 6], fov: 60 }}
                style={{ background: "transparent" }}
                gl={{ alpha: true, antialias: true }}
            >
                <ambientLight intensity={0.5} />
                <MorphingParticles scrollProgress={scrollProgress} />
            </Canvas>
        </div>
    );
};
