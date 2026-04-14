import { motion, useInView, AnimatePresence } from "motion/react";
import { useRef, useState, useEffect } from "react";
import { X, ArrowUpRight } from "lucide-react";
import { projects } from "../data/content";

function ProjectModal({ project, onClose }) {
  // Close on Escape key
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.97 }}
        transition={{ duration: 0.35, ease: [0.25, 0.4, 0.25, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-[#0a0a0a] border border-white/[0.08] rounded-2xl shadow-2xl"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/[0.05] hover:bg-white/[0.1] transition-colors"
        >
          <X className="w-4 h-4 text-white/50" />
        </button>

        {/* Image */}
        {project.image && (
          <div className="relative h-48 md:h-56 overflow-hidden rounded-t-2xl bg-white/[0.02]">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
          </div>
        )}

        {/* Content */}
        <div className="p-8 space-y-6">
          {/* Question hook */}
          <p className="text-indigo-300/60 text-sm font-body italic leading-relaxed">
            "{project.question}"
          </p>

          <h3 className="font-heading text-2xl md:text-3xl font-bold text-white tracking-tight">
            {project.title}
          </h3>

          <p className="text-white/45 text-sm font-body leading-relaxed">
            {project.description}
          </p>

          {/* Details */}
          <ul className="space-y-3">
            {project.details.map((detail, i) => (
              <li
                key={i}
                className="flex gap-3 text-white/40 text-sm font-body"
              >
                <span className="mt-2 w-1 h-1 rounded-full bg-indigo-500/50 shrink-0" />
                {detail}
              </li>
            ))}
          </ul>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] text-white/30 font-heading tracking-wide uppercase bg-white/[0.04] px-2.5 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Links */}
          {(project.github || project.demo) && (
            <div className="flex gap-4 pt-2">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-heading text-white/40 hover:text-white/80 transition-colors"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  GitHub
                </a>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-heading text-indigo-400/70 hover:text-indigo-300 transition-colors"
                >
                  <ArrowUpRight className="w-4 h-4" />
                  Live Demo
                </a>
              )}
            </div>
          )}

          {project.comingSoon && (
            <div className="inline-flex text-[11px] font-heading font-medium text-amber-400/80 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full tracking-wide uppercase">
              Coming Soon
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

function ProjectCard({ project, index, onClick }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, x: isEven ? -40 : 40 }}
      animate={isInView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: index * 0.15,
        ease: [0.25, 0.4, 0.25, 1],
      }}
      className={`flex ${isEven ? "md:justify-start" : "md:justify-end"}`}
    >
      <div
        onClick={onClick}
        className="group cursor-pointer w-full md:w-[55%] bg-white/[0.02] border border-white/[0.06] rounded-xl overflow-hidden hover:border-white/[0.14] transition-all duration-300"
      >
        {/* Image — only if project has one */}
        {project.image && (
          <div className="relative h-36 md:h-40 overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-[1.02] transition-all duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
          </div>
        )}

        {/* Text */}
        <div className="p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <h3 className="font-heading text-base md:text-lg font-semibold text-white/80 group-hover:text-white transition-colors duration-300">
                {project.title}
              </h3>
              <p className="text-white/30 text-sm font-body mt-1.5 leading-relaxed group-hover:text-white/40 transition-colors duration-300">
                {project.question}
              </p>
            </div>
            {project.comingSoon && (
              <span className="shrink-0 text-[9px] font-heading font-medium text-amber-400/70 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full tracking-wide uppercase mt-0.5">
                Soon
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [activeProject, setActiveProject] = useState(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="relative py-32 bg-[#030303]">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <span className="text-amber-500/80 text-sm font-heading font-medium tracking-widest uppercase">
            Chapter 03
          </span>
          <h2 className="font-heading text-4xl md:text-6xl font-bold text-white mt-4 tracking-tight">
            How I{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-rose-400">
              think
            </span>
          </h2>
          <p className="text-white/30 font-body mt-6 max-w-lg text-lg">
            Every project starts with a question worth answering.
          </p>
        </motion.div>

        {/* Staggered project cards */}
        <div className="space-y-10 md:space-y-14">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={i}
              onClick={() => setActiveProject(project)}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {activeProject && (
          <ProjectModal
            project={activeProject}
            onClose={() => setActiveProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
