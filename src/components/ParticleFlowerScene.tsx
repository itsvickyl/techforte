import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useScrollDisperse } from "../hooks/useScrollDisperse";

function generateLaptopPoints(count: number) {
    const positions: number[] = [];
    const colors: number[] = [];

    const screenW = 3.2, screenH = 2.2;
    const baseW = 3.4, baseD = 2.0;
    const screenTilt = Math.PI * 0.12;
    const hingeY = -1.1;

    const screenCount = Math.floor(count * 0.50);
    const borderCount = Math.floor(count * 0.10);
    const baseCount = Math.floor(count * 0.30);
    const detailCount = count - screenCount - borderCount - baseCount;

    const pushColor = () => {
        if (Math.random() > 0.35) {
            colors.push(0, 0.85 + Math.random() * 0.15, 0.85 + Math.random() * 0.15);
        } else {
            const b = 0.7 + Math.random() * 0.3;
            colors.push(b, b, b);
        }
    };

    // Screen fill
    for (let i = 0; i < screenCount; i++) {
        const lx = (Math.random() - 0.5) * screenW;
        const ly = Math.random() * screenH;
        positions.push(
            lx + (Math.random() - 0.5) * 0.02,
            hingeY + ly * Math.cos(screenTilt) + (Math.random() - 0.5) * 0.02,
            -ly * Math.sin(screenTilt) + (Math.random() - 0.5) * 0.02
        );
        pushColor();
    }

    // Screen border
    for (let i = 0; i < borderCount; i++) {
        const edge = Math.floor(Math.random() * 4);
        let lx = 0, ly = 0;
        const bevel = 0.06;
        if (edge === 0) { lx = -screenW / 2 + (Math.random() - 0.5) * bevel; ly = Math.random() * screenH; }
        else if (edge === 1) { lx = screenW / 2 + (Math.random() - 0.5) * bevel; ly = Math.random() * screenH; }
        else if (edge === 2) { lx = (Math.random() - 0.5) * screenW; ly = screenH + (Math.random() - 0.5) * bevel; }
        else { lx = (Math.random() - 0.5) * screenW; ly = (Math.random() - 0.5) * bevel; }
        positions.push(lx, hingeY + ly * Math.cos(screenTilt), -ly * Math.sin(screenTilt));
        pushColor();
    }

    // Keyboard base
    const baseTilt = -Math.PI * 0.02;
    for (let i = 0; i < baseCount; i++) {
        const lx = (Math.random() - 0.5) * baseW;
        const ld = Math.random() * baseD;
        positions.push(
            lx + (Math.random() - 0.5) * 0.02,
            hingeY - ld * Math.sin(baseTilt) + (Math.random() - 0.5) * 0.02,
            ld * Math.cos(baseTilt) + (Math.random() - 0.5) * 0.02
        );
        pushColor();
    }

    // Hinge + keyboard keys
    for (let i = 0; i < detailCount; i++) {
        if (i < detailCount * 0.4) {
            const lx = (Math.random() - 0.5) * baseW;
            positions.push(lx, hingeY + (Math.random() - 0.5) * 0.05, (Math.random() - 0.5) * 0.05);
        } else {
            const rows = 4, cols = 10;
            const row = Math.floor(Math.random() * rows);
            const col = Math.floor(Math.random() * cols);
            const kx = (col / (cols - 1) - 0.5) * (baseW * 0.75);
            const ky = hingeY - 0.3 - (row / (rows - 1)) * (baseD * 0.5);
            positions.push(
                kx + (Math.random() - 0.5) * 0.08,
                ky + (Math.random() - 0.5) * 0.05,
                baseD * 0.15 + (Math.random() - 0.5) * 0.05
            );
        }
        pushColor();
    }

    return {
        positions: new Float32Array(positions),
        colors: new Float32Array(colors),
    };
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

function generateAmbientDots(count: number, radius: number) {
    const positions: number[] = [];
    const colors: number[] = [];
    for (let i = 0; i < count; i++) {
        positions.push(
            (Math.random() - 0.5) * radius * 2,
            (Math.random() - 0.5) * radius * 2,
            (Math.random() - 0.5) * radius
        );
        const brightness = 0.3 + Math.random() * 0.5;
        if (Math.random() > 0.5) {
            colors.push(0, brightness, brightness);
        } else {
            colors.push(brightness, brightness, brightness);
        }
    }
    return { positions: new Float32Array(positions), colors: new Float32Array(colors) };
}

function ParticleLaptop({ disperseFactor }: { disperseFactor: number }) {
    const laptopRef = useRef<THREE.Points>(null);
    const dotsRef = useRef<THREE.Points>(null);
    const mouseTarget = useRef({ x: 0, y: 0 });
    const mouseSmooth = useRef({ x: 0, y: 0 });
    const disperseSmooth = useRef(0);

    const LAPTOP_COUNT = 18000;
    const DOTS_COUNT = 500;

    const { laptopGeo, laptopOriginal, laptopScatter } = useMemo(() => {
        const data = generateLaptopPoints(LAPTOP_COUNT);
        const geo = new THREE.BufferGeometry();
        geo.setAttribute("position", new THREE.BufferAttribute(data.positions.slice(), 3));
        geo.setAttribute("color", new THREE.BufferAttribute(data.colors, 3));
        return {
            laptopGeo: geo,
            laptopOriginal: data.positions,
            laptopScatter: generateScatterTargets(LAPTOP_COUNT, 5),
        };
    }, []);

    const { dotsGeo, dotsOriginal, dotsScatter } = useMemo(() => {
        const data = generateAmbientDots(DOTS_COUNT, 5);
        const geo = new THREE.BufferGeometry();
        geo.setAttribute("position", new THREE.BufferAttribute(data.positions.slice(), 3));
        geo.setAttribute("color", new THREE.BufferAttribute(data.colors, 3));
        return {
            dotsGeo: geo,
            dotsOriginal: data.positions,
            dotsScatter: generateScatterTargets(DOTS_COUNT, 8),
        };
    }, []);

    useMemo(() => {
        const handler = (e: PointerEvent) => {
            mouseTarget.current.x = ((e.clientX / window.innerWidth) * 2 - 1) * 0.5;
            mouseTarget.current.y = (-(e.clientY / window.innerHeight) * 2 + 1) * 0.5;
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

        lerpPositions(laptopGeo, laptopOriginal, laptopScatter, d);
        lerpPositions(dotsGeo, dotsOriginal, dotsScatter, d);

        mouseSmooth.current.x += (mouseTarget.current.x - mouseSmooth.current.x) * 0.04;
        mouseSmooth.current.y += (mouseTarget.current.y - mouseSmooth.current.y) * 0.04;

        if (laptopRef.current) {
            laptopRef.current.rotation.y += 0.003;
            laptopRef.current.rotation.x = mouseSmooth.current.y * 0.8;
        }
        if (dotsRef.current) {
            dotsRef.current.rotation.z -= 0.001;
        }
    });

    return (
        <group position={[0, 0, 0]}>
            <points ref={dotsRef} geometry={dotsGeo}>
                <pointsMaterial size={0.04} vertexColors transparent opacity={0.5} blending={THREE.AdditiveBlending} depthWrite={false} sizeAttenuation />
            </points>
            <points ref={laptopRef} geometry={laptopGeo}>
                <pointsMaterial size={0.02} vertexColors transparent opacity={0.9} blending={THREE.AdditiveBlending} depthWrite={false} sizeAttenuation />
            </points>
        </group>
    );
}

export const ParticleLaptopScene = () => {
    const { containerRef, disperseFactor } = useScrollDisperse(0.3);

    return (
        <div ref={containerRef} className="w-full h-full min-h-[400px]">
            <Canvas
                camera={{ position: [0, 0, 5.5], fov: 55 }}
                style={{ background: "transparent" }}
                gl={{ alpha: true, antialias: true }}
            >
                <ambientLight intensity={0.3} />
                <ParticleLaptop disperseFactor={disperseFactor} />
            </Canvas>
        </div>
    );
};
