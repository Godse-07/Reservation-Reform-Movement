import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Search,
  Sun,
  Moon,
  Menu,
  X,
  ShieldCheck,
  BookOpen,
  Scale,
  Info,
  Layers,
  BarChart3,
  Gavel,
  History,
  Users,
  Shield,
  HelpCircle,
} from "lucide-react";

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  onOpenSearch: () => void;
  onOpenDocs: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  darkMode,
  setDarkMode,
  onOpenSearch,
  onOpenDocs,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      setScrolled(currentScroll > 20);
      if (totalHeight > 0) {
        setScrollProgress((currentScroll / totalHeight) * 100);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "About", href: "#about", icon: Info },
    { label: "Key Viewpoints", href: "#key-concerns", icon: Layers },
    { label: "Research & Data", href: "#research", icon: BarChart3 },
    { label: "Constitutional Law", href: "#constitutional", icon: Gavel },
    { label: "Timeline", href: "#timeline", icon: History },
    { label: "Pledge Wall", href: "#pledges", icon: Users },
    { label: "Peaceful Guidelines", href: "#guidelines", icon: Shield },
    { label: "FAQ", href: "#faq", icon: HelpCircle },
  ];

  return (
    <>
      {/* Top Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-slate-200 dark:bg-slate-800">
        <div
          className="h-full bg-gradient-to-r from-blue-700 via-indigo-600 to-amber-500 transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <header
        className={`fixed top-1 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-md border-b border-slate-200/80 dark:border-slate-800/80"
            : "bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm border-b border-slate-200/50 dark:border-slate-800/50"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Top Row: Branding (Left) & Global Actions (Right) */}
          <div className="flex items-center justify-between py-2.5 sm:py-3">
            {/* Brand Logo */}
            <a
              href="#"
              className="flex items-center gap-3 group focus:outline-none shrink-0"
              id="nav-logo-link"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 dark:from-blue-600 dark:to-indigo-800 text-amber-400 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform border border-amber-500/30">
                <Scale className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-base sm:text-lg tracking-tight text-slate-900 dark:text-white group-hover:text-blue-700 dark:group-hover:text-amber-400 transition-colors">
                    Reservation Policy Reform
                  </span>
                  <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase rounded-md bg-amber-100 text-amber-800 dark:bg-amber-950/90 dark:text-amber-300 border border-amber-300/60 dark:border-amber-700/60">
                    Constitutional Forum
                  </span>
                </div>
                <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
                  Advocating Peaceful, Evidence-Based Policy Review
                </p>
              </div>
            </a>

            {/* Desktop Quick Actions (Right side of Top Row) */}
            <div className="hidden lg:flex items-center space-x-2.5">
              {/* Global Search Input Trigger */}
              <button
                onClick={onOpenSearch}
                className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800/90 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl border border-slate-200 dark:border-slate-700/80 transition-all cursor-pointer shadow-2xs hover:shadow-xs"
                title="Search Cases, Research & Data (Cmd+K)"
                id="search-btn-nav"
              >
                <Search className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                <span>Search Portal</span>
                <kbd className="hidden xl:inline-block px-1.5 py-0.5 text-[10px] font-mono font-semibold text-slate-500 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded shadow-2xs">
                  ⌘K
                </kbd>
              </button>

              {/* Legal Methodology & Documentation Trigger */}
              <button
                onClick={onOpenDocs}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-100/80 dark:bg-slate-800/60 hover:bg-slate-200 dark:hover:bg-slate-700/80 rounded-xl border border-slate-200/80 dark:border-slate-700/60 transition-colors cursor-pointer"
                title="Methodology & Constitutional Legal Sources"
                id="docs-btn-nav"
              >
                <BookOpen className="w-3.5 h-3.5 text-blue-600 dark:text-amber-400" />
                <span>Methodology & Sources</span>
              </button>

              {/* Dark / Light Theme Toggle */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors cursor-pointer border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
                title={
                  darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"
                }
                id="theme-toggle-nav"
              >
                {darkMode ? (
                  <Sun className="w-4 h-4 text-amber-400" />
                ) : (
                  <Moon className="w-4 h-4 text-slate-700" />
                )}
              </button>

              {/* Join Citizen Pledge CTA */}
              <a
                href="#join"
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-blue-900 hover:bg-blue-800 dark:bg-amber-500 dark:hover:bg-amber-400 dark:text-slate-950 rounded-xl shadow-sm hover:shadow-md transition-all border border-blue-950 dark:border-amber-400"
                id="join-cta-nav"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Sign Peaceful Pledge</span>
              </a>
            </div>

            {/* Mobile & Tablet Toggle Controls */}
            <div className="flex items-center space-x-2 lg:hidden">
              <button
                onClick={onOpenSearch}
                className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
                title="Search"
              >
                <Search className="w-5 h-5" />
              </button>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
                title="Toggle theme"
              >
                {darkMode ? (
                  <Sun className="w-5 h-5 text-amber-400" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg focus:outline-none"
                id="mobile-menu-toggle"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* Desktop Row 2: Structured Categorized Navigation Bar (Large Screen / Desktop / Laptop) */}
          <div
            className="hidden lg:block border-t border-slate-200/70 dark:border-slate-800/70 py-1.5"
            id="desktop-secondary-nav-row"
          >
            <nav
              className="flex items-center justify-between overflow-x-auto no-scrollbar gap-1"
              id="desktop-nav-menu"
            >
              {navLinks.map((link) => {
                const IconComp = link.icon;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-blue-900 dark:hover:text-amber-300 hover:bg-slate-100/90 dark:hover:bg-slate-800/80 rounded-lg transition-all shrink-0 group"
                  >
                    <IconComp className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 dark:group-hover:text-amber-400 transition-colors" />
                    <span>{link.label}</span>
                  </a>
                );
              })}
            </nav>
          </div>
        </div>
      </header>

      {/* Mobile & Tablet Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[60px] z-30 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-xl px-4 py-6 lg:hidden"
            id="mobile-nav-drawer"
          >
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => {
                const IconComp = link.icon;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
                  >
                    <IconComp className="w-4 h-4 text-amber-500" />
                    <span>{link.label}</span>
                  </a>
                );
              })}
              <div className="pt-4 mt-2 border-t border-slate-200 dark:border-slate-800 flex flex-col space-y-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenDocs();
                  }}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 rounded-xl"
                >
                  <BookOpen className="w-4 h-4 text-blue-600 dark:text-amber-400" />
                  <span>Methodology & Legal Sources</span>
                </button>
                <a
                  href="#join"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 px-4 py-3 text-xs font-bold text-white bg-blue-900 dark:bg-amber-500 dark:text-slate-950 rounded-xl shadow"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Sign Peaceful Pledge</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
