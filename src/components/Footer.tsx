import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Scale, ArrowUp, Send, ShieldCheck, Heart, BookOpen, Instagram } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-white pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-800 text-amber-400 flex items-center justify-center font-bold shadow-md">
                <Scale className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <span className="font-extrabold text-lg text-white tracking-tight">
                  Reservation Policy Reform
                </span>
                <p className="text-xs text-slate-400">Constitutional Public Interest Forum</p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Advocating for peaceful, evidence-based review, periodic statutory audits, and balanced opportunity under the Constitution of India.
            </p>

            {/* Newsletter */}
            <div className="pt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block mb-2">
                Subscribe to Research Updates
              </span>
              {subscribed ? (
                <div className="p-2.5 rounded-xl bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-xs font-medium">
                  Thank you for subscribing to our research dispatch!
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex items-center gap-2 max-w-sm">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 text-xs font-bold rounded-xl bg-amber-500 text-slate-950 hover:bg-amber-400 transition-colors shrink-0 cursor-pointer"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Quick Nav Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-4">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#about" className="hover:text-amber-400 transition-colors">About Forum</a></li>
              <li><a href="#key-concerns" className="hover:text-amber-400 transition-colors">Key Viewpoints</a></li>
              <li><a href="#research" className="hover:text-amber-400 transition-colors">Research & Data</a></li>
              <li><a href="#constitutional" className="hover:text-amber-400 transition-colors">Constitutional Law</a></li>
              <li><a href="#timeline" className="hover:text-amber-400 transition-colors">Historical Timeline</a></li>
            </ul>
          </div>

          {/* Legal Standards */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-4">
              Standards & Code
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#guidelines" className="hover:text-amber-400 transition-colors">Peaceful Guidelines</a></li>
              <li><a href="#faq" className="hover:text-amber-400 transition-colors">FAQ & Clarity</a></li>
              <li><a href="#join" className="hover:text-amber-400 transition-colors">Sign Citizen Pledge</a></li>
              <li><a href="https://www.sci.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors">Supreme Court Portal</a></li>
            </ul>
          </div>

          {/* Contact & Legal */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-4">
              Contact & Socials
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              Public Interest Queries:
              <br />
              <strong className="text-slate-200 font-mono">contact@reservationreform.org</strong>
            </p>

            <div className="pt-1 mb-3">
              <span className="text-[11px] font-semibold text-slate-400 block mb-2">Follow Movement:</span>
              <a
                href="https://www.instagram.com/reservationhataomovement/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-amber-400 border border-slate-800 text-xs transition-colors"
              >
                <Instagram className="w-4 h-4 text-pink-500" />
                <span>Instagram Profile</span>
              </a>
            </div>

            <div className="flex items-center gap-2 text-xs text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>Registered Peaceful Forum</span>
            </div>
          </div>
        </div>

        {/* Verbatim Legal Disclaimer */}
        <div className="mt-12 pt-8 border-t border-slate-900 text-slate-400 text-xs leading-relaxed space-y-4">
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
            <strong className="text-amber-400 block mb-1 text-xs uppercase tracking-wider font-bold">
              Mandatory Legal Disclaimer
            </strong>
            <p className="text-[11px] sm:text-xs text-slate-300">
              "This website represents the views of the movement. Public policy regarding reservation is a complex and evolving issue. Readers are encouraged to consult official government data, court judgments, and academic research. The movement advocates peaceful, lawful, and respectful democratic engagement and opposes harassment, hatred, or violence toward any individual or community."
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <p className="text-[11px] text-slate-500">
              © {new Date().getFullYear()} Reservation Policy Reform Movement. Built for constitutional advocacy and peaceful democratic engagement.
            </p>

            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-xs font-semibold text-slate-300 transition-colors cursor-pointer"
            >
              <span>Scroll to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
