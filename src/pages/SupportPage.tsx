import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Mail, Phone, MapPin, Send, MessageSquare, HelpCircle, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

const FAQS = [
    { q: "How do I register for events?", a: "You can register for events through our official website. Click the 'Register Now' button on any event page. You'll receive a confirmation email with your event pass and QR code." },
    { q: "Can I participate in multiple events?", a: "Yes! You can participate in as many events as you'd like, as long as the timings don't overlap. Check the Timeline page to plan your schedule." },
    { q: "Is accommodation provided for outstation participants?", a: "We do not provide accommodation directly, but we have partnered with nearby hostels and hotels that offer discounted rates for TechForte participants. Contact us for details." },
    { q: "What should I bring to the fest?", a: "Carry your college ID, TechForte registration confirmation, laptop (for tech events), charger, and any personal peripherals you prefer for gaming events." },
    { q: "Is there a refund policy?", a: "Registration fees are non-refundable once confirmed. However, you may transfer your registration to another participant from the same college by contacting us at least 48 hours before the event." },
    { q: "Can we form inter-college teams?", a: "Yes, inter-college teams are allowed for most events unless specifically stated otherwise in the event rules. Check individual event guidelines for details." },
    { q: "Are there any age restrictions?", a: "TechForte is open to all college students (undergraduate and postgraduate). You must present a valid college ID to participate." },
    { q: "Will certificates be provided?", a: "Yes, participation certificates will be provided to all registered participants. Winners receive trophies, cash prizes, and winner certificates." },
];

const CONTACTS = [
    { name: "Arjun Mehta", role: "Fest Coordinator", phone: "+91 98765 43210", email: "arjun@techforte.in" },
    { name: "Priya Sharma", role: "Technical Head", phone: "+91 98765 43211", email: "priya@techforte.in" },
    { name: "Rahul Nair", role: "Events Lead", phone: "+91 98765 43212", email: "rahul@techforte.in" },
];

function FAQItem({ faq, index }: { faq: typeof FAQS[0]; index: number }) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.06 }}
            className={`rounded-xl border transition-all duration-300 cursor-pointer
                ${isOpen ? "border-accent/20 shadow-[0_0_15px_rgba(0,255,255,0.05)]" : "border-white/[0.06] hover:border-white/[0.1]"}`}
            style={{ background: "rgba(255,255,255,0.025)", backdropFilter: "blur(12px)" }}
            onClick={() => setIsOpen(!isOpen)}
        >
            <div className="flex items-center gap-3 p-4">
                <HelpCircle className={`w-4 h-4 flex-shrink-0 transition-colors ${isOpen ? "text-accent" : "text-gray-600"}`} />
                <p className={`text-sm font-medium flex-1 transition-colors ${isOpen ? "text-white" : "text-gray-300"}`}>{faq.q}</p>
                <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                </motion.div>
            </div>
            {isOpen && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="px-4 pb-4 pl-11">
                    <p className="text-gray-400 text-xs leading-relaxed">{faq.a}</p>
                </motion.div>
            )}
        </motion.div>
    );
}

