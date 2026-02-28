import { useEffect, useRef, useState } from "react";

/**
 * Tracks how far a container element is from the viewport center.
 * Returns a disperse factor from 0 (fully visible, centered) to 1 (scrolled far away).
 * The containerRef should be attached to the DOM wrapper of a Three.js canvas.
 */
export function useScrollDisperse(threshold = 0.6) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [disperseFactor, setDisperseFactor] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current) return;

            const rect = containerRef.current.getBoundingClientRect();
            const viewportHeight = window.innerHeight;

            // Center of the element relative to viewport
            const elementCenter = rect.top + rect.height / 2;
            const viewportCenter = viewportHeight / 2;

            // Distance from center, normalized (0 = perfectly centered, 1 = one viewport away)
            const distance = Math.abs(elementCenter - viewportCenter) / viewportHeight;

            // Apply threshold: start dispersing after threshold
            const factor = Math.max(0, Math.min(1, (distance - threshold) / (1 - threshold)));

            setDisperseFactor(factor);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll(); // Initial check

        return () => window.removeEventListener("scroll", handleScroll);
    }, [threshold]);

    return { containerRef, disperseFactor };
}
