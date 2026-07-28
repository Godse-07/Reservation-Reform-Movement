import React from 'react';
import { motion } from 'motion/react';
import { ShieldAlert, CheckCircle2, HeartHandshake, Scale, Award, BookOpen } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-white dark:bg-slate-900 border-y border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold uppercase tracking-wider mb-3">
            <Scale className="w-3.5 h-3.5 text-blue-700 dark:text-amber-400" />
            <span>About the Forum</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            A Constitutional & Peaceful Public Movement
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Addressing competitive pressures in education and employment through evidence-based research,
            statutory audits, and peaceful democratic dialogue.
          </p>
        </div>

        {/* 3 Core Pillars Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Pillar 1 */}
          <motion.div
            whileHover={{ y: -4 }}
            className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-900 dark:text-blue-300 flex items-center justify-center mb-5">
                <Scale className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Constitutional Engagement
              </h3>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                We operate strictly within the legal and democratic framework of the Indian Constitution.
                Our advocacy relies on judicial review petitions, parliamentary representations, and scholarly research — rejecting all forms of illegal agitation.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-200/80 dark:border-slate-700/80 text-xs font-medium text-blue-900 dark:text-blue-300 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>100% Non-violent & Lawful</span>
            </div>
          </motion.div>

          {/* Pillar 2 */}
          <motion.div
            whileHover={{ y: -4 }}
            className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-300 flex items-center justify-center mb-5">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Dignity & Equal Respect
              </h3>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                We explicitly affirm that historical social disadvantage in India is real and deserves thoughtful policy attention.
                Our focus is purely on how affirmative policies evolve to incorporate economic vulnerability and merit-based access.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-200/80 dark:border-slate-700/80 text-xs font-medium text-amber-900 dark:text-amber-300 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Zero animosity toward any group</span>
            </div>
          </motion.div>

          {/* Pillar 3 */}
          <motion.div
            whileHover={{ y: -4 }}
            className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-900 dark:text-indigo-300 flex items-center justify-center mb-5">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Evidence-Based Policy Reform
              </h3>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Advocating for periodic statutory audits every 10 years to ensure that reservation quotas remain dynamic, target genuinely underprivileged households, and preserve open competitive excellence.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-200/80 dark:border-slate-700/80 text-xs font-medium text-indigo-900 dark:text-indigo-300 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Sourced & Statistically Grounded</span>
            </div>
          </motion.div>
        </div>

        {/* Detailed Framing Callout Card */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="max-w-3xl">
              <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 mb-3">
                Core Distinction & Stance
              </span>
              <h4 className="text-xl sm:text-2xl font-bold text-white">
                Policy Mechanism Debate vs. Social Antagonism
              </h4>
              <p className="mt-2 text-sm sm:text-base text-slate-200 leading-relaxed">
                "The core debate is not whether vulnerable citizens deserve state support — they unquestionably do.
                The constitutional debate is whether perpetual caste-based seat quotas, implemented without periodic economic audits or rigid ceiling caps, remain the most effective and equitable mechanism for a developing nation."
              </p>
            </div>
            <a
              href="#constitutional"
              className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider whitespace-nowrap shadow transition-colors"
            >
              Explore Constitutional Judgments
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
