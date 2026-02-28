import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, MapPin, CalendarDays } from "lucide-react";
import { Link } from "react-router-dom";

interface TimelineEvent {
    time: string;
    title: string;
    description: string;
    venue: string;
    day: 1 | 2;
    type: "tech" | "nontech" | "general";
}

const TIMELINE: TimelineEvent[] = [
    // Day 1
    { time: "08:00 AM", title: "Registration & Check-in", description: "Collect your badges, welcome kits, and get oriented with the campus map.", venue: "Main Gate", day: 1, type: "general" },
    { time: "09:00 AM", title: "Inauguration Ceremony", description: "Opening address by Chief Guest, lamp lighting, and keynote speech on the future of technology.", venue: "Main Auditorium", day: 1, type: "general" },
    { time: "10:00 AM", title: "SHIFT-CODE Hackathon Begins", description: "24-hour hackathon kicks off. Teams receive problem statements and begin building.", venue: "Lab Block – Floor 3", day: 1, type: "tech" },
    { time: "10:30 AM", title: "FOCAL POINT — IT Quiz", description: "Preliminary round of the IT Quiz. Top 8 teams advance to the buzzer round.", venue: "Seminar Hall A", day: 1, type: "tech" },
    { time: "11:30 AM", title: "PARALLAX PARADOX — Treasure Hunt", description: "Campus-wide treasure hunt begins. Decode clues, race to checkpoints.", venue: "Entire Campus", day: 1, type: "nontech" },
    { time: "01:00 PM", title: "Lunch Break", description: "Food court opens with multiple cuisines. Networking zone active.", venue: "Cafeteria & Grounds", day: 1, type: "general" },
    { time: "02:00 PM", title: "LAYERED LOGIC — Web Design", description: "Spot theme revealed. Participants start designing responsive websites from scratch.", venue: "Computer Lab 2", day: 1, type: "tech" },
    { time: "02:30 PM", title: "CROSS-SIGHT — Gaming Tournament", description: "Valorant & COD tournament begins. Group stage matches throughout the afternoon.", venue: "Gaming Arena", day: 1, type: "nontech" },
    { time: "04:00 PM", title: "MULTI-FRAME — Ad Creation", description: "Product assigned. Teams begin crafting their 60-second advertisements.", venue: "Media Lab", day: 1, type: "nontech" },
    { time: "06:00 PM", title: "Cultural Evening & DJ Night", description: "Live performances, band show, and DJ night to close Day 1 with energy.", venue: "Open Air Theatre", day: 1, type: "general" },

    // Day 2
    { time: "09:00 AM", title: "Day 2 Kicks Off", description: "Quick recap, leaderboard update, and Day 2 schedule briefing.", venue: "Main Auditorium", day: 2, type: "general" },
    { time: "09:30 AM", title: "THE VANTAGE — IT Manager", description: "Three-round event begins: Aptitude, Case Study, and HR Interview.", venue: "Conference Room B", day: 2, type: "tech" },
    { time: "10:00 AM", title: "SHIFT-CODE Hackathon Ends", description: "24-hour mark. Final submissions due. Judging begins.", venue: "Lab Block – Floor 3", day: 2, type: "tech" },
    { time: "10:30 AM", title: "REFRACTION — Data Viz Challenge", description: "Raw datasets distributed. Teams clean, analyze, and visualize.", venue: "Data Lab", day: 2, type: "tech" },
    { time: "11:00 AM", title: "DEPTH MOTION — FIFA Tournament", description: "1v1 FIFA knockout matches on PS5. Console gaming at its finest.", venue: "Gaming Arena", day: 2, type: "nontech" },
    { time: "12:00 PM", title: "OPTICAL FLARE — Marketing Challenge", description: "Teams craft viral marketing campaigns. Social reach tracking begins.", venue: "Creativity Hub", day: 2, type: "nontech" },
    { time: "01:00 PM", title: "Lunch Break", description: "Final networking session. Photo booth and merch stall active.", venue: "Cafeteria & Grounds", day: 2, type: "general" },
    { time: "02:00 PM", title: "PARALLAX SHIFT — Surprise Event", description: "The mystery event is revealed. Rules announced on the spot.", venue: "Main Auditorium", day: 2, type: "nontech" },
    { time: "03:30 PM", title: "Hackathon Demo & Judging", description: "Top teams present their projects to the panel. Q&A and scoring.", venue: "Seminar Hall A", day: 2, type: "tech" },
    { time: "05:00 PM", title: "Valedictory & Prize Distribution", description: "Winners announced across all events. Trophies, certificates, and cash prizes awarded.", venue: "Main Auditorium", day: 2, type: "general" },
];

const typeColors = {
    tech: { bg: "bg-accent/10", text: "text-accent", border: "border-accent/20", dot: "bg-accent" },
    nontech: { bg: "bg-purple-500/10", text: "text-purple-400", border: "border-purple-500/20", dot: "bg-purple-400" },
    general: { bg: "bg-amber-500/10", text: "text-amber-400", border: "border-amber-500/20", dot: "bg-amber-400" },
};

