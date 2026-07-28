import React from "react";
import { motion } from "motion/react";
import {
  ShieldCheck,
  ArrowRight,
  BookOpenCheck,
  Scale,
  FileText,
  CheckCircle2,
} from "lucide-react";

export const Hero: React.FC = () => {
  return (
    <section className="relative pt-36 pb-20 lg:pt-44 md:pb-28 overflow-hidden bg-gradient-to-b from-slate-50 via-blue-50/30 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.08, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-gradient-to-br from-blue-600/30 via-indigo-500/20 to-amber-500/10 rounded-full blur-3xl"
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] border border-blue-200/40 dark:border-slate-800/60 rounded-full opacity-30 pointer-events-none flex items-center justify-center">
          <div className="w-[500px] h-[500px] border border-indigo-200/40 dark:border-slate-800/40 rounded-full border-dashed animate-spin-slow" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Top Pill Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-200 text-xs font-semibold tracking-wide mb-6 shadow-2xs"
          >
            <Scale className="w-3.5 h-3.5 text-blue-700 dark:text-amber-400" />
            <span>Constitutional Review & Policy Rebalancing</span>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight sm:leading-none"
          >
            Empowering Merit & Economic Upliftment Through{" "}
            <span className="bg-gradient-to-r from-blue-900 via-indigo-800 to-amber-600 dark:from-blue-400 dark:via-indigo-300 dark:to-amber-400 bg-clip-text text-transparent">
              Constitutional Reform
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-base sm:text-lg lg:text-xl text-slate-600 dark:text-slate-300 font-normal leading-relaxed max-w-3xl mx-auto"
          >
            A peaceful, research-backed public platform advocating for periodic
            review, evidence-based evaluation, and equitable criteria in
            reservation policy — upholding equal opportunity, academic
            excellence, and economic justice for all Indian citizens.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="#join"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm font-semibold text-white bg-blue-900 hover:bg-blue-800 dark:bg-amber-600 dark:hover:bg-amber-500 rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
            >
              <ShieldCheck className="w-4 h-4 text-amber-300 dark:text-slate-900" />
              <span>Join the Movement</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="#research"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xs hover:shadow transition-all"
            >
              <BookOpenCheck className="w-4 h-4 text-blue-700 dark:text-amber-400" />
              <span>Read the Research</span>
            </a>
          </motion.div>

          {/* Sourced Commitment Callout */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-4 text-xs text-slate-500 dark:text-slate-400 flex items-center justify-center gap-1.5"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>
              Strictly non-violent, constitutional, and backed by verified legal
              report citations.
            </span>
          </motion.p>
        </div>

        {/* Feature/Stat Cards Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6"
        >
          <div className="p-5 rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-slate-200/80 dark:border-slate-800/80 shadow-xs hover:border-blue-300 dark:hover:border-slate-700 transition-all">
            <div className="text-2xl sm:text-3xl font-extrabold text-blue-900 dark:text-blue-400">
              50% Cap
            </div>
            <div className="text-xs font-semibold text-slate-700 dark:text-slate-300 mt-1">
              Indra Sawhney (1992)
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
              Constitutional ceiling rule of equality
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-slate-200/80 dark:border-slate-800/80 shadow-xs hover:border-amber-300 dark:hover:border-slate-700 transition-all">
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-600 dark:text-amber-400">
              3-2 Split
            </div>
            <div className="text-xs font-semibold text-slate-700 dark:text-slate-300 mt-1">
              SC Janhit Abhiyan (2022)
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
              EWS economic criteria verdict
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-slate-200/80 dark:border-slate-800/80 shadow-xs hover:border-emerald-300 dark:hover:border-slate-700 transition-all">
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-700 dark:text-emerald-400">
              100% Lawful
            </div>
            <div className="text-xs font-semibold text-slate-700 dark:text-slate-300 mt-1">
              Peaceful Civil Engagement
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
              Democratically rooted advocacy
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-slate-200/80 dark:border-slate-800/80 shadow-xs hover:border-indigo-300 dark:hover:border-slate-700 transition-all">
            <div className="text-2xl sm:text-3xl font-extrabold text-indigo-800 dark:text-indigo-400">
              Periodic Review
            </div>
            <div className="text-xs font-semibold text-slate-700 dark:text-slate-300 mt-1">
              Audit Mechanism
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
              Dynamic policy assessment
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
