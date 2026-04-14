import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import { GlowCard } from "../components/ui/GlowCard";
import { impactStats } from "../data/content";

function StatCard({ stat, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [expanded, setExpanded] = useState(false);

  const colors = ["blue", "indigo", "purple", "amber"];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.25, 0.4, 0.25, 1] }}
    >
      <GlowCard
        glowColor={colors[index % colors.length]}
        className="p-8 cursor-pointer min-h-[220px] flex flex-col justify-between"
      >
        <div
          onClick={() => setExpanded(!expanded)}
          className="relative z-10 h-full flex flex-col justify-between"
        >
          {!expanded ? (
            <>
              <div>
                <span className="font-heading text-5xl md:text-6xl font-bold text-white tracking-tight">
                  {stat.value}
                </span>
                <p className="text-white/40 text-sm font-body mt-2">
                  {stat.label}
                </p>
              </div>
              <p className="text-white/20 text-xs font-body mt-4">
                Tap for the story
              </p>
            </>
          ) : (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-white/60 text-sm font-body leading-relaxed"
            >
              {stat.story}
            </motion.p>
          )}
        </div>
      </GlowCard>
    </motion.div>
  );
}

export default function Impact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="impact" className="relative py-32 bg-[#030303]">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <span className="text-amber-500/80 text-sm font-heading font-medium tracking-widest uppercase">
            Chapter 01
          </span>
          <h2 className="font-heading text-4xl md:text-6xl font-bold text-white mt-4 tracking-tight">
            The numbers that
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-rose-400">
              tell the story
            </span>
          </h2>
          <p className="text-white/30 font-body mt-6 max-w-lg text-lg">
            Every number here represents a decision that moved a business
            forward. Tap any card to read how.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {impactStats.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
