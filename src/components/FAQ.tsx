import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FAQS = [
    {
        question: "What is TechForte?",
        answer: "TechForte is the annual technical festival featuring competitions, workshops, guest lectures, and entertainment events."
    },
    {
        question: "What is a Pronite?",
        answer: "A Pronite is a professional night event featuring famous artists and performers. These are the highlight entertainment events of the festival."
    },
    {
        question: "How to register for TechForte 2026?",
        answer: "You can register via our official website. Create an account, browse events, and purchase your festival pass to get started."
    },
    {
        question: "What is included in the CLASSIC Pass?",
        answer: "The CLASSIC Pass includes access to all main events, workshops, guest lectures, and one pronite. Premium passes unlock additional perks."
    },
    {
        question: "How to register for Events in TechForte 2026?",
        answer: "After purchasing your festival pass, log in to your dashboard, navigate to the Events section, and register for individual events of your choice."
    }
];

export const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    return (
        <section id="faq" className="py-20 relative min-h-screen flex flex-col items-center justify-center overflow-hidden">


            {/* FAQS Title */}
            <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-5xl md:text-7xl font-heading font-black text-accent text-glow tracking-widest mb-12 relative z-10"
            >
                FAQS
            </motion.h2>

            {/* FAQ Items */}
            <div className="relative z-10 w-full max-w-3xl mx-auto px-6">
                {FAQS.map((faq, index) => (
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        key={index}
                        className="border-b border-gray-700/50"
                    >
                        <button
                            className="w-full py-6 flex justify-between items-center text-left focus:outline-none group"
                            onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                        >
                            <div className="flex items-center gap-4">
                                <span className="text-gray-500 font-heading text-sm">{index + 1}.</span>
                                <span className="text-accent text-sm md:text-base font-medium hover:text-white transition-colors">
                                    {faq.question}
                                </span>
                            </div>
                            <span className={`text-gray-500 text-xl transition-transform duration-300 ${activeIndex === index ? "rotate-45" : ""}`}>
                                +
                            </span>
                        </button>

                        <AnimatePresence>
                            {activeIndex === index && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="pb-6 pl-10 text-gray-400 text-sm leading-relaxed">
                                        {faq.answer}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};
