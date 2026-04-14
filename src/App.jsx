import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";
import Impact from "./sections/Impact";
import Experience from "./sections/Experience";
import Projects from "./sections/Projects";
import Skills from "./sections/Skills";
import Contact from "./sections/Contact";
import { profile } from "./data/content";

export default function App() {
  return (
    <div className="bg-[#030303] min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Impact />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <footer className="border-t border-white/[0.04] py-8 bg-[#030303]">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs font-body text-white/15">
            &copy; {new Date().getFullYear()} {profile.name}
          </p>
          <div className="flex gap-6">
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-body text-white/20 hover:text-white/50 transition-colors cursor-pointer"
            >
              LinkedIn
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-body text-white/20 hover:text-white/50 transition-colors cursor-pointer"
            >
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
