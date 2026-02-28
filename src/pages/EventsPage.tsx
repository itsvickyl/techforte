import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ALL_EVENTS, TECH_EVENTS, NON_TECH_EVENTS } from "../data/events";
import type { EventDetail } from "../data/events";
import { Clock, MapPin, Users, Trophy, ChevronRight, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

function EventCard({ event, onClick }: { event: EventDetail; onClick: () => void }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const glowRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!cardRef.current || !glowRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        glowRef.current.style.background = `radial-gradient(circle 200px at ${x}px ${y}px, rgba(0,255,255,0.12), transparent 70%)`;
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            whileHover={{ y: -4 }}
            onClick={onClick}
            className="group cursor-pointer"
        >
            <div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="relative rounded-2xl overflow-hidden border border-white/[0.06] transition-all duration-500
                    group-hover:border-accent/30 group-hover:shadow-[0_0_30px_rgba(0,255,255,0.08)]"
                style={{
                    background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(0,255,255,0.02) 100%)",
                    backdropFilter: "blur(16px)",
                    WebkitBackdropFilter: "blur(16px)",
                }}
            >
                <div ref={glowRef} className="absolute inset-0 z-[1] pointer-events-none transition-opacity duration-300"
                    style={{ opacity: isHovered ? 1 : 0 }} />

                {/* Image */}
                <div className="relative h-[180px] overflow-hidden z-[2]">
                    <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                    <div className="absolute top-3 left-3">
                        <span className={`inline-block px-3 py-1 text-[9px] font-heading font-bold tracking-[0.15em] uppercase rounded-full border
                            ${event.type === "tech"
                                ? "bg-accent/15 text-accent border-accent/20"
                                : "bg-purple-500/15 text-purple-400 border-purple-500/20"}`}>
                            {event.type === "tech" ? "TECHNICAL" : "NON-TECH"}
                        </span>
                    </div>
                    <div className="absolute bottom-3 left-4">
                        <span className="inline-block px-3 py-1 text-[9px] font-heading font-bold tracking-[0.15em] uppercase
                            bg-white/10 backdrop-blur-sm text-white/80 rounded-full">
                            {event.category}
                        </span>
                    </div>
                </div>

                {/* Content */}
                <div className="relative z-[2] p-5">
                    <h3 className="font-heading font-black text-white text-lg tracking-wider mb-2
                        group-hover:text-accent transition-colors duration-300">
                        {event.title}
                    </h3>
                    <p className="text-gray-400 text-xs leading-relaxed mb-4 line-clamp-2">
                        {event.description}
                    </p>

                    {/* Quick info */}
                    <div className="flex flex-wrap gap-3 mb-4">
                        <span className="flex items-center gap-1.5 text-[10px] text-gray-500">
                            <Users className="w-3 h-3" /> {event.teamSize}
                        </span>
                        <span className="flex items-center gap-1.5 text-[10px] text-gray-500">
                            <Clock className="w-3 h-3" /> {event.duration}
                        </span>
                        <span className="flex items-center gap-1.5 text-[10px] text-accent/60">
                            <Trophy className="w-3 h-3" /> {event.prize}
                        </span>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-white/[0.05]">
                        <span className="text-[10px] font-heading text-gray-500 tracking-[0.15em] uppercase
                            group-hover:text-accent/60 transition-colors">
                            View Details
                        </span>
                        <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-accent transition-colors" />
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

function EventModal({ event, onClose }: { event: EventDetail; onClose: () => void }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            onClick={onClose}
        >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
            <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 30 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 30 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                onClick={e => e.stopPropagation()}
                className="relative z-10 w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl border border-white/[0.08] scrollbar-hide"
                style={{
                    background: "linear-gradient(180deg, rgba(15,15,20,0.98) 0%, rgba(5,5,10,0.99) 100%)",
                    backdropFilter: "blur(24px)",
                }}
            >
                {/* Hero image */}
                <div className="relative h-[220px] overflow-hidden">
                    <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-black/40 to-transparent" />
                    <button onClick={onClose}
                        className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/50 backdrop-blur-md border border-white/10
                            flex items-center justify-center text-white/70 hover:text-white hover:border-accent/30 transition-all">
                        ✕
                    </button>
                    <div className="absolute bottom-4 left-6 flex items-center gap-2">
                        <span className={`px-3 py-1 text-[9px] font-heading font-bold tracking-[0.15em] uppercase rounded-full border
                            ${event.type === "tech"
                                ? "bg-accent/15 text-accent border-accent/20"
                                : "bg-purple-500/15 text-purple-400 border-purple-500/20"}`}>
                            {event.type === "tech" ? "TECHNICAL" : "NON-TECH"}
                        </span>
                        <span className="px-3 py-1 text-[9px] font-heading font-bold tracking-[0.15em] uppercase
                            bg-white/10 backdrop-blur-sm text-white/80 rounded-full">
                            {event.category}
                        </span>
                    </div>
                </div>

                <div className="p-6 md:p-8">
                    <h2 className="font-heading font-black text-white text-2xl md:text-3xl tracking-wider mb-2">
                        {event.title}
                    </h2>
                    <p className="text-gray-400 text-sm leading-relaxed mb-6">
                        {event.longDescription}
                    </p>

                    {/* Info grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                        {[
                            { icon: Users, label: "Team Size", value: event.teamSize },
                            { icon: Clock, label: "Duration", value: event.duration },
                            { icon: MapPin, label: "Venue", value: event.venue },
                            { icon: Trophy, label: "Prize", value: event.prize },
                        ].map(item => (
                            <div key={item.label} className="rounded-xl p-3 border border-white/[0.06]"
                                style={{ background: "rgba(255,255,255,0.03)" }}>
                                <item.icon className="w-4 h-4 text-accent/60 mb-1.5" />
                                <p className="text-[9px] text-gray-500 font-heading tracking-widest uppercase mb-0.5">{item.label}</p>
                                <p className="text-white text-xs font-medium">{item.value}</p>
                            </div>
                        ))}
                    </div>

                    {/* Rules */}
                    <div className="mb-6">
                        <h4 className="font-heading text-xs tracking-[0.2em] text-accent/70 uppercase mb-3">Rules & Guidelines</h4>
                        <ul className="space-y-2">
                            {event.rules.map((rule, i) => (
                                <li key={i} className="flex items-start gap-2.5 text-sm text-gray-400">
                                    <span className="w-5 h-5 rounded-full bg-accent/10 text-accent text-[9px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                                        {i + 1}
                                    </span>
                                    {rule}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <button className="btn-primary w-full py-3 text-center">
                        REGISTER NOW
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
}

export const EventsPage = () => {
    const [activeTab, setActiveTab] = useState<"all" | "tech" | "nontech">("all");
    const [selectedEvent, setSelectedEvent] = useState<EventDetail | null>(null);

    const events = activeTab === "tech" ? TECH_EVENTS : activeTab === "nontech" ? NON_TECH_EVENTS : ALL_EVENTS;

    return (
        <div className="min-h-screen pt-28 pb-20 px-6 md:px-12 lg:px-20">
            {/* Back to home */}
            <Link to="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-accent text-xs font-heading tracking-widest mb-8 transition-colors">
                <ArrowLeft className="w-4 h-4" /> BACK TO HOME
            </Link>

            {/* Page header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-10"
            >
                <span className="text-accent font-heading text-lg md:text-2xl font-bold tracking-wider block mb-1">
                    ALL
                </span>
                <h1 className="text-white font-heading text-4xl md:text-6xl font-black tracking-wider mb-4">
                    EVENTS
                </h1>
                <p className="text-gray-500 text-sm max-w-xl leading-relaxed">
                    Explore all technical and non-technical events at TechForte 2026. Click any event for full details, rules, and registration.
                </p>
            </motion.div>

            {/* Tab filter */}
            <div className="flex items-center gap-1 bg-white/[0.04] rounded-full p-1 border border-white/[0.06] w-fit mb-12">
                {([
                    { key: "all", label: "All Events", count: ALL_EVENTS.length },
                    { key: "tech", label: "Technical", count: TECH_EVENTS.length },
                    { key: "nontech", label: "Non-Technical", count: NON_TECH_EVENTS.length },
                ] as const).map(tab => (
                    <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        className={`relative px-5 py-2 text-xs font-heading font-medium tracking-wider rounded-full transition-colors duration-300
                            ${activeTab === tab.key ? "text-black" : "text-gray-400 hover:text-white"}`}
                    >
                        {activeTab === tab.key && (
                            <motion.div
                                layoutId="eventsPageTab"
                                className="absolute inset-0 bg-accent rounded-full shadow-[0_0_12px_rgba(0,255,255,0.4)]"
                                transition={{ type: "spring", stiffness: 380, damping: 30 }}
                            />
                        )}
                        <span className="relative z-10">{tab.label} ({tab.count})</span>
                    </button>
                ))}
            </div>

            {/* Events grid */}
            <motion.div
                key={activeTab}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
                {events.map(event => (
                    <EventCard key={event.id} event={event} onClick={() => setSelectedEvent(event)} />
                ))}
            </motion.div>

            {/* Modal */}
            <AnimatePresence>
                {selectedEvent && (
                    <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
                )}
            </AnimatePresence>
        </div>
    );
};
