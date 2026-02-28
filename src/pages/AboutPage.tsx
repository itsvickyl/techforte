import { motion } from "framer-motion";
import { ArrowLeft, Users, Calendar, MapPin, Zap, Award, Globe } from "lucide-react";
import { Link } from "react-router-dom";

const STATS = [
    { label: "Events", value: "11+", icon: Zap },
    { label: "Participants", value: "2000+", icon: Users },
    { label: "Colleges", value: "50+", icon: Globe },
    { label: "Prize Pool", value: "₹2L+", icon: Award },
];

const TEAM = [
    { name: "Arjun Mehta", role: "Fest Coordinator", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200" },
    { name: "Priya Sharma", role: "Technical Head", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200&h=200" },
    { name: "Rahul Nair", role: "Events Lead", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200&h=200" },
    { name: "Sneha Reddy", role: "Marketing Head", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200&h=200" },
    { name: "Vikram Das", role: "Sponsorship Lead", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200&h=200" },
    { name: "Ananya Iyer", role: "Design Head", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200&h=200" },
];

const fadeUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 },
};

export const AboutPage = () => {
    return (
        <div className="min-h-screen pt-28 pb-20 px-6 md:px-12 lg:px-20">
            <Link to="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-accent text-xs font-heading tracking-widest mb-8 transition-colors">
                <ArrowLeft className="w-4 h-4" /> BACK TO HOME
            </Link>

            {/* Hero */}
            <motion.div {...fadeUp} className="mb-16">
                <span className="text-accent font-heading text-lg md:text-2xl font-bold tracking-wider block mb-1">ABOUT</span>
                <h1 className="text-white font-heading text-4xl md:text-6xl font-black tracking-wider mb-6">TECHFORTE 2026</h1>
                <p className="text-gray-400 text-base md:text-lg max-w-3xl leading-relaxed">
                    TechForte is the annual inter-collegiate technical and cultural fest organized by the Department of Computer Science at
                    MCC Bengaluru. Now in its 5th edition, TechForte has grown into one of Bengaluru's most anticipated college events —
                    a two-day extravaganza blending technology, creativity, and competitive spirit.
                </p>
            </motion.div>

            {/* Stats */}
            <motion.div {...fadeUp} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
                {STATS.map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="rounded-2xl p-6 border border-white/[0.06] text-center group hover:border-accent/20 transition-all duration-500"
                        style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(0,255,255,0.02) 100%)", backdropFilter: "blur(12px)" }}
                    >
                        <stat.icon className="w-6 h-6 text-accent/50 mx-auto mb-3 group-hover:text-accent transition-colors" />
                        <p className="font-heading font-black text-3xl md:text-4xl text-white mb-1">{stat.value}</p>
                        <p className="text-gray-500 text-xs font-heading tracking-[0.15em] uppercase">{stat.label}</p>
                    </motion.div>
                ))}
            </motion.div>

            {/* Mission & Vision */}
            <div className="grid md:grid-cols-2 gap-6 mb-20">
                <motion.div {...fadeUp}
                    className="rounded-2xl p-8 border border-white/[0.06]"
                    style={{ background: "linear-gradient(135deg, rgba(0,255,255,0.04) 0%, rgba(255,255,255,0.02) 100%)", backdropFilter: "blur(12px)" }}
                >
                    <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                        <Zap className="w-5 h-5 text-accent" />
                    </div>
                    <h3 className="font-heading font-black text-white text-xl tracking-wider mb-3">OUR MISSION</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        To create a platform where students from diverse backgrounds can showcase their technical prowess,
                        creative thinking, and leadership skills. We believe in learning beyond classrooms — through competition,
                        collaboration, and community.
                    </p>
                </motion.div>
                <motion.div {...fadeUp}
                    className="rounded-2xl p-8 border border-white/[0.06]"
                    style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(0,255,255,0.03) 100%)", backdropFilter: "blur(12px)" }}
                >
                    <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                        <Globe className="w-5 h-5 text-accent" />
                    </div>
                    <h3 className="font-heading font-black text-white text-xl tracking-wider mb-3">OUR VISION</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        To be recognized as Bengaluru's premier student-run tech fest — a launchpad for innovation, a meeting
                        ground for future leaders, and a celebration of everything that makes technology exciting. We aim to
                        inspire the next generation of builders, thinkers, and creators.
                    </p>
                </motion.div>
            </div>

            {/* Venue */}
            <motion.div {...fadeUp} className="rounded-2xl p-8 border border-white/[0.06] mb-20"
                style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(0,255,255,0.02) 100%)", backdropFilter: "blur(12px)" }}
            >
                <div className="flex items-center gap-3 mb-4">
                    <MapPin className="w-5 h-5 text-accent" />
                    <h3 className="font-heading font-black text-white text-xl tracking-wider">VENUE</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <p className="text-white text-lg font-medium mb-2">MCC Bengaluru</p>
                        <p className="text-gray-400 text-sm leading-relaxed mb-4">
                            MCC (Mount Carmel College) Bengaluru, situated in the heart of the city on Palace Road,
                            is one of India's premier educational institutions. The fest takes place across multiple
                            venues within the sprawling campus — from state-of-the-art computer labs to the grand auditorium.
                        </p>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Calendar className="w-4 h-4 text-accent/60" />
                            <span>March 16–17, 2026</span>
                        </div>
                    </div>
                    <div className="rounded-xl overflow-hidden border border-white/[0.06] h-[200px]">
                        <img
                            src="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=600"
                            alt="Campus"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </motion.div>

            {/* Team */}
            <motion.div {...fadeUp} className="mb-8">
                <span className="text-accent font-heading text-sm tracking-[0.2em] block mb-2">THE PEOPLE BEHIND</span>
                <h2 className="font-heading font-black text-white text-3xl md:text-4xl tracking-wider mb-8">OUR TEAM</h2>
            </motion.div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {TEAM.map((member, i) => (
                    <motion.div
                        key={member.name}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.08 }}
                        className="rounded-2xl p-4 border border-white/[0.06] text-center group hover:border-accent/20 transition-all duration-500"
                        style={{ background: "rgba(255,255,255,0.03)", backdropFilter: "blur(12px)" }}
                    >
                        <div className="w-16 h-16 mx-auto mb-3 rounded-full overflow-hidden border-2 border-white/[0.08] group-hover:border-accent/30 transition-colors">
                            <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                        </div>
                        <p className="text-white text-xs font-medium mb-0.5">{member.name}</p>
                        <p className="text-gray-500 text-[10px] font-heading tracking-widest uppercase">{member.role}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};