export const SupportPage = () => {
    const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert("Message sent! We'll get back to you within 24 hours.");
        setFormData({ name: "", email: "", subject: "", message: "" });
    };

    return (
        <div className="min-h-screen pt-28 pb-20 px-6 md:px-12 lg:px-20">
            <Link to="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-accent text-xs font-heading tracking-widest mb-8 transition-colors">
                <ArrowLeft className="w-4 h-4" /> BACK TO HOME
            </Link>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
                <span className="text-accent font-heading text-lg md:text-2xl font-bold tracking-wider block mb-1">GET IN TOUCH</span>
                <h1 className="text-white font-heading text-4xl md:text-6xl font-black tracking-wider mb-4">SUPPORT</h1>
                <p className="text-gray-500 text-sm max-w-xl leading-relaxed">
                    Have a question, complaint, or suggestion? Reach out to us — we're here to help and we respond fast.
                </p>
            </motion.div>

            <div className="grid lg:grid-cols-[1fr_1.2fr] gap-10 mb-20">
                {/* Contact info */}
                <div className="space-y-4">
                    {/* Email card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                        className="rounded-2xl p-6 border border-white/[0.06] group hover:border-accent/20 transition-all duration-500"
                        style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(0,255,255,0.02) 100%)", backdropFilter: "blur(12px)" }}
                    >
                        <Mail className="w-5 h-5 text-accent/60 mb-3" />
                        <p className="text-[10px] text-gray-500 font-heading tracking-widest uppercase mb-1">EMAIL US</p>
                        <a href="mailto:hello@techforte.in" className="text-white text-sm hover:text-accent transition-colors">hello@techforte.in</a>
                    </motion.div>

                    {/* Phone card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
                        className="rounded-2xl p-6 border border-white/[0.06] group hover:border-accent/20 transition-all duration-500"
                        style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(0,255,255,0.02) 100%)", backdropFilter: "blur(12px)" }}
                    >
                        <Phone className="w-5 h-5 text-accent/60 mb-3" />
                        <p className="text-[10px] text-gray-500 font-heading tracking-widest uppercase mb-1">CALL US</p>
                        <a href="tel:+919876543210" className="text-white text-sm hover:text-accent transition-colors">+91 98765 43210</a>
                    </motion.div>

                    {/* Address card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
                        className="rounded-2xl p-6 border border-white/[0.06] group hover:border-accent/20 transition-all duration-500"
                        style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(0,255,255,0.02) 100%)", backdropFilter: "blur(12px)" }}
                    >
                        <MapPin className="w-5 h-5 text-accent/60 mb-3" />
                        <p className="text-[10px] text-gray-500 font-heading tracking-widest uppercase mb-1">VISIT US</p>
                        <p className="text-white text-sm">MCC Bengaluru, Palace Road, Bengaluru 560052</p>
                    </motion.div>

                    {/* Key contacts */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
                        className="rounded-2xl p-6 border border-white/[0.06]"
                        style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(0,255,255,0.02) 100%)", backdropFilter: "blur(12px)" }}
                    >
                        <MessageSquare className="w-5 h-5 text-accent/60 mb-3" />
                        <p className="text-[10px] text-gray-500 font-heading tracking-widest uppercase mb-3">KEY CONTACTS</p>
                        <div className="space-y-3">
                            {CONTACTS.map(c => (
                                <div key={c.name} className="flex items-center justify-between">
                                    <div>
                                        <p className="text-white text-xs font-medium">{c.name}</p>
                                        <p className="text-gray-500 text-[10px]">{c.role}</p>
                                    </div>
                                    <a href={`tel:${c.phone.replace(/\s/g, "")}`} className="text-accent/60 hover:text-accent text-[10px] transition-colors">
                                        {c.phone}
                                    </a>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Contact form */}
                <motion.form
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
                    className="rounded-2xl p-8 border border-white/[0.06]"
                    style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(0,255,255,0.02) 100%)", backdropFilter: "blur(12px)" }}
                >
                    <h3 className="font-heading font-bold text-white text-xl tracking-wider mb-6">SEND US A MESSAGE</h3>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="text-[10px] text-gray-500 font-heading tracking-widest uppercase mb-1.5 block">YOUR NAME</label>
                            <input type="text" required value={formData.name}
                                onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                                className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600
                                    focus:outline-none focus:border-accent/30 transition-colors"
                                placeholder="John Doe" />
                        </div>
                        <div>
                            <label className="text-[10px] text-gray-500 font-heading tracking-widest uppercase mb-1.5 block">EMAIL</label>
                            <input type="email" required value={formData.email}
                                onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                                className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600
                                    focus:outline-none focus:border-accent/30 transition-colors"
                                placeholder="john@college.edu" />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="text-[10px] text-gray-500 font-heading tracking-widest uppercase mb-1.5 block">SUBJECT</label>
                        <input type="text" required value={formData.subject}
                            onChange={e => setFormData(p => ({ ...p, subject: e.target.value }))}
                            className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600
                                focus:outline-none focus:border-accent/30 transition-colors"
                            placeholder="Registration issue / Event query / Feedback" />
                    </div>

                    <div className="mb-6">
                        <label className="text-[10px] text-gray-500 font-heading tracking-widest uppercase mb-1.5 block">MESSAGE</label>
                        <textarea required rows={5} value={formData.message}
                            onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                            className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600
                                focus:outline-none focus:border-accent/30 transition-colors resize-none"
                            placeholder="Describe your issue or inquiry in detail..." />
                    </div>

                    <button type="submit"
                        className="btn-primary w-full py-3 flex items-center justify-center gap-2">
                        <Send className="w-4 h-4" /> SEND MESSAGE
                    </button>
                </motion.form>
            </div>

            {/* FAQs */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-6">
                <span className="text-accent font-heading text-sm tracking-[0.2em] block mb-2">FREQUENTLY ASKED</span>
                <h2 className="font-heading font-black text-white text-3xl md:text-4xl tracking-wider mb-8">QUESTIONS</h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-3 max-w-5xl">
                {FAQS.map((faq, i) => (
                    <FAQItem key={i} faq={faq} index={i} />
                ))}
            </div>
        </div>
    );
};