export const TimelinePage = () => {
    const [activeDay, setActiveDay] = useState<1 | 2>(1);
    const dayEvents = TIMELINE.filter(e => e.day === activeDay);

    return (
        <div className="min-h-screen pt-28 pb-20 px-6 md:px-12 lg:px-20">
            <Link to="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-accent text-xs font-heading tracking-widest mb-8 transition-colors">
                <ArrowLeft className="w-4 h-4" /> BACK TO HOME
            </Link>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
                <span className="text-accent font-heading text-lg md:text-2xl font-bold tracking-wider block mb-1">EVENT</span>
                <h1 className="text-white font-heading text-4xl md:text-6xl font-black tracking-wider mb-4">TIMELINE</h1>
                <p className="text-gray-500 text-sm max-w-xl leading-relaxed">
                    Two power-packed days of technical events, gaming tournaments, creative challenges, and cultural festivities. Here's the complete schedule.
                </p>
            </motion.div>

            {/* Day switcher */}
            <div className="flex items-center gap-1 bg-white/[0.04] rounded-full p-1 border border-white/[0.06] w-fit mb-12">
                {([1, 2] as const).map(day => (
                    <button
                        key={day}
                        onClick={() => setActiveDay(day)}
                        className={`relative px-6 py-2 text-xs font-heading font-medium tracking-wider rounded-full transition-colors duration-300
                            ${activeDay === day ? "text-black" : "text-gray-400 hover:text-white"}`}
                    >
                        {activeDay === day && (
                            <motion.div
                                layoutId="timelineDay"
                                className="absolute inset-0 bg-accent rounded-full shadow-[0_0_12px_rgba(0,255,255,0.4)]"
                                transition={{ type: "spring", stiffness: 380, damping: 30 }}
                            />
                        )}
                        <span className="relative z-10 flex items-center gap-2">
                            <CalendarDays className="w-3.5 h-3.5" />
                            Day {day} — March {15 + day}, 2026
                        </span>
                    </button>
                ))}
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-4 mb-8">
                {Object.entries(typeColors).map(([key, colors]) => (
                    <span key={key} className="flex items-center gap-2 text-[10px] font-heading tracking-widest uppercase text-gray-500">
                        <span className={`w-2 h-2 rounded-full ${colors.dot}`} />
                        {key === "tech" ? "Technical" : key === "nontech" ? "Non-Technical" : "General"}
                    </span>
                ))}
            </div>

            {/* Timeline */}
            <motion.div key={activeDay} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}
                className="relative"
            >
                {/* Vertical line */}
                <div className="absolute left-[60px] md:left-[80px] top-0 bottom-0 w-px bg-white/[0.06]" />

                <div className="space-y-1">
                    {dayEvents.map((event, i) => {
                        const colors = typeColors[event.type];
                        return (
                            <motion.div
                                key={`${activeDay}-${i}`}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                                className="flex gap-4 md:gap-6 group"
                            >
                                {/* Time */}
                                <div className="w-[52px] md:w-[68px] flex-shrink-0 text-right pt-5">
                                    <span className="text-[10px] md:text-xs font-heading text-gray-500 tracking-wide">{event.time}</span>
                                </div>

                                {/* Dot */}
                                <div className="relative flex-shrink-0 pt-5">
                                    <div className={`w-3 h-3 rounded-full ${colors.dot} border-2 border-black shadow-[0_0_8px_rgba(0,255,255,0.3)] z-10 relative
                                        group-hover:scale-125 transition-transform`} />
                                </div>

                                {/* Card */}
                                <div className="flex-1 rounded-xl p-5 mb-3 border border-white/[0.06] group-hover:border-accent/15 transition-all duration-500"
                                    style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(0,255,255,0.01) 100%)", backdropFilter: "blur(12px)" }}
                                >
                                    <div className="flex items-start justify-between gap-3 mb-2">
                                        <h3 className="font-heading font-bold text-white text-sm md:text-base tracking-wider group-hover:text-accent transition-colors">
                                            {event.title}
                                        </h3>
                                        <span className={`flex-shrink-0 px-2.5 py-0.5 text-[8px] font-heading font-bold tracking-[0.15em] uppercase rounded-full border ${colors.bg} ${colors.text} ${colors.border}`}>
                                            {event.type === "tech" ? "TECH" : event.type === "nontech" ? "NON-TECH" : "GENERAL"}
                                        </span>
                                    </div>
                                    <p className="text-gray-400 text-xs leading-relaxed mb-2">{event.description}</p>
                                    <div className="flex items-center gap-3">
                                        <span className="flex items-center gap-1 text-[10px] text-gray-600">
                                            <MapPin className="w-3 h-3" /> {event.venue}
                                        </span>
                                        <span className="flex items-center gap-1 text-[10px] text-gray-600">
                                            <Clock className="w-3 h-3" /> {event.time}
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </motion.div>
        </div>
    );
};
