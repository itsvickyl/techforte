import { motion } from "framer-motion";
import { Instagram, Facebook, Twitter, Linkedin } from "lucide-react";

export const Footer = () => {
    return (
        <footer className="relative overflow-hidden">

            {/* BOOK YOUR SLOTS NOW Section */}
            <section className="py-20 relative flex flex-col items-center justify-center min-h-[70vh]">


                {/* Main CTA Text */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mt-auto relative z-10"
                >
                    <h2 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-heading font-black text-white tracking-wider leading-none">
                        BOOK YOUR
                    </h2>
                    <h2 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-heading font-black tracking-wider leading-none">
                        <span className="text-white">SLOTS </span>
                        <span className="text-accent text-glow">NOW</span>
                    </h2>
                </motion.div>

                {/* Action buttons */}
                <div className="flex flex-col sm:flex-row items-center gap-4 mt-12 relative z-10">
                    <button className="px-8 py-3 border border-accent text-accent font-heading font-bold text-sm tracking-widest hover:bg-accent hover:text-black transition-all">
                        MAKE PAYMENT
                    </button>
                    <div className="flex items-center gap-4 px-6 py-3 bg-zinc-900/80 border border-gray-700">
                        <span className="text-gray-400 font-heading text-xs tracking-widest">CONTACT US ON:</span>
                        {[Instagram, Facebook, Twitter, Linkedin].map((Icon, i) => (
                            <a key={i} href="#" className="text-white hover:text-accent transition-colors">
                                <Icon size={18} />
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {/* Bottom Footer */}
            <div className="bg-black border-t border-gray-800 py-16 px-6 md:px-12">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12">

                    {/* Left - Brand */}
                    <div className="md:w-2/5 space-y-4">
                        <h3 className="font-heading text-xl font-bold tracking-wider">
                            <span className="text-white">TechForte 20</span>
                            <span className="text-accent">26</span>
                        </h3>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            TechForte, the annual technical fest, is an enthralling
                            kaleidoscope of internally invigorating events. It has something in store for all
                            and brings together renowned experts of various spheres of academic and the
                            corporate industry.
                        </p>
                    </div>

                    {/* Right - Link Columns */}
                    <div className="md:w-3/5 grid grid-cols-3 gap-8">
                        <div className="space-y-3">
                            <a href="#" className="block text-gray-300 text-sm hover:text-accent transition-colors">About Us</a>
                            <a href="#" className="block text-gray-300 text-sm hover:text-accent transition-colors">SPP</a>
                        </div>
                        <div className="space-y-3">
                            <a href="#" className="block text-gray-300 text-sm hover:text-accent transition-colors">Workshops</a>
                            <a href="#" className="block text-gray-300 text-sm hover:text-accent transition-colors">Guest Lectures</a>
                        </div>
                        <div className="space-y-3">
                            <a href="#" className="block text-gray-300 text-sm hover:text-accent transition-colors">Events</a>
                            <a href="#" className="block text-gray-300 text-sm hover:text-accent transition-colors">Gallery</a>
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="max-w-6xl mx-auto mt-12 pt-6 border-t border-accent/30 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="flex gap-4 text-sm">
                        <a href="#" className="text-accent hover:text-white transition-colors">Terms and Conditions</a>
                        <a href="#" className="text-accent hover:text-white transition-colors">Policies</a>
                    </div>
                    <p className="text-gray-500 text-xs">@TechForte2026. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};
