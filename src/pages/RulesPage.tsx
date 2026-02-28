import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ChevronDown, ShieldCheck, AlertTriangle, BookOpen, Ban } from "lucide-react";
import { Link } from "react-router-dom";

interface RuleSection {
    icon: React.ElementType;
    title: string;
    color: string;
    rules: string[];
}

const RULE_SECTIONS: RuleSection[] = [
    {
        icon: BookOpen,
        title: "General Rules",
        color: "accent",
        rules: [
            "All participants must carry a valid college ID card at all times during the fest.",
            "Registration is mandatory for every event. Spot registrations are subject to availability.",
            "Participants must report to the respective event venue at least 15 minutes before the scheduled time.",
            "The organizing committee reserves the right to change event timings and venues without prior notice.",
            "All participants must adhere to the code of conduct set by MCC Bengaluru.",
            "Decision of the judges and organizers will be final and binding in all events.",
            "Entry to the fest is permitted only with a valid TechForte pass or confirmation email.",
        ],
    },
    {
        icon: ShieldCheck,
        title: "Technical Event Rules",
        color: "cyan",
        rules: [
            "Use of AI tools (ChatGPT, Copilot, etc.) is strictly prohibited during coding events unless explicitly stated.",
            "All code must be written from scratch during the event. Pre-written code or templates are not allowed.",
            "Participants may use their own laptops for coding events. Organizers are not responsible for hardware issues.",
            "Internet access will be provided where necessary. Unauthorized internet usage will lead to disqualification.",
            "Plagiarism in any form will result in immediate disqualification from the event.",
            "Teams must submit their work before the deadline. Late submissions will not be accepted.",
            "Open-source libraries and frameworks are permitted unless the event rules state otherwise.",
        ],
    },
    {
        icon: AlertTriangle,
        title: "Non-Technical Event Rules",
        color: "purple",
        rules: [
            "All gaming tournaments follow standard competitive rules for the respective game titles.",
            "Participants must use peripherals provided by the organizers unless personal peripherals are explicitly allowed.",
            "Toxic behavior, hate speech, or harassment during gaming events will result in immediate disqualification.",
            "Creative events (Ad Creation, Marketing) require 100% original content. Stock footage is not permitted.",
            "Treasure Hunt participants must stay within the designated campus boundaries at all times.",
            "Surprise event rules will be revealed at the time of the event. Participants must comply with on-the-spot rules.",
            "Team size requirements must be strictly followed. Excess or fewer members may lead to disqualification.",
        ],
    },
    {
        icon: Ban,
        title: "Prohibited Actions",
        color: "red",
        rules: [
            "Consumption of alcohol, tobacco, or any intoxicating substances on campus is strictly prohibited.",
            "Weapons, sharp objects, and hazardous materials are not allowed on the premises.",
            "Damage to college property will result in penalties and potential legal action.",
            "Participants found engaging in ragging, bullying, or any form of misconduct will be expelled from the fest.",
            "Photography and videography in restricted areas is not permitted without prior authorization.",
            "Sharing event content, questions, or answers with external parties during events is forbidden.",
        ],
    },
];

function AccordionSection({ section, index }: { section: RuleSection; index: number }) {
    const [isOpen, setIsOpen] = useState(index === 0);
    const Icon = section.icon;

    const colorMap: Record<string, { bg: string; text: string; border: string; glow: string }> = {
        accent: { bg: "bg-accent/10", text: "text-accent", border: "border-accent/20", glow: "shadow-[0_0_20px_rgba(0,255,255,0.1)]" },
        cyan: { bg: "bg-cyan-500/10", text: "text-cyan-400", border: "border-cyan-500/20", glow: "shadow-[0_0_20px_rgba(0,200,255,0.1)]" },
        purple: { bg: "bg-purple-500/10", text: "text-purple-400", border: "border-purple-500/20", glow: "shadow-[0_0_20px_rgba(168,85,247,0.1)]" },
        red: { bg: "bg-red-500/10", text: "text-red-400", border: "border-red-500/20", glow: "shadow-[0_0_20px_rgba(239,68,68,0.1)]" },
    };

    const colors = colorMap[section.color] || colorMap.accent;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className={`rounded-2xl border border-white/[0.06] overflow-hidden transition-all duration-500
                ${isOpen ? `${colors.border} ${colors.glow}` : "hover:border-white/[0.1]"}`}
            style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(0,255,255,0.01) 100%)", backdropFilter: "blur(12px)" }}
        >
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center gap-4 p-6 text-left"
            >
                <div className={`w-10 h-10 rounded-xl ${colors.bg} flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`w-5 h-5 ${colors.text}`} />
                </div>
                <div className="flex-1">
                    <h3 className="font-heading font-bold text-white text-lg tracking-wider">{section.title}</h3>
                    <p className="text-gray-500 text-xs">{section.rules.length} rules</p>
                </div>
                <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                </motion.div>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="px-6 pb-6 space-y-3">
                            {section.rules.map((rule, i) => (
                                <div key={i} className="flex items-start gap-3">
                                    <span className={`w-6 h-6 rounded-lg ${colors.bg} ${colors.text} text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5`}>
                                        {i + 1}
                                    </span>
                                    <p className="text-gray-400 text-sm leading-relaxed">{rule}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export const RulesPage = () => {
    return (
        <div className="min-h-screen pt-28 pb-20 px-6 md:px-12 lg:px-20">
            <Link to="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-accent text-xs font-heading tracking-widest mb-8 transition-colors">
                <ArrowLeft className="w-4 h-4" /> BACK TO HOME
            </Link>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
                <span className="text-accent font-heading text-lg md:text-2xl font-bold tracking-wider block mb-1">FEST</span>
                <h1 className="text-white font-heading text-4xl md:text-6xl font-black tracking-wider mb-4">RULES & GUIDELINES</h1>
                <p className="text-gray-500 text-sm max-w-xl leading-relaxed">
                    Please read all rules carefully before participating. Violation of any rule may result in disqualification.
                    All participants are expected to maintain decorum and sportsmanship.
                </p>
            </motion.div>

            {/* Important notice */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="rounded-2xl p-5 border border-amber-500/20 mb-10 flex items-start gap-4"
                style={{ background: "rgba(245,158,11,0.05)" }}
            >
                <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                    <p className="text-amber-400 text-sm font-medium mb-1">Important Notice</p>
                    <p className="text-gray-400 text-xs leading-relaxed">
                        By registering for TechForte 2026, you agree to abide by all the rules and guidelines listed below.
                        The organizing committee reserves the right to modify rules at any time. Any updates will be communicated
                        through official channels.
                    </p>
                </div>
            </motion.div>

            {/* Rule sections */}
            <div className="space-y-4 max-w-4xl">
                {RULE_SECTIONS.map((section, i) => (
                    <AccordionSection key={section.title} section={section} index={i} />
                ))}
            </div>
        </div>
    );
};
