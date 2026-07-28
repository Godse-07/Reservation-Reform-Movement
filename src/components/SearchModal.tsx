import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, BookOpen, Scale, Clock, HelpCircle, ExternalLink, ChevronRight } from 'lucide-react';
import { CONSTITUTIONAL_CASES, TIMELINE_EVENTS, RESEARCH_ITEMS, FAQ_ITEMS } from '../data/campaignData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open search modal via custom event or parent callback
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const matchedCases = CONSTITUTIONAL_CASES.filter((c) =>
    c.title.toLowerCase().includes(query.toLowerCase()) ||
    c.citation.toLowerCase().includes(query.toLowerCase()) ||
    c.keyHolding.toLowerCase().includes(query.toLowerCase())
  );

  const matchedTimeline = TIMELINE_EVENTS.filter((t) =>
    t.title.toLowerCase().includes(query.toLowerCase()) ||
    t.summary.toLowerCase().includes(query.toLowerCase()) ||
    t.year.includes(query)
  );

  const matchedResearch = RESEARCH_ITEMS.filter((r) =>
    r.title.toLowerCase().includes(query.toLowerCase()) ||
    r.summary.toLowerCase().includes(query.toLowerCase()) ||
    r.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase()))
  );

  const matchedFaqs = FAQ_ITEMS.filter((f) =>
    f.question.toLowerCase().includes(query.toLowerCase()) ||
    f.answer.toLowerCase().includes(query.toLowerCase())
  );

  const totalResults = matchedCases.length + matchedTimeline.length + matchedResearch.length + matchedFaqs.length;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-900/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[80vh]"
        >
          {/* Header Input */}
          <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3">
            <Search className="w-5 h-5 text-slate-400 shrink-0" />
            <input
              type="text"
              autoFocus
              placeholder="Search Supreme Court cases, research, timeline, FAQs..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full text-sm sm:text-base bg-transparent text-slate-900 dark:text-white focus:outline-none"
            />
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Results List */}
          <div className="p-4 overflow-y-auto space-y-6 flex-1 text-xs">
            {query.trim().length === 0 ? (
              <div className="text-center py-10 text-slate-400">
                <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p>Type any keyword (e.g., "Indra Sawhney", "50%", "EWS", "UPSC", "1992")</p>
              </div>
            ) : totalResults === 0 ? (
              <div className="text-center py-10 text-slate-400">
                <p>No matching legal records found for "{query}".</p>
              </div>
            ) : (
              <>
                {/* Constitutional Cases */}
                {matchedCases.length > 0 && (
                  <div>
                    <h4 className="font-extrabold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
                      <Scale className="w-3.5 h-3.5 text-blue-600" />
                      Constitutional Cases ({matchedCases.length})
                    </h4>
                    <div className="space-y-2">
                      {matchedCases.map((c) => (
                        <a
                          key={c.id}
                          href="#constitutional"
                          onClick={onClose}
                          className="block p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        >
                          <div className="font-bold text-slate-900 dark:text-white text-sm">{c.title} ({c.year})</div>
                          <div className="text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1 font-mono text-[11px]">{c.citation}</div>
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Timeline Events */}
                {matchedTimeline.length > 0 && (
                  <div>
                    <h4 className="font-extrabold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-amber-500" />
                      Timeline Milestones ({matchedTimeline.length})
                    </h4>
                    <div className="space-y-2">
                      {matchedTimeline.map((t) => (
                        <a
                          key={t.id}
                          href="#timeline"
                          onClick={onClose}
                          className="block p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        >
                          <div className="font-bold text-slate-900 dark:text-white text-sm">{t.year}: {t.title}</div>
                          <div className="text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">{t.summary}</div>
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Research Items */}
                {matchedResearch.length > 0 && (
                  <div>
                    <h4 className="font-extrabold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
                      Research Briefs ({matchedResearch.length})
                    </h4>
                    <div className="space-y-2">
                      {matchedResearch.map((r) => (
                        <a
                          key={r.id}
                          href="#research"
                          onClick={onClose}
                          className="block p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        >
                          <div className="font-bold text-slate-900 dark:text-white text-sm">{r.title}</div>
                          <div className="text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">{r.keyFinding}</div>
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* FAQs */}
                {matchedFaqs.length > 0 && (
                  <div>
                    <h4 className="font-extrabold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
                      <HelpCircle className="w-3.5 h-3.5 text-emerald-600" />
                      Frequently Asked Questions ({matchedFaqs.length})
                    </h4>
                    <div className="space-y-2">
                      {matchedFaqs.map((f) => (
                        <a
                          key={f.id}
                          href="#faq"
                          onClick={onClose}
                          className="block p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        >
                          <div className="font-bold text-slate-900 dark:text-white text-sm">{f.question}</div>
                          <div className="text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">{f.keyTakeaway}</div>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Footer Shortcuts */}
          <div className="p-3 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 flex justify-between items-center">
            <span>Press <kbd className="px-1 py-0.5 bg-white dark:bg-slate-800 rounded border">Esc</kbd> to exit</span>
            <span>{totalResults} items indexed</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
