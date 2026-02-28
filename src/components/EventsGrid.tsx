import { useState } from "react";
import { motion } from "framer-motion";

const EVENTS = [
    {
        id: 1,
        title: "ARMAGEDDON",
        description: "Combat robotics championship with custom bots. Inspired by Transformers, craft machines to defeat opponents. ARMAGEDDON showcases battles for glory. Build your champion.",
        categories: "Categories: 8kg, 15kg, 30kg.",
        prize: "PRIZES WORTH : 6,00,000",
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800",
        subImages: [
            "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=400",
            "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&q=80&w=400",
            "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=400",
        ],
        subTitles: ["NANO NAVIGATOR", "FLIGHTFURY", "SKY MANEUVER"]
    },
    {
        id: 2,
        title: "NANO NAVIGATOR",
        description: "Navigate tiny autonomous robots through precision obstacle courses. Test your micro-engineering skills in this technical challenge.",
        categories: "Solo and Team events available.",
        prize: "PRIZES WORTH : 2,00,000",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800",
        subImages: [],
        subTitles: []
    },
];

export const EventsGrid = () => {
    const [activeEvent, setActiveEvent] = useState(EVENTS[0]);

    return (
        <section id="events" className="py-20 relative">
            <div className="px-6 md:px-12">
                {/* Section header with divider line */}
                <div className="flex items-center gap-6 mb-16">
                    <motion.h2
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-accent font-heading text-3xl md:text-5xl font-black tracking-wider"
                    >
                        EVENTS
                    </motion.h2>
                    <div className="flex-1 h-px bg-gray-700"></div>
                    <span className="text-gray-600 text-xs font-heading tracking-[0.2em] hidden md:block">
                        TECHFORTE 2026
                    </span>
                </div>

                {/* Featured event layout */}
                <div className="flex flex-col lg:flex-row gap-10">
                    {/* Left - Event Info */}
                    <motion.div
                        key={activeEvent.id}
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="w-full lg:w-2/5 space-y-6"
                    >
                        <h3 className="text-4xl md:text-6xl font-heading font-black text-white tracking-wider">
                            {activeEvent.title}
                        </h3>
                        <div className="w-16 h-[3px] bg-accent"></div>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            {activeEvent.description} {activeEvent.categories}
                        </p>
                        <div className="bg-white text-black font-heading font-bold text-sm tracking-[0.1em] px-6 py-3 inline-block">
                            {activeEvent.prize}
                        </div>
                        <div>
                            <button className="btn-outline mt-4">
                                KNOW MORE
                            </button>
                        </div>
                    </motion.div>

                    {/* Right - Event Images */}
                    <div className="w-full lg:w-3/5">
                        <div className="flex gap-1 h-[300px] md:h-[400px]">
                            {/* Main large image */}
                            <div className="flex-1 relative overflow-hidden group cursor-pointer" onClick={() => setActiveEvent(EVENTS[0])}>
                                <img
                                    src={activeEvent.image}
                                    alt={activeEvent.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                                <h4 className="absolute bottom-4 left-4 font-heading font-bold text-xl tracking-wider text-white">
                                    {activeEvent.title}
                                </h4>
                            </div>

                            {/* Side thumbnails */}
                            {activeEvent.subImages.length > 0 && (
                                <div className="flex flex-col gap-1 w-1/4">
                                    {activeEvent.subImages.map((img, i) => (
                                        <div
                                            key={i}
                                            className="flex-1 relative overflow-hidden group cursor-pointer"
                                        >
                                            <img
                                                src={img}
                                                alt={activeEvent.subTitles[i]}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 grayscale group-hover:grayscale-0"
                                            />
                                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all"></div>
                                            <h5 className="absolute bottom-2 left-2 font-heading font-bold text-[10px] md:text-xs tracking-wider text-white">
                                                {activeEvent.subTitles[i]}
                                            </h5>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Explore All Events button */}
                <div className="flex justify-center mt-16">
                    <button className="btn-outline px-10">
                        EXPLORE ALL EVENTS
                    </button>
                </div>
            </div>
        </section>
    );
};
