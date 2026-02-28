import { useRef, useState } from "react";
import { motion } from "framer-motion";

interface Event {
    id: number;
    title: string;
    category: string;
    description: string;
    image: string;
}

const TECH_EVENTS: Event[] = [
    {
        id: 1,
        title: "SHIFT-CODE",
        category: "HACKATHON",
        description: "Building solutions that change perspectives.",
        image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=600",
    },
    {
        id: 2,
        title: "FOCAL POINT",
        category: "IT QUIZ",
        description: "Precision and clarity under pressure.",
        image: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?auto=format&fit=crop&q=80&w=600",
    },
    {
        id: 3,
        title: "LAYERED LOGIC",
        category: "WEB DESIGN",
        description: "Creating depth and immersion on the front end.",
        image: "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&q=80&w=600",
    },
    {
        id: 4,
        title: "THE VANTAGE",
        category: "IT MANAGER",
        description: "Seeing the \"big picture\" from the top.",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=600",
    },
    {
        id: 5,
        title: "REFRACTION",
        category: "DATA VIZ / CLEANING",
        description: "Turning raw \"light\" (data) into clear insights.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600",
    },
];

const NON_TECH_EVENTS: Event[] = [
    {
        id: 6,
        title: "PARALLAX SHIFT",
        category: "SURPRISE EVENT",
        description: "The moment everything changes. The rules shift, the game flips, and the surprise begins.",
        image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=600",
    },
    {
        id: 7,
        title: "PARALLAX PARADOX",
        category: "TREASURE HUNT",
        description: "Finding what's hidden in plain sight by shifting your view.",
        image: "https://images.unsplash.com/photo-1509515837298-2c67a3933321?auto=format&fit=crop&q=80&w=600",
    },
    {
        id: 8,
        title: "CROSS-SIGHT",
        category: "COD / VALORANT",
        description: "High-speed tactical shifts and precision aiming.",
        image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=600",
    },
    {
        id: 9,
        title: "DEPTH MOTION",
        category: "FIFA / PS GAMES",
        description: "Realistic physics and fluid movement in a virtual space.",
        image: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?auto=format&fit=crop&q=80&w=600",
    },
    {
        id: 10,
        title: "MULTI-FRAME",
        category: "AD CREATING",
        description: "Telling a story through different layers and angles.",
        image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=600",
    },
    {
        id: 11,
        title: "OPTICAL FLARE",
        category: "VIRALIZATION / MARKETING",
        description: "Capturing attention and spreading through the lens.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600",
    },
];

function GlassCard({ event, index }: { event: Event; index: number }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const glowRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!cardRef.current || !glowRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        glowRef.current.style.background = `radial-gradient(circle 180px at ${x}px ${y}px, rgba(0,255,255,0.15), transparent 70%)`;
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.06 }}
            whileHover={{ y: -6 }}
            className="group relative flex-shrink-0 w-[280px] md:w-[300px] cursor-pointer"
        >
            <div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="relative h-[380px] rounded-2xl overflow-hidden border border-white/[0.08] transition-all duration-500
                    group-hover:border-accent/30 group-hover:shadow-[0_0_30px_rgba(0,255,255,0.1),0_20px_60px_rgba(0,0,0,0.4)]"
                style={{
                    background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 50%, rgba(0,255,255,0.03) 100%)",
                    backdropFilter: "blur(16px)",
                    WebkitBackdropFilter: "blur(16px)",
                }}
            >
                {/* Cursor-follow gradient glow */}
                <div
                    ref={glowRef}
                    className="absolute inset-0 z-[1] rounded-2xl pointer-events-none transition-opacity duration-300"
                    style={{ opacity: isHovered ? 1 : 0 }}
                />

                {/* Border glow */}
                <div
                    className="absolute inset-0 z-[1] rounded-2xl pointer-events-none transition-opacity duration-300"
                    style={{
                        opacity: isHovered ? 1 : 0,
                        boxShadow: "inset 0 0 0 1px rgba(0,255,255,0.15)",
                    }}
                />

                {/* Top image area */}
                <div className="relative h-[160px] overflow-hidden z-[2]">
                    <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-3 left-4">
                        <span className="inline-block px-3 py-1 text-[9px] font-heading font-bold tracking-[0.15em] uppercase
                            bg-accent/15 backdrop-blur-sm text-accent border border-accent/20 rounded-full
                            group-hover:bg-accent/25 group-hover:border-accent/40 transition-all">
                            {event.category}
                        </span>
                    </div>
                </div>

                {/* Content area */}
                <div className="relative z-[2] p-5 flex flex-col justify-between h-[220px]">
                    <div>
                        <div className="flex items-baseline gap-3 mb-3">
                            <span className="text-accent/40 font-heading text-[10px] tracking-widest">
                                {String(event.id).padStart(2, "0")}
                            </span>
                            <div className="flex-1 h-px bg-gradient-to-r from-accent/20 to-transparent" />
                        </div>
                        <h3 className="font-heading font-black text-white text-base md:text-lg tracking-wider mb-3
                            group-hover:text-accent transition-colors duration-300">
                            {event.title}
                        </h3>
                        <p className="text-gray-400 text-xs leading-relaxed group-hover:text-gray-300 transition-colors">
                            {event.description}
                        </p>
                    </div>
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/[0.05]">
                        <span className="text-[10px] font-heading text-gray-500 tracking-[0.15em] uppercase
                            group-hover:text-accent/60 transition-colors">
                            View Details
                        </span>
                        <motion.span
                            className="text-gray-500 text-sm group-hover:text-accent transition-colors"
                            whileHover={{ x: 4 }}
                        >
                            →
                        </motion.span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

