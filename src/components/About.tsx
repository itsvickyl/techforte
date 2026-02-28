import { motion } from "framer-motion";

export const About = () => {
    return (
        <section id="about" className="py-20 relative overflow-hidden">
            {/* Large ABOUT US heading - outlined style like original */}
            <div className="container mx-auto px-6 md:px-12">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center text-5xl md:text-7xl lg:text-8xl font-heading font-black text-accent text-glow tracking-widest mb-20"
                >
                    ABOUT US
                </motion.h2>
            </div>

            <div className="container mx-auto px-6 md:px-12">
                <div className="flex flex-col lg:flex-row gap-16 items-start">

                    {/* Left Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="w-full lg:w-1/2 space-y-10"
                    >
                        {/* Sub section 1 */}
                        <div>
                            <p className="text-gray-500 text-xs font-heading tracking-[0.3em] uppercase mb-2">
                                MOUNT CARMEL COLLEGE
                            </p>
                            <h3 className="text-3xl md:text-4xl font-heading font-bold text-white mb-3 tracking-wider">
                                TECHFORTE'2026
                            </h3>
                            <div className="w-16 h-[3px] bg-accent mb-6"></div>
                            <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                                TechForte, the conjugation of the finest technical minds of the country is the annual technical fest.
                                It is a platform for your ideas to speak out loud and to promote the skills aiming to reach the
                                pinnacle of your mind.
                            </p>
                        </div>

                        {/* Sub section 2 */}
                        <div>
                            <h3 className="text-xl md:text-2xl font-heading font-bold text-white mb-3 tracking-wider underline underline-offset-4 decoration-accent">
                                EMPYREAN TECHNOGENESIS
                            </h3>
                            <div className="w-16 h-[3px] bg-accent mb-6"></div>
                            <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                                Empyrean Technogenesis represents the rise of technology to its highest realm—where innovation is
                                born, evolves, and transcends limits. It symbolizes the fusion of human intellect and advanced systems,
                                shaping a future driven by limitless progress and elevated intelligence.
                            </p>
                        </div>
                    </motion.div>

                    {/* Right side — spacer for visual balance */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="w-full lg:w-3/5 flex justify-center items-center relative h-[400px] md:h-[600px]"
                    >
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
