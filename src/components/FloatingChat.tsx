import { useState } from "react";
import { Bot, X, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const FloatingChat = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Floating Button */}
            <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20, delay: 1 }}
                onClick={() => setIsOpen(true)}
                className={`fixed bottom-8 right-8 z-50 w-14 h-14 rounded-full bg-accent flex items-center justify-center text-black shadow-[0_0_20px_rgba(0,255,255,0.6)] hover:scale-110 transition-transform ${isOpen ? "hidden" : "flex"}`}
            >
                <Bot size={28} />
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                        className="fixed bottom-24 right-4 md:right-8 z-50 w-[350px] h-[450px] bg-black border border-accent/30 rounded-2xl shadow-neon overflow-hidden flex flex-col"
                    >
                        {/* Header */}
                        <div className="bg-zinc-900 p-4 border-b border-accent/20 flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center border border-accent text-accent">
                                    <Bot size={18} />
                                </div>
                                <div>
                                    <h4 className="font-heading font-bold text-white tracking-wide text-sm">TECHFORTE AI</h4>
                                    <span className="text-xs text-green-400 flex items-center gap-1">
                                        <span className="w-2 h-2 rounded-full bg-green-400"></span> Online
                                    </span>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-gray-400 hover:text-white transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Messages Area - Mockup */}
                        <div className="flex-1 p-4 overflow-y-auto space-y-4">
                            <div className="flex gap-2">
                                <div className="w-6 h-6 rounded-full bg-accent text-black flex items-center justify-center mt-1 shrink-0">
                                    <Bot size={14} />
                                </div>
                                <div className="bg-zinc-900 text-sm text-gray-200 p-3 rounded-lg rounded-tl-none border border-zinc-800">
                                    Hello! I'm your TechForte assistant. How can I help you today?
                                </div>
                            </div>
                        </div>

                        {/* Input Area */}
                        <div className="p-3 border-t border-accent/20 bg-zinc-900 flex gap-2">
                            <input
                                type="text"
                                placeholder="Type your message..."
                                className="flex-1 bg-black border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-accent"
                            />
                            <button className="w-10 h-10 rounded-lg bg-accent text-black flex items-center justify-center hover:bg-white transition-colors">
                                <Send size={18} />
                            </button>
                        </div>

                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
