import { motion, useInView, AnimatePresence } from "motion/react";
import { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { experience, education } from "../data/content";

function RoleCard({ role, isLatest }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
    >
      <div
        onClick={() => setOpen(!open)}
        className="cursor-pointer bg-white/[0.02] border border-white/[0.06] rounded-2xl hover:border-white/[0.12] transition-all duration-300 overflow-hidden"
      >
        {/* Collapsed view — always visible */}
        <div className="p-6 md:p-8">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 flex-wrap">
                <h4 className="font-heading text-lg md:text-xl font-semibold text-white">
                  {role.title}
                </h4>
                {isLatest && (
                  <span className="text-[10px] font-heading font-medium tracking-widest uppercase text-emerald-400/80 bg-emerald-400/10 border border-emerald-400/20 px-2.5 py-0.5 rounded-full">
                    Current
                  </span>
                )}
              </div>
              <p className="text-white/25 text-sm font-body mt-1">
                {role.period}
              </p>
            </div>

            <motion.div
              animate={{ rotate: open ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="mt-1 shrink-0"
            >
              <ChevronDown className="w-5 h-5 text-white/20" />
            </motion.div>
          </div>

          {/* Summary — always visible */}
          <p className="text-white/40 font-body text-sm leading-relaxed mt-4">
            {role.summary}
          </p>

          {/* Tools — always visible */}
          <div className="flex flex-wrap gap-2 mt-4">
            {role.tools.map((tool) => (
              <span
                key={tool}
                className="text-[11px] text-white/30 font-heading tracking-wide bg-white/[0.04] px-2.5 py-1 rounded-full"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>

        {/* Expanded view — highlights */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
              className="overflow-hidden"
            >
              <div className="px-6 md:px-8 pb-8 pt-2 border-t border-white/[0.04]">
                <div className="grid gap-4 mt-4">
                  {role.highlights.map((h, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.3 }}
                      className="flex gap-3 group/item"
                    >
                      <div className="mt-2 w-1 shrink-0 rounded-full bg-white/[0.06] group-hover/item:bg-indigo-500/40 transition-colors" />
                      <div>
                        <p className="text-white/50 font-body text-[14px] leading-relaxed">
                          {h.text}
                        </p>
                        <div className="flex flex-wrap gap-1.5 mt-1.5">
                          {h.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-[10px] text-indigo-400/50 font-heading tracking-wide uppercase bg-indigo-400/[0.05] px-2 py-0.5 rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function CompanyBlock({ company, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: index * 0.15,
        ease: [0.25, 0.4, 0.25, 1],
      }}
    >
      {/* Company header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-3 h-3 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 shrink-0" />
        <div>
          <h3 className="font-heading text-2xl md:text-3xl font-bold text-white">
            {company.company}
          </h3>
          <p className="text-white/20 font-body text-sm">{company.location}</p>
        </div>
      </div>

      {/* Roles — collapsible */}
      <div className="ml-6 border-l border-white/[0.06] pl-6 space-y-4">
        {company.roles.map((role, i) => (
          <RoleCard key={role.title} role={role} isLatest={index === 0 && i === 0} />
        ))}
      </div>
    </motion.div>
  );
}

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="relative py-32 bg-[#030303]">
      {/* Ambient glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-indigo-500/[0.03] rounded-full blur-[120px]" />
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <span className="text-amber-500/80 text-sm font-heading font-medium tracking-widest uppercase">
            Chapter 02
          </span>
          <h2 className="font-heading text-4xl md:text-6xl font-bold text-white mt-4 tracking-tight">
            Where I've
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-violet-400">
              done it
            </span>
          </h2>
          <p className="text-white/30 font-body mt-6 max-w-lg text-lg">
            Four years, four roles, one trajectory. Tap any role to read the
            details.
          </p>
        </motion.div>

        <div className="space-y-16">
          {experience.map((company, i) => (
            <CompanyBlock key={company.company} company={company} index={i} />
          ))}
        </div>

        {/* Education */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-16 flex items-center gap-4 bg-white/[0.02] border border-white/[0.06] rounded-2xl px-6 py-5"
        >
          <div className="w-2 h-2 rounded-full bg-amber-500/60" />
          <div className="flex-1">
            <p className="text-white/80 font-heading font-medium">
              {education.institution}
            </p>
            <p className="text-white/30 font-body text-sm">
              {education.degree} · {education.period}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
