import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const EVENT_DATE = new Date("2026-03-16T09:00:00+05:30").getTime();

function useCountdown() {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const tick = () => {
            const now = Date.now();
            const diff = Math.max(0, EVENT_DATE - now);
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
            <div
                className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-xl flex items-center justify-center border border-white/[0.08]"
                style={{
                    background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(0,255,255,0.04) 100%)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                }}
            >
                <span className="font-heading font-black text-2xl sm:text-3xl md:text-4xl text-white tabular-nums">
                    {String(value).padStart(2, "0")}
                </span>
                {/* Subtle glow at top */}
                <div
                    className="absolute inset-0 rounded-xl pointer-events-none"
                    style={{ background: "radial-gradient(circle at 50% 0%, rgba(0,255,255,0.08) 0%, transparent 60%)" }}
                />
            </div>
            <span className="mt-2 text-[9px] sm:text-[10px] font-heading tracking-[0.25em] text-gray-500 uppercase">
                {label}
            </span>
        </motion.div>
    );
}

export const Hero = () => {
    const { days, hours, minutes, seconds } = useCountdown();

    return (
        <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden">

            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_40%,_rgba(0,0,0,0.4)_100%)] z-[1] pointer-events-none"></div>

            <div className="relative z-10 text-center flex flex-col items-center px-4 pointer-events-none">

                {/* Date above title */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="text-accent font-heading text-sm md:text-base tracking-[0.3em] mb-8 font-bold"
                >
                    MARCH 16 - 17, 2026
                </motion.p>

                {/* Main Title */}
                <motion.h1
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="text-7xl sm:text-8xl md:text-[10rem] lg:text-[12rem] font-heading font-black text-white leading-none tracking-wider mb-4"
                    style={{
                        textShadow: "0 0 40px rgba(255,255,255,0.1)",
                    }}
                >
                    TECHFORTE
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="text-white text-sm md:text-base tracking-[0.2em] font-heading mb-10 uppercase"
                >
                    Inter Collegiate IT Fest
                </motion.p>

                {/* Countdown Timer */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="flex items-center gap-3 sm:gap-4 md:gap-6 mb-12"
                >
                    <CountdownUnit value={days} label="Days" delay={0.9} />
                    <span className="text-accent/40 font-heading text-xl md:text-2xl font-bold mt-[-20px]">:</span>
                    <CountdownUnit value={hours} label="Hours" delay={1.0} />
                    <span className="text-accent/40 font-heading text-xl md:text-2xl font-bold mt-[-20px]">:</span>
                    <CountdownUnit value={minutes} label="Minutes" delay={1.1} />
                    <span className="text-accent/40 font-heading text-xl md:text-2xl font-bold mt-[-20px]">:</span>
                    <CountdownUnit value={seconds} label="Seconds" delay={1.2} />
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.3 }}
                    className="flex flex-col sm:flex-row items-center gap-4 pointer-events-auto"
                >
                    <button className="btn-primary px-10 py-3">
                        REGISTER
                    </button>
                    <button className="btn-outline px-10 py-3">
                        BUY TICKETS
                    </button>
                </motion.div>
            </div>

        </section>
    );
};
