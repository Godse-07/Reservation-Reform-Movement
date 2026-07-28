import React from 'react';
import { motion } from 'motion/react';
import {
  ShieldAlert,
  Heart,
  Ban,
  UserX,
  Scale,
  BookOpen,
  MessageSquare,
  CheckCircle2,
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';
import { PEACEFUL_GUIDELINES } from '../data/campaignData';

export const PeacefulGuidelines: React.FC = () => {
  const iconMap: Record<string, React.ReactNode> = {
    Heart: <Heart className="w-5 h-5 text-rose-600 dark:text-rose-400" />,
    ShieldAlert: <ShieldAlert className="w-5 h-5 text-amber-600 dark:text-amber-400" />,
    Ban: <Ban className="w-5 h-5 text-red-600 dark:text-red-400" />,
    UserX: <UserX className="w-5 h-5 text-purple-600 dark:text-purple-400" />,
    Scale: <Scale className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
    BookOpen: <BookOpen className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />,
    MessageSquare: <MessageSquare className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
    CheckCircle2: <CheckCircle2 className="w-5 h-5 text-teal-600 dark:text-teal-400" />
  };

  return (
    <section id="guidelines" className="py-20 bg-slate-50 dark:bg-slate-950 border-t border-slate-200/80 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider mb-3">
            <ShieldCheck className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
            <span>Mandatory Code of Conduct</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Peaceful & Democratic Engagement Guidelines
          </h2>
          <p className="mt-4 text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            All supporters, volunteers, and participants must strictly adhere to these 8 binding principles.
            Our movement rejects violence, hostility, and hate speech in every form.
          </p>
        </div>

        {/* 8 Principles Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PEACEFUL_GUIDELINES.map((guide, idx) => (
            <motion.div
              key={guide.title}
              whileHover={{ y: -3 }}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                    {iconMap[guide.iconName] || <CheckCircle2 className="w-5 h-5 text-blue-600" />}
                  </div>
                  <span className="text-xs font-mono font-extrabold text-slate-400">
                    0{idx + 1}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {guide.title}
                </h3>
                <p className="mt-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {guide.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Binding Campaign Standard</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Verbatim Binding Pledge Declaration Card */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-emerald-950 via-slate-900 to-blue-950 text-white border border-emerald-800/60 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center font-bold shrink-0">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Our Binding Commitment to Peaceful Advocacy</h3>
              <p className="mt-1 text-xs text-slate-200 max-w-2xl leading-relaxed">
                "We advocate for reservation policy review purely through constitutional, legal, and intellectual channels.
                Any individual or organization engaging in hate speech, violence, harassment, or discrimination is explicitly disowned by this movement."
              </p>
            </div>
          </div>
          <a
            href="#join"
            className="px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider whitespace-nowrap shadow transition-colors shrink-0"
          >
            Sign Peaceful Pledge
          </a>
        </div>
      </div>
    </section>
  );
};
