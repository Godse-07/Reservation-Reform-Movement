import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, X, CheckCircle2, ShieldCheck, Scale, FileText } from 'lucide-react';

interface DocumentationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DocumentationModal: React.FC<DocumentationModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-3xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[85vh]"
        >
          {/* Header */}
          <div className="p-6 bg-blue-900 text-white flex items-center justify-between border-b border-blue-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-white">Forum Methodology & Legal Documentation</h3>
                <p className="text-xs text-blue-200">
                  Data Verification Standards, Sourced Fact Discipline, and Research Methodology.
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-blue-200 hover:bg-blue-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
              <h4 className="font-bold text-slate-900 dark:text-white text-base mb-2 flex items-center gap-2">
                <Scale className="w-4 h-4 text-blue-700 dark:text-amber-400" />
                1. Sourced Fact vs. Movement Position Stance
              </h4>
              <p>
                To maintain standard credibility and legal compliance, every section on this platform strictly distinguishes between verified constitutional fact (statutes, gazettes, Supreme Court judgments) and movement policy stances (arguments regarding merit, periodic review, or 50% cap preservation).
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
              <h4 className="font-bold text-slate-900 dark:text-white text-base mb-2 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                2. Data Verification Badge System
              </h4>
              <ul className="list-disc pl-5 space-y-1 text-xs">
                <li><strong className="text-emerald-700 dark:text-emerald-400">Verified Source Badge:</strong> Indicates datasets extracted directly from published Supreme Court judgments, Ministry of Social Justice notifications, or UPSC annual reports.</li>
                <li><strong className="text-amber-700 dark:text-amber-400">Source Required / PLACEHOLDER:</strong> Highlights entries where primary source documentation is currently undergoing peer verification before final publication.</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
              <h4 className="font-bold text-slate-900 dark:text-white text-base mb-2 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                3. Peaceful Protest & Non-Discrimination
              </h4>
              <p>
                The forum strictly disowns all forms of hate speech, violence, harassment, or communal prejudice. Advocacy is conducted exclusively through constitutional petitions, academic research, public policy commissions, and peaceful civil representation.
              </p>
            </div>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 text-center text-[11px] text-slate-500">
            For further legal inquiries or primary source submissions, contact research@reservationreform.org.
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