function ScrollRow({ events, label }: { events: Event[]; label: string }) {
    return (
        <div className="mb-14">
            {/* Sub-label */}
            <div className="flex items-center gap-4 px-6 md:px-12 mb-6">
                <span className="w-2 h-2 rounded-full bg-accent shadow-[0_0_6px_rgba(0,255,255,0.5)]" />
                <span className="font-heading text-sm md:text-base tracking-[0.2em] text-white/70 uppercase font-bold">
                    {label}
                </span>
                <div className="flex-1 h-px bg-white/[0.06]" />
                <span className="text-gray-600 text-[10px] font-heading tracking-widest">
                    {events.length} EVENTS
                </span>
            </div>

            {/* Horizontal scroll */}
            <div className="overflow-x-auto pb-4 scrollbar-hide">
                <div className="flex gap-6 px-6 md:px-12" style={{ width: "max-content" }}>
                    {events.map((event, index) => (
                        <GlassCard key={event.id} event={event} index={index} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export const EventsShowcase = () => {
    const [activeTab, setActiveTab] = useState<"all" | "tech" | "nontech">("all");

    return (
        <section id="events-showcase" className="py-20 relative">
            <div className="px-6 md:px-12 mb-10">
                {/* Section header */}
                <div className="flex items-end gap-6 mb-10">
                    <div>
                        <motion.span
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="text-accent font-heading text-lg md:text-2xl font-bold tracking-wider block"
                        >
                            EXPLORE
                        </motion.span>
                        <motion.span
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-white font-heading text-3xl md:text-5xl font-black tracking-wider block"
                        >
                            OUR EVENTS
                        </motion.span>
                    </div>
                    <div className="flex-1 h-px bg-gray-700 mb-4"></div>
                    <span className="text-gray-600 text-xs font-heading tracking-[0.2em] mb-4 hidden md:block">
                        TECHFORTE 2026
                    </span>
                </div>

                {/* Tab switcher */}
                <div className="flex items-center gap-1 bg-white/[0.04] rounded-full p-1 border border-white/[0.06] w-fit">
                    {([
                        { key: "all", label: "All Events" },
                        { key: "tech", label: "Technical" },
                        { key: "nontech", label: "Non-Technical" },
                    ] as const).map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key)}
                            className={`relative px-5 py-2 text-xs font-heading font-medium tracking-wider rounded-full transition-colors duration-300
                                ${activeTab === tab.key ? "text-black" : "text-gray-400 hover:text-white"}`}
                        >
                            {activeTab === tab.key && (
                                <motion.div
                                    layoutId="eventTab"
                                    className="absolute inset-0 bg-accent rounded-full shadow-[0_0_12px_rgba(0,255,255,0.4)]"
                                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                />
                            )}
                            <span className="relative z-10">{tab.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Event rows */}
            {(activeTab === "all" || activeTab === "tech") && (
                <ScrollRow events={TECH_EVENTS} label="Technical" />
            )}
            {(activeTab === "all" || activeTab === "nontech") && (
                <ScrollRow events={NON_TECH_EVENTS} label="Non-Technical" />
            )}

            {/* Register button */}
            <div className="flex justify-center mt-8">
                <button className="btn-outline px-10">
                    REGISTER NOW
                </button>
            </div>
        </section>
    );
};
