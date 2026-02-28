import { motion } from "framer-motion";

const PERFORMERS = [
    { id: 1, name: "KK", role: "MUSIC ARTIST", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa44?auto=format&fit=crop&q=80&w=600" },
    { id: 2, name: "DJ HOLY C", role: "MUSIC ARTIST", image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=600" },
    { id: 3, name: "ZAKIR KHAN", role: "STAND-UP COMEDIAN", image: "https://images.unsplash.com/photo-1585699324551-f6c309eedeca?auto=format&fit=crop&q=80&w=600" },
    { id: 4, name: "RAHUL DUA", role: "STAND-UP COMEDIAN", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600" },
    { id: 5, name: "SACHIN-JIGAR", role: "MUSIC ARTIST", image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=600" },
    { id: 6, name: "OLLY", role: "MUSIC ARTIST", image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=600" },
];

export const PerformersCarousel = () => {
    return (
        <section className="py-20 relative overflow-hidden">
            <div className="px-6 md:px-12 mb-12">
                {/* Section header with divider line */}
                <div className="flex items-end gap-6">
                    <div>
                        <motion.span
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="text-accent font-heading text-3xl md:text-5xl font-bold tracking-wider block"
                        >
                            PAST
                        </motion.span>
                        <motion.span
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-white font-heading text-4xl md:text-6xl font-black tracking-wider block"
                        >
                            PERFORMERS
                        </motion.span>
                    </div>
                    <div className="flex-1 h-px bg-gray-700 mb-4"></div>
                    <span className="text-gray-600 text-xs font-heading tracking-[0.2em] mb-4 hidden md:block">
                        TECHFORTE 2026
                    </span>
                </div>
            </div>

            {/* Dotted snake path SVG */}
            <div className="relative">
                <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-10 opacity-40" viewBox="0 0 1400 400">
                    <path
                        d="M 100,50 Q 300,100 400,200 Q 500,300 700,250 Q 900,200 1000,100 Q 1100,0 1300,50"
                        fill="none"
                        stroke="white"
                        strokeWidth="2"
                        strokeDasharray="6,6"
                    />
                </svg>

                {/* Cards horizontal scroll */}
                <div className="flex gap-6 px-6 md:px-12 overflow-x-auto pb-8 scrollbar-hide">
                    {PERFORMERS.map((performer) => (
                        <motion.div
                            key={performer.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="group relative min-w-[200px] md:min-w-[240px] h-[300px] md:h-[380px] transform skew-x-[-3deg] overflow-hidden flex-shrink-0"
                        >
                            {/* Image */}
                            <img
                                src={performer.image}
                                alt={performer.name}
                                className="w-full h-full object-cover transform skew-x-[3deg] scale-110 group-hover:scale-125 transition-transform duration-700"
                            />

                            {/* Gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent skew-x-[3deg]"></div>

                            {/* Label at bottom - metallic-looking tag */}
                            <div className="absolute bottom-4 left-4 right-4 z-10">
                                <div className="bg-gradient-to-r from-gray-700/90 to-gray-800/90 backdrop-blur-sm px-4 py-3 skew-x-[3deg] border-t border-gray-600/50">
                                    <p className="text-gray-400 text-[10px] font-heading tracking-[0.2em] uppercase">{performer.role}</p>
                                    <p className="text-white font-heading font-bold text-sm md:text-base tracking-wider">{performer.name}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
