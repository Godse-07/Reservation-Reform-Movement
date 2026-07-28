import React, { useState } from 'react';
import { motion } from 'motion/react';
import { AlertCircle, FileText, CheckCircle2, HelpCircle, ExternalLink, Scale, TrendingUp, Users } from 'lucide-react';
import { STATE_QUOTA_DATA } from '../data/campaignData';

export const KeyConcerns: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<'all' | 'employment' | 'economic' | 'cap' | 'ews'>('all');

  const concerns = [
    {
      id: 'employment-intensity',
      category: 'employment',
      title: 'High Applicant-to-Post Ratios in Unreserved Categories',
      positionText: 'Supporters argue that open merit seats in central services have shrunk relative to the total applicant pool, subjecting general category aspirants to extreme competitive friction.',
      factText: 'Fact: In premier competitive examinations like UPSC CSE and SSC CGL, over 1,500 candidates compete per unreserved seat, while central reservation stands at 59.5%.',
      citation: 'UPSC 73rd Annual Report (2022-23) & SSC Gazette Notifications',
      citationUrl: 'https://upsc.gov.in/',
      isVerified: true
    },
    {
      id: 'economic-distress',
      category: 'economic',
      title: 'Economic Vulnerability Across Non-Reserved Families',
      positionText: 'The movement contends that poverty and lack of capital afflict millions of Indian families regardless of caste identity, necessitating robust economic support mechanisms.',
      factText: 'Fact: The 103rd Constitutional Amendment introduced a 10% EWS quota based on household income (< ₹8 Lakh/year), recognizing economic hardship as an independent affirmative pillar.',
      citation: '103rd Constitutional Amendment Act, 2019 & Ministry of Social Justice',
      citationUrl: 'https://socialjustice.gov.in/',
      isVerified: true
    },
    {
      id: 'periodic-review',
      category: 'cap',
      title: 'Absence of Statutory Periodic Review Commissions',
      positionText: 'Advocates emphasize that without periodic audits every 10 years, quota policies risk becoming permanent static entitlements rather than adaptive upliftment tools.',
      factText: 'Fact: The Constitution originally specified a 10-year limit for political seat reservations under Article 334, but public employment quotas under Article 16(4) lack a fixed statutory sunset or review mandate.',
      citation: 'Constitution of India (Articles 16(4) and 334)',
      citationUrl: 'https://legislative.gov.in/',
      isVerified: true
    },
    {
      id: '50-percent-cap-debate',
      category: 'cap',
      title: 'Divergence Over the 50% Indra Sawhney Constitutional Ceiling',
      positionText: 'Movement position: Exceeding the 50% ceiling threatens to turn open merit into a minority allocation. Proponents of higher quotas argue that local demographics justify breaching the cap.',
      factText: 'Fact: Tamil Nadu enforces 69% reservation; Karnataka enforces 56%+; Patna High Court quashed Bihar’s 65% quota in 2024 (now before Supreme Court).',
      citation: 'Indra Sawhney v. Union of India (1992) & Gaurav Kumar v. State of Bihar (2024)',
      citationUrl: 'https://main.sci.gov.in/',
      isVerified: true
    },
    {
      id: 'ews-bench-split',
      category: 'ews',
      title: 'Caste vs. Economic Criteria: The 3-2 Judicial Split',
      positionText: 'Supporters point out that economic criteria can offer targeted assistance without creating permanent communal divides, as highlighted by arguments in Janhit Abhiyan.',
      factText: 'Fact: In Janhit Abhiyan (2022), a 5-judge Supreme Court bench upheld EWS 3-2, with both majority and dissenting opinions offering deep arguments on equality.',
      citation: 'Janhit Abhiyan v. Union of India, (2023) 5 SCC 1',
      citationUrl: 'https://main.sci.gov.in/',
      isVerified: true
    },
    {
      id: 'data-freshness',
      category: 'economic',
      title: 'Reliance on Historical Demographic Metrics',
      positionText: 'The movement maintains that policy planning requires real-time, transparent socio-economic surveys rather than extrapolating old census estimates.',
      factText: 'Fact: The Mandal Commission (1980) relied on the 1931 census figures to estimate backward class demographics.',
      citation: 'Mandal Commission Report (1980) [PLACEHOLDER — verify before publish]',
      isVerified: false
    }
  ];

  const filteredConcerns = concerns.filter(
    (c) => selectedTab === 'all' || c.category === selectedTab
  );

  return (
    <section id="key-concerns" className="py-20 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-900 dark:text-blue-300 text-xs font-semibold uppercase tracking-wider mb-3">
              <Scale className="w-3.5 h-3.5" />
              <span>Core Viewpoints</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Key Policy Concerns & Legal Debates
            </h2>
            <p className="mt-2 text-base text-slate-600 dark:text-slate-300 max-w-2xl">
              Each viewpoint is explicitly distinguished as the movement's policy stance vs. verified constitutional and empirical facts.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'All Concerns' },
              { id: 'employment', label: 'Competition & Jobs' },
              { id: 'economic', label: 'Economic Criteria' },
              { id: 'cap', label: '50% Cap Debate' },
              { id: 'ews', label: 'EWS Jurisprudence' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id as any)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                  selectedTab === tab.id
                    ? 'bg-blue-900 text-white dark:bg-amber-500 dark:text-slate-950 shadow-xs'
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* State Quota Comparison Highlights Banner */}
        <div className="mt-10 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-700 dark:text-amber-400" />
              <span>Snapshot: States Exceeding the 50% Indra Sawhney Cap</span>
            </h3>
            <span className="text-xs text-slate-500 dark:text-slate-400">Official Judgments & State Gazette Sources</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {STATE_QUOTA_DATA.map((st) => (
              <div
                key={st.state}
                className={`p-3.5 rounded-xl border text-center transition-all ${
                  st.exceedsCap
                    ? 'bg-amber-50/50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800/50'
                    : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800'
                }`}
              >
                <div className="text-xs font-medium text-slate-600 dark:text-slate-400 truncate" title={st.state}>
                  {st.state}
                </div>
                <div
                  className={`text-2xl font-extrabold mt-1 ${
                    st.exceedsCap
                      ? 'text-amber-700 dark:text-amber-400'
                      : 'text-blue-900 dark:text-blue-300'
                  }`}
                >
                  {st.totalQuota}%
                </div>
                <div className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 mt-1">
                  {st.exceedsCap ? 'Exceeds Cap' : 'At Ceiling Cap'}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Concern Cards Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredConcerns.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header Tag */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    Movement Viewpoint
                  </span>
                  {item.isVerified ? (
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                      <CheckCircle2 className="w-3 h-3" />
                      Verified Data
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/80 px-2 py-0.5 rounded border border-amber-200 dark:border-amber-800">
                      <AlertCircle className="w-3 h-3" />
                      Source Required
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-snug">
                  {item.title}
                </h3>

                {/* Stance Box */}
                <div className="mt-4 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                  <p className="text-xs text-slate-700 dark:text-slate-300 italic leading-relaxed">
                    "{item.positionText}"
                  </p>
                </div>

                {/* Sourced Fact Box */}
                <div className="mt-3 p-3 rounded-xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50">
                  <p className="text-xs font-medium text-slate-800 dark:text-slate-200 leading-relaxed">
                    <strong className="text-blue-900 dark:text-blue-300">Sourced Fact:</strong> {item.factText}
                  </p>
                </div>
              </div>

              {/* Citation Footer */}
              <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <span className="truncate pr-2 font-mono text-[11px]" title={item.citation}>
                  Cite: {item.citation}
                </span>
                {item.citationUrl && (
                  <a
                    href={item.citationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 dark:text-amber-400 hover:underline flex items-center gap-0.5 whitespace-nowrap text-[11px] font-semibold"
                  >
                    <span>Link</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
