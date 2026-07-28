import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Clock, Calendar, CheckCircle2, AlertCircle, ExternalLink, ChevronRight, Scale } from 'lucide-react';
import { TIMELINE_EVENTS } from '../data/campaignData';

export const TimelineSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeEventId, setActiveEventId] = useState<string | null>(null);

  const categories = ['All', 'Constitutional Amendment', 'Supreme Court Landmark', 'Commission Report', 'State Legislation'];

  const filteredEvents = TIMELINE_EVENTS.filter(
    (evt) => selectedCategory === 'All' || evt.category === selectedCategory
  );

  return (
    <section id="timeline" className="py-20 bg-white dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-900 dark:text-blue-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Clock className="w-3.5 h-3.5" />
            <span>Interactive Timeline</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Historical Trajectory of Indian Reservation Policy
          </h2>
          <p className="mt-4 text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            A chronological timeline of constitutional enactments, commission reports, and Supreme Court jurisprudence from 1950 to present-day state quota disputes.
          </p>
        </div>

        {/* Category Filters */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-blue-900 text-white dark:bg-amber-500 dark:text-slate-950 shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Vertical Timeline Tree */}
        <div className="mt-16 relative">
          {/* Central Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-800 -translate-x-1/2" />

          <div className="space-y-12">
            {filteredEvents.map((evt, idx) => {
              const isEven = idx % 2 === 0;
              const isActive = activeEventId === evt.id;

              return (
                <div
                  key={evt.id}
                  className={`relative flex flex-col md:flex-row items-start ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline Badge Dot */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 z-10 w-9 h-9 rounded-full bg-blue-900 dark:bg-amber-500 text-white dark:text-slate-950 flex items-center justify-center font-black text-xs shadow-md border-4 border-white dark:border-slate-900">
                    {evt.year.slice(2)}
                  </div>

                  {/* Card Content Block */}
                  <div className={`ml-12 md:ml-0 md:w-1/2 ${isEven ? 'md:pr-12' : 'md:pl-12'} w-full`}>
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 shadow-2xs transition-all"
                    >
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-xs font-bold text-amber-700 dark:text-amber-400 font-mono">
                          {evt.dateStr || evt.year}
                        </span>
                        <span className="px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded bg-blue-100 dark:bg-blue-950 text-blue-900 dark:text-blue-300">
                          {evt.category}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                        {evt.title}
                      </h3>

                      <p className="mt-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        {evt.summary}
                      </p>

                      {/* Expandable Details */}
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 space-y-2 text-xs text-slate-700 dark:text-slate-300"
                        >
                          <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                            <strong className="text-blue-900 dark:text-amber-400 block mb-1">Key Constitutional Impact:</strong>
                            <p>{evt.details}</p>
                          </div>
                          <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200">
                            <strong>Key Outcome:</strong> {evt.keyOutcome}
                          </div>
                        </motion.div>
                      )}

                      <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                        <span className="font-mono truncate pr-2">Cite: {evt.citation}</span>
                        <button
                          onClick={() => setActiveEventId(isActive ? null : evt.id)}
                          className="text-blue-700 dark:text-amber-400 font-bold hover:underline flex items-center gap-1 cursor-pointer shrink-0"
                        >
                          <span>{isActive ? 'Hide Details' : 'Full Milestone'}</span>
                          <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isActive ? 'rotate-90' : ''}`} />
                        </button>
                      </div>
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
