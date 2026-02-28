import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const IntroAnimation = ({ onComplete }: { onComplete: () => void }) => {
    const [phase, setPhase] = useState<"enter" | "hold" | "dissolve" | "done">("enter");

    useEffect(() => {
        // Phase 1: Letter entrance (0 – 1.8s)
        const t1 = setTimeout(() => setPhase("hold"), 1800);
        // Phase 2: Hold moment (1.8 – 2.8s)
        const t2 = setTimeout(() => setPhase("dissolve"), 2800);
        // Phase 3: Dissolve into background (2.8 – 4.8s)
        const t3 = setTimeout(() => {
            setPhase("done");
            onComplete();
        }, 4800);

        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t3);
        };
    }, [onComplete]);

    const titleText = "TECHFORTE";
    const letters = titleText.split("");

    return (
        <AnimatePresence>
            {phase !== "done" && (
                <motion.div
                    className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden"
                    style={{
                        backgroundColor: phase === "dissolve" ? undefined : "rgba(0,0,0,1)",
                    }}
                    initial={{ backgroundColor: "rgba(0,0,0,1)" }}
                    animate={{
                        backgroundColor:
                            phase === "dissolve"
                                ? "rgba(0,0,0,0)"
                                : "rgba(0,0,0,1)",
                    }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                    exit={{ opacity: 0 }}
                >
                    {/* Ambient glow pulse — stays and merges */}
                    <motion.div
                        className="absolute w-[600px] h-[600px] md:w-[900px] md:h-[900px] rounded-full"
                        style={{
                            background:
                                "radial-gradient(circle, rgba(0,255,255,0.12) 0%, rgba(0,255,255,0.04) 40%, transparent 70%)",
                        }}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{
                            scale: phase === "dissolve" ? 3 : 1,
                            opacity: phase === "dissolve" ? 0 : [0, 0.8, 0.6],
                        }}
                        transition={{
                            scale: { duration: 2, ease: "easeOut" },
                            opacity: { duration: phase === "dissolve" ? 2 : 1.5 },
                        }}
                    />

                    {/* Subtle ring pulse */}
                    <motion.div
                        className="absolute w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full border border-accent/20"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{
                            scale: phase === "dissolve" ? 4 : [0.8, 1.2, 1],
                            opacity: phase === "dissolve" ? 0 : [0, 0.5, 0.3],
                        }}
                        transition={{
                            duration: phase === "dissolve" ? 2 : 2,
                            ease: "easeOut",
                        }}
                    />

                    {/* Second ring — offset timing */}
                    <motion.div
                        className="absolute w-[200px] h-[200px] md:w-[350px] md:h-[350px] rounded-full border border-white/10"
                        initial={{ scale: 0.3, opacity: 0 }}
                        animate={{
                            scale: phase === "dissolve" ? 5 : [0.6, 1.1, 0.9],
                            opacity: phase === "dissolve" ? 0 : [0, 0.3, 0.2],
                        }}
                        transition={{
                            duration: phase === "dissolve" ? 1.8 : 2.5,
                            delay: phase === "dissolve" ? 0 : 0.3,
                            ease: "easeOut",
                        }}
                    />

                    {/* Scan line */}
                    <motion.div
                        className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent/50 to-transparent"
                        initial={{ top: "-1px", opacity: 0 }}
                        animate={{
                            top: "100%",
                            opacity: phase === "dissolve" ? 0 : [0, 1, 0.8, 0],
                        }}
                        transition={{ top: { duration: 2.5, ease: "linear" }, opacity: { duration: 2 } }}
                    />

                    {/* College name */}
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{
                            opacity: phase === "dissolve" ? 0 : 0.4,
                            y: 0,
                        }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="font-heading text-[10px] md:text-xs tracking-[0.4em] text-gray-500 uppercase mb-6 relative z-10"
                    >
                        Mount Carmel College Presents
                    </motion.p>

                    {/* Main title — letter by letter */}
                    <div className="flex items-center justify-center overflow-hidden relative z-10">
                        {letters.map((letter, i) => (
                            <motion.span
                                key={i}
                                initial={{ y: 100, opacity: 0, filter: "blur(10px)" }}
                                animate={{
                                    y: phase === "dissolve" ? -20 : 0,
                                    opacity: phase === "dissolve" ? 0 : 1,
                                    filter: phase === "dissolve" ? "blur(8px)" : "blur(0px)",
                                    scale: phase === "dissolve" ? 1.1 : 1,
                                }}
                                transition={{
                                    y: { delay: phase === "dissolve" ? i * 0.03 : 0.3 + i * 0.07, duration: phase === "dissolve" ? 0.8 : 0.7, ease: [0.16, 1, 0.3, 1] },
                                    opacity: { delay: phase === "dissolve" ? i * 0.03 : 0.3 + i * 0.07, duration: phase === "dissolve" ? 0.6 : 0.5 },
                                    filter: { delay: phase === "dissolve" ? i * 0.03 : 0.3 + i * 0.07, duration: phase === "dissolve" ? 0.8 : 0.5 },
                                    scale: { delay: phase === "dissolve" ? i * 0.03 : 0, duration: 0.8 },
                                }}
                                className="inline-block font-heading font-black text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-white tracking-wider"
                                style={{
                                    textShadow:
                                        phase === "hold"
                                            ? "0 0 40px rgba(0,255,255,0.4), 0 0 80px rgba(0,255,255,0.15)"
                                            : "0 0 20px rgba(0,255,255,0.2)",
                                }}
                            >
                                {letter}
                            </motion.span>
                        ))}
                    </div>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0, letterSpacing: "1em" }}
                        animate={{
                            opacity: phase === "dissolve" ? 0 : 1,
                            letterSpacing: phase === "dissolve" ? "0.6em" : "0.3em",
                            y: phase === "dissolve" ? -10 : 0,
                            filter: phase === "dissolve" ? "blur(6px)" : "blur(0px)",
                        }}
                        transition={{
                            delay: phase === "dissolve" ? 0.1 : 1.2,
                            duration: phase === "dissolve" ? 0.8 : 0.8,
                            ease: "easeOut",
                        }}
                        className="font-heading text-accent text-sm md:text-base mt-6 uppercase font-bold relative z-10"
                    >
                        Inter Collegiate IT Fest
                    </motion.p>

                    {/* Year badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{
                            opacity: phase === "dissolve" ? 0 : 0.7,
                            scale: phase === "dissolve" ? 1.2 : 1,
                        }}
                        transition={{ delay: phase === "dissolve" ? 0 : 1.5, duration: 0.6 }}
                        className="mt-4 px-6 py-1.5 border border-white/10 rounded-full relative z-10"
                    >
                        <span className="font-heading text-xs tracking-[0.3em] text-gray-400">
                            MARCH 16 – 17, 2026
                        </span>
                    </motion.div>

                    {/* Loading indicator — thin line at bottom */}
                    <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-32 md:w-48 z-10">
                        <motion.div
                            className="h-[1px] bg-accent/60 shadow-[0_0_6px_rgba(0,255,255,0.4)]"
                            initial={{ width: "0%" }}
                            animate={{ width: phase === "dissolve" ? "0%" : "100%" }}
                            transition={{
                                width: {
                                    duration: phase === "dissolve" ? 0.5 : 2.5,
                                    ease: phase === "dissolve" ? "easeIn" : [0.4, 0, 0.2, 1],
                                },
                            }}
                        />
                    </div>

                    {/* Particle-like dots that scatter outward during dissolve */}
                    {phase === "dissolve" && (
                        <>
                            {Array.from({ length: 20 }).map((_, i) => {
                                const angle = (i / 20) * Math.PI * 2;
                                const dist = 400 + Math.random() * 300;
                                return (
                                    <motion.div
                                        key={i}
                                        className="absolute w-1 h-1 bg-accent rounded-full"
                                        initial={{
                                            x: 0,
                                            y: 0,
                                            opacity: 0.8,
                                            scale: 1,
                                        }}
                                        animate={{
                                            x: Math.cos(angle) * dist,
                                            y: Math.sin(angle) * dist,
                                            opacity: 0,
                                            scale: 0,
                                        }}
                                        transition={{
                                            duration: 1.5,
                                            delay: Math.random() * 0.3,
                                            ease: "easeOut",
                                        }}
                                    />
                                );
                            })}
                        </>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
};
