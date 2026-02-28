import { motion } from "framer-motion";

const SPONSORS = [
    {
        name: "Royal Enfield",
        logo: "https://upload.wikimedia.org/wikipedia/en/thumb/2/2b/Royal_Enfield_logo.svg/1200px-Royal_Enfield_logo.svg.png",
    },
    {
        name: "Red Bull",
        logo: "https://upload.wikimedia.org/wikipedia/en/thumb/f/f5/Red_Bull.svg/500px-Red_Bull.svg.png",
    },
];

// Duplicate array for seamless infinite scroll
const SCROLL_ROW = [...SPONSORS, ...SPONSORS, ...SPONSORS, ...SPONSORS];

export const SponsorsSection = () => {
    return (
        <section className="py-20 relative overflow-hidden">
            <div className="px-6 md:px-12 mb-14">
                {/* Section header */}
                <div className="flex items-end gap-6">
                    <div>
                        <motion.span
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="text-accent font-heading text-lg md:text-2xl font-bold tracking-wider block"
                        >
                            OUR
                        </motion.span>
                        <motion.span
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-white font-heading text-3xl md:text-5xl font-black tracking-wider block"
                        >
                            SPONSORS
                        </motion.span>
                    </div>
                    <div className="flex-1 h-px bg-gray-700 mb-4"></div>
                    <span className="text-gray-600 text-xs font-heading tracking-[0.2em] mb-4 hidden md:block">
                        TECHFORTE 2026
                    </span>
                </div>
            </div>

            {/* Marquee row 1 — scrolls left */}
            <div className="relative mb-4 group">
                {/* Fade edges */}
                <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 z-10 bg-gradient-to-r from-black to-transparent pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 z-10 bg-gradient-to-l from-black to-transparent pointer-events-none" />

                <div
                    className="flex gap-6 md:gap-8 group-hover:[animation-play-state:paused]"
                    style={{
                        animation: "sponsor-scroll 20s linear infinite",
                        width: "max-content",
                    }}
                >
                    {SCROLL_ROW.map((sponsor, i) => (
                        <div
                            key={`row1-${i}`}
                            className="flex-shrink-0 w-[220px] md:w-[280px] h-[100px] md:h-[120px] rounded-2xl flex items-center justify-center px-8
                                border border-white/[0.06] transition-all duration-500
                                hover:border-accent/30 hover:shadow-[0_0_25px_rgba(0,255,255,0.08)]"
                            style={{
                                background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(0,255,255,0.02) 100%)",
                                backdropFilter: "blur(12px)",
                                WebkitBackdropFilter: "blur(12px)",
                            }}
                        >
                            <img
                                src={sponsor.logo}
                                alt={sponsor.name}
                                className="max-h-[50px] md:max-h-[60px] w-auto object-contain brightness-0 invert opacity-70 hover:opacity-100 transition-opacity"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Marquee row 2 — scrolls right */}
            <div className="relative group">
                <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 z-10 bg-gradient-to-r from-black to-transparent pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 z-10 bg-gradient-to-l from-black to-transparent pointer-events-none" />

                <div
                    className="flex gap-6 md:gap-8 group-hover:[animation-play-state:paused]"
                    style={{
                        animation: "sponsor-scroll-reverse 25s linear infinite",
                        width: "max-content",
                    }}
                >
                    {SCROLL_ROW.map((sponsor, i) => (
                        <div
                            key={`row2-${i}`}
                            className="flex-shrink-0 w-[220px] md:w-[280px] h-[100px] md:h-[120px] rounded-2xl flex items-center justify-center px-8
                                border border-white/[0.06] transition-all duration-500
                                hover:border-accent/30 hover:shadow-[0_0_25px_rgba(0,255,255,0.08)]"
                            style={{
                                background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(0,255,255,0.02) 100%)",
                                backdropFilter: "blur(12px)",
                                WebkitBackdropFilter: "blur(12px)",
                            }}
                        >
                            <img
                                src={sponsor.logo}
                                alt={sponsor.name}
                                className="max-h-[50px] md:max-h-[60px] w-auto object-contain brightness-0 invert opacity-70 hover:opacity-100 transition-opacity"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* CSS keyframes for marquee */}
            <style>{`
                @keyframes sponsor-scroll {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                @keyframes sponsor-scroll-reverse {
                    0% { transform: translateX(-50%); }
                    100% { transform: translateX(0); }
                }
            `}</style>
        </section>
    );
};
