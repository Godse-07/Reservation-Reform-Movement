import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Scale, BookOpen, ExternalLink, CheckCircle2, ChevronDown, ChevronUp, FileText, AlertCircle } from 'lucide-react';
import { CONSTITUTIONAL_CASES } from '../data/campaignData';

export const ConstitutionalSection: React.FC = () => {
  const [expandedCaseId, setExpandedCaseId] = useState<string | null>('indra-sawhney-1992');

  const articles = [
    {
      num: 'Article 15',
      title: 'Prohibition of Discrimination on Grounds of Religion, Race, Caste, Sex or Place of Birth',
      clauseText: 'Art 15(4) empowers the State to make special provisions for socially and educationally backward classes or SC/STs. Art 15(6) (added by 103rd Amendment 2019) enables up to 10% reservation for Economically Weaker Sections (EWS).',
      citation: 'Constitution of India, Art 15(4) & 15(6)'
    },
    {
      num: 'Article 16',
      title: 'Equality of Opportunity in Matters of Public Employment',
      clauseText: 'Art 16(1) guarantees equality of opportunity for all citizens. Art 16(4) permits reservation of posts for any backward class not adequately represented. Art 16(6) enables up to 10% EWS reservation in public jobs.',
      citation: 'Constitution of India, Art 16(1), 16(4), 16(6)'
    },
    {
      num: 'Article 46',
      title: 'Promotion of Educational and Economic Interests of SCs, STs, and Other Weaker Sections',
      clauseText: 'A Directive Principle of State Policy instructing the State to promote with special care the educational and economic interests of weaker sections of the people.',
      citation: 'Constitution of India, Directive Principles, Art 46'
    }
  ];

  return (
    <section id="constitutional" className="py-20 bg-slate-50 dark:bg-slate-950 border-t border-slate-200/80 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-900 dark:text-blue-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Scale className="w-3.5 h-3.5 text-blue-700 dark:text-amber-400" />
            <span>Constitutional Framework</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Key Articles & Supreme Court Precedents
          </h2>
          <p className="mt-4 text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Neutral summaries of primary constitutional texts and landmark judgments. Readers are encouraged to inspect official Gazette notifications and full judgment PDFs directly.
          </p>
        </div>

        {/* Primary Constitutional Articles Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((art) => (
            <div
              key={art.num}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs flex flex-col justify-between"
            >
              <div>
                <span className="inline-block px-3 py-1 text-xs font-extrabold rounded bg-blue-900 text-white dark:bg-amber-500 dark:text-slate-950 mb-3">
                  {art.num}
                </span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                  {art.title}
                </h3>
                <p className="mt-3 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {art.clauseText}
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] font-mono text-slate-500 dark:text-slate-400">
                Cite: {art.citation}
              </div>
            </div>
          ))}
        </div>

        {/* Landmark Case Jurisprudence Cards */}
        <div className="mt-16">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-blue-800 dark:text-amber-400" />
              <span>Landmark Supreme Court Judgments</span>
            </h3>
            <span className="text-xs text-slate-500 dark:text-slate-400">Official Supreme Court Law Reports</span>
          </div>

          <div className="space-y-4">
            {CONSTITUTIONAL_CASES.map((item) => {
              const isExpanded = expandedCaseId === item.id;
              return (
                <div
                  key={item.id}
                  className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setExpandedCaseId(isExpanded ? null : item.id)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/50 dark:hover:bg-slate-800/40"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                      <span className="px-3 py-1 rounded-lg text-xs font-extrabold bg-blue-100 dark:bg-blue-950 text-blue-900 dark:text-blue-300 w-fit shrink-0">
                        {item.year} Verdict
                      </span>
                      <div>
                        <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                          {item.title}
                        </h4>
                        <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mt-1">
                          <span>{item.benchSize}</span>
                          <span>•</span>
                          <span className="font-semibold text-amber-700 dark:text-amber-400">{item.verdictRatio}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-slate-400">
                      <span className="text-xs font-semibold hidden sm:inline text-slate-500">
                        {isExpanded ? 'Collapse' : 'Inspect Case'}
                      </span>
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </div>
                  </button>

                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="px-6 pb-6 pt-2 border-t border-slate-100 dark:border-slate-800 space-y-4 text-xs text-slate-700 dark:text-slate-300"
                    >
                      <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                        <strong className="text-slate-900 dark:text-white text-sm block mb-1">Key Legal Holding:</strong>
                        <p className="leading-relaxed">{item.keyHolding}</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 rounded-xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50">
                          <strong className="text-blue-900 dark:text-blue-300 block mb-1">Majority Opinion Summary:</strong>
                          <p className="leading-relaxed">{item.majorityOpinion}</p>
                        </div>

                        {item.dissentingOpinion && (
                          <div className="p-4 rounded-xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/50">
                            <strong className="text-amber-900 dark:text-amber-300 block mb-1">Dissenting Opinion Note:</strong>
                            <p className="leading-relaxed">{item.dissentingOpinion}</p>
                          </div>
                        )}
                      </div>

                      <div className="p-4 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/40">
                        <strong className="text-indigo-900 dark:text-indigo-300 block mb-1">Movement's Legal Viewpoint:</strong>
                        <p className="italic leading-relaxed">{item.movementPerspective}</p>
                      </div>

                      <div className="flex items-center justify-between pt-2 text-[11px] text-slate-500 dark:text-slate-400">
                        <span className="font-mono">Citation: {item.citation}</span>
                        {item.officialDocUrl && (
                          <a
                            href={item.officialDocUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-700 dark:text-amber-400 font-semibold hover:underline flex items-center gap-1"
                          >
                            <span>Read Full Official PDF Judgment</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Primary Source Encouragement Banner */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6 border-2 border-amber-500/40 shadow-xl relative overflow-hidden">
          <div className="flex items-start sm:items-center gap-4 relative z-10">
            <div className="w-12 h-12 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold shrink-0 shadow-md">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <div className="inline-block px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 mb-1">
                Official Verification Notice
              </div>
              <h4 className="text-xl font-extrabold text-white">Always Consult Primary Constitutional Sources</h4>
              <p className="text-xs sm:text-sm text-slate-200 mt-1 max-w-2xl leading-relaxed">
                We strongly advise readers to inspect full Supreme Court reports and Parliamentary Gazette notifications directly rather than relying on secondary commentary.
              </p>
            </div>
          </div>
          <a
            href="https://www.sci.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs uppercase tracking-wider whitespace-nowrap shadow-md transition-all shrink-0 flex items-center gap-2 cursor-pointer relative z-10"
          >
            <span>Visit Supreme Court Portal</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};
