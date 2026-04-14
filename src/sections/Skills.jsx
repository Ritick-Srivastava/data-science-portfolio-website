import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { skills } from "../data/content";

const categories = [
  {
    key: "analytical",
    title: "Analytical Methods",
    description: "How I break problems down.",
    pillHover: "hover:bg-indigo-500/10 hover:text-indigo-300",
  },
  {
    key: "applied",
    title: "Applied Analytics",
    description: "Where I apply them.",
    pillHover: "hover:bg-amber-500/10 hover:text-amber-300",
  },
  {
    key: "libraries",
    title: "Data Libraries",
    description: "What I build with in Python.",
    pillHover: "hover:bg-emerald-500/10 hover:text-emerald-300",
  },
  {
    key: "tools",
    title: "Infrastructure & Tools",
    description: "The stack that runs it all.",
    pillHover: "hover:bg-rose-500/10 hover:text-rose-300",
  },
];

function SkillCategory({ category, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const items = skills[category.key];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: index * 0.12,
        ease: [0.25, 0.4, 0.25, 1],
      }}
      className="bg-white/[0.02] border border-white/[0.06] rounded-3xl p-7 hover:border-white/[0.10] transition-colors duration-300"
    >
      <h3 className="font-heading text-lg font-semibold text-white mb-1">
        {category.title}
      </h3>
      <p className="text-white/20 font-body text-sm mb-5">
        {category.description}
      </p>

      <div className="flex flex-wrap gap-2">
        {items.map((skill, i) => (
          <motion.span
            key={skill}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 + i * 0.03 }}
            className={`text-sm font-body text-white/40 bg-white/[0.03] px-3.5 py-1.5 rounded-full transition-colors duration-200 cursor-default ${category.pillHover}`}
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="relative py-32 bg-[#030303]">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <span className="text-amber-500/80 text-sm font-heading font-medium tracking-widest uppercase">
            Chapter 04
          </span>
          <h2 className="font-heading text-4xl md:text-6xl font-bold text-white mt-4 tracking-tight">
            The
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
              toolkit
            </span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5">
          {categories.map((cat, i) => (
            <SkillCategory key={cat.key} category={cat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
