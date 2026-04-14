import { motion } from "motion/react";
import { Circle } from "lucide-react";
import { cn } from "../lib/utils";
import DataBackground from "../components/ui/DataBackground";
import { profile } from "../data/content";

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      delay: 0.5 + i * 0.2,
      ease: [0.25, 0.4, 0.25, 1],
    },
  }),
};

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#030303]"
    >
      {/* Ambient gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.05] via-transparent to-rose-500/[0.05] blur-3xl" />

      {/* Floating data fragments */}
      <DataBackground />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center pointer-events-none">
        <motion.div
          custom={0}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] mb-8 md:mb-12 pointer-events-auto"
        >
          <Circle className="h-2 w-2 fill-amber-500/80 stroke-none" />
          <span className="text-sm text-white/60 tracking-wide font-body">
            {profile.role} @ {profile.company}
          </span>
        </motion.div>

        <motion.div
          custom={1}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
        >
          <h1 className="font-heading text-5xl sm:text-7xl md:text-8xl font-bold mb-6 md:mb-8 tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80">
              {profile.tagline.split(".")[0]}.
            </span>
            <br />
            <span
              className={cn(
                "bg-clip-text text-transparent",
                "bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300"
              )}
            >
              {profile.tagline.split(".")[1]?.trim() ||
                "Then I ship the decision."}
            </span>
          </h1>
        </motion.div>

        <motion.div
          custom={2}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
        >
          <p className="text-base sm:text-lg md:text-xl text-white/40 mb-10 leading-relaxed font-body font-light tracking-wide max-w-2xl mx-auto">
            {profile.summary}
          </p>
        </motion.div>

        <motion.div
          custom={3}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row gap-4 justify-center pointer-events-auto"
        >
          <a
            href="#impact"
            className="px-8 py-3.5 bg-white text-[#030303] font-heading font-semibold text-sm rounded-full hover:bg-white/90 transition-colors cursor-pointer"
          >
            Read the story
          </a>
          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3.5 border border-white/[0.12] text-white/70 font-heading font-medium text-sm rounded-full hover:bg-white/[0.05] transition-colors cursor-pointer"
          >
            Resume
          </a>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/80 pointer-events-none" />
    </section>
  );
}
