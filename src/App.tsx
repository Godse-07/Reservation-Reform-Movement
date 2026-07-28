import React, { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { AboutSection } from "./components/AboutSection";
import { KeyConcerns } from "./components/KeyConcerns";
import { ResearchDataSection } from "./components/ResearchDataSection";
import { ConstitutionalSection } from "./components/ConstitutionalSection";
import { TimelineSection } from "./components/TimelineSection";
import { PeacefulGuidelines } from "./components/PeacefulGuidelines";
import { FaqSection } from "./components/FaqSection";
import { JoinMovement } from "./components/JoinMovement";
import { PledgeWall } from "./components/PledgeWall";
import { Footer } from "./components/Footer";

import { SearchModal } from "./components/SearchModal";
import { UnitTestsModal } from "./components/UnitTestsModal";
import { DocumentationModal } from "./components/DocumentationModal";

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem("PRM_THEME");
    if (saved) return saved === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isTestsOpen, setIsTestsOpen] = useState(false);
  const [isDocsOpen, setIsDocsOpen] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("PRM_THEME", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("PRM_THEME", "light");
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans antialiased selection:bg-amber-500 selection:text-slate-950">
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenDocs={() => setIsDocsOpen(true)}
      />

      <main id="main-content">
        <Hero />
        <AboutSection />
        <KeyConcerns />
        <ResearchDataSection />
        <ConstitutionalSection />
        <TimelineSection />
        <PeacefulGuidelines />
        <FaqSection />
        <JoinMovement />
        <PledgeWall />
      </main>

      <Footer />

      {/* Modals */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
      <UnitTestsModal
        isOpen={isTestsOpen}
        onClose={() => setIsTestsOpen(false)}
      />
      <DocumentationModal
        isOpen={isDocsOpen}
        onClose={() => setIsDocsOpen(false)}
      />
    </div>
  );
}
