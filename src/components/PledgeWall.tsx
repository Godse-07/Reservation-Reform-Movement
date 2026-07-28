import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { motion, useMotionValue, useTransform, animate } from "motion/react";
import {
  Users,
  Quote,
  MapPin,
  Briefcase,
  Copy,
  Search,
  Filter,
  RefreshCw,
  ScrollText,
} from "lucide-react";
import { PledgeRecord } from "../types";
import {
  fetchPublicPledges,
  getCanonicalPledgeStatement,
} from "../utils/pledgeStore";

/**
 * Why the marquee no longer runs on a single (or short) pledge list:
 *
 * Previously, any list under 5 pledges was force-duplicated 4x and set
 * scrolling — so even ONE pledge would loop past you forever, which reads
 * as a bug ("why is this repeating itself?") rather than a feature.
 *
 * Now: we measure the actual rendered width of one un-duplicated row of
 * cards against the width of the section. Only if that row is wider than
 * the viewport (i.e. it genuinely cannot fit on screen) do we switch into
 * the duplicated, infinitely-scrolling marquee. Otherwise the pledges are
 * shown once, statically, centered — no animation, because there's nothing
 * to scroll to.
 */

const AnimatedCounter: React.FC<{ value: number }> = ({ value }) => {
  const motionVal = useMotionValue(0);
  const rounded = useTransform(motionVal, (v) =>
    Math.round(v).toLocaleString("en-IN"),
  );
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    const controls = animate(motionVal, value, {
      duration: 1.1,
      ease: "easeOut",
    });
    const unsub = rounded.on("change", (v) => setDisplay(v));
    return () => {
      controls.stop();
      unsub();
    };
  }, [value]);

  return <span>{display}</span>;
};

export const PledgeWall: React.FC = () => {
  const [pledges, setPledges] = useState<PledgeRecord[]>([]);
  const [isPaused, setIsPaused] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [filterState, setFilterState] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [needsScroll, setNeedsScroll] = useState(false);
  const [rowWidth, setRowWidth] = useState(0);

  const viewportRef = useRef<HTMLDivElement>(null);
  const measureRowRef = useRef<HTMLDivElement>(null);

  const loadPledges = async () => {
    setIsRefreshing(true);
    try {
      const data = await fetchPublicPledges();
      setPledges(data);
    } catch (err) {
      console.warn("Error fetching pledges:", err);
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    loadPledges();
    const pollInterval = setInterval(loadPledges, 120000);
    const handleUpdate = () => loadPledges();

    if (typeof window !== "undefined") {
      window.addEventListener("prm-pledges-updated", handleUpdate);

      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setPrefersReducedMotion(mediaQuery.matches);
      const handleChange = (e: MediaQueryListEvent) =>
        setPrefersReducedMotion(e.matches);
      if (mediaQuery.addEventListener)
        mediaQuery.addEventListener("change", handleChange);
      else mediaQuery.addListener(handleChange);

      return () => {
        clearInterval(pollInterval);
        window.removeEventListener("prm-pledges-updated", handleUpdate);
        if (mediaQuery.removeEventListener)
          mediaQuery.removeEventListener("change", handleChange);
        else mediaQuery.removeListener(handleChange);
      };
    }
  }, []);

  const handleCopyStatement = (p: PledgeRecord) => {
    const textToCopy = getCanonicalPledgeStatement(p.fullName, p.id);
    navigator.clipboard.writeText(textToCopy);
    setCopiedId(p.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredPledges = pledges.filter((p) => {
    const matchesState = filterState === "All" || p.state === filterState;
    const q = searchQuery.trim().toLowerCase();
    const matchesQuery =
      q === "" ||
      p.fullName.toLowerCase().includes(q) ||
      p.id.toLowerCase().includes(q) ||
      p.state.toLowerCase().includes(q) ||
      p.profession.toLowerCase().includes(q);
    return matchesState && matchesQuery;
  });

  const availableStates = [
    "All",
    ...Array.from(new Set(pledges.map((p) => p.state))),
  ];

  // Measure: does one un-duplicated row of cards overflow the viewport?
  useLayoutEffect(() => {
    const measure = () => {
      const viewportWidth = viewportRef.current?.clientWidth ?? 0;
      const contentWidth = measureRowRef.current?.scrollWidth ?? 0;
      setRowWidth(contentWidth);
      setNeedsScroll(contentWidth > viewportWidth + 4); // small tolerance
    };

    measure();
    const ro = new ResizeObserver(measure);
    if (viewportRef.current) ro.observe(viewportRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [
    filteredPledges.length,
    JSON.stringify(filteredPledges.map((p) => p.id)),
  ]);

  const shouldAnimate =
    needsScroll && !prefersReducedMotion && filteredPledges.length > 0;
  // Speed-normalized duration so scroll pace feels consistent regardless of how many cards there are
  const marqueeDuration = Math.max(18, rowWidth / 55);

  return (
    <section
      id="pledges"
      className="py-20 bg-slate-50/60 dark:bg-slate-950/60 border-t border-slate-200/80 dark:border-slate-800 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 text-[11px] font-semibold uppercase tracking-wider mb-4 border border-amber-200/80 dark:border-amber-800/70">
            <ScrollText className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span>Pledge Wall</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#0B2545] dark:text-white tracking-tight">
            Voices of the Movement
          </h2>

          <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Every signed pledge is recorded with a permanent reference (
            <span className="font-mono font-semibold text-[#0B2545] dark:text-amber-400">
              PRM-XXXXXX-YYYY
            </span>
            ) — real citizens advocating for evidence-based reservation policy
            reform in India.
          </p>

          {/* Total count stat */}
          <div className="mt-6 flex flex-col items-center gap-2">
            <div className="inline-flex items-center gap-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 px-5 py-3 shadow-sm">
              <Users className="w-4 h-4 text-[#0B2545] dark:text-amber-400" />
              <span className="font-serif text-xl font-semibold text-[#0B2545] dark:text-white tabular-nums">
                <AnimatedCounter value={pledges.length} />
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                pledges signed so far
              </span>
              {(searchQuery || filterState !== "All") && (
                <span className="text-xs text-slate-400 dark:text-slate-500 border-l border-slate-200 dark:border-slate-700 pl-2.5 ml-0.5">
                  showing {filteredPledges.length}
                </span>
              )}
            </div>

            <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/80 px-3 py-1">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
              </span>
              <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-300">
                Live — updates within 2 minutes
              </span>
            </div>
          </div>

          {/* Search, Filter & Refresh Bar */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-2xl mx-auto">
            <div className="relative w-full sm:w-2/3">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search by name, state, or Ref ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0B2545]/30 dark:focus:ring-amber-500/40 shadow-sm"
              />
            </div>

            <div className="relative w-full sm:w-1/3 flex gap-2">
              <div className="relative w-full">
                <Filter className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                <select
                  value={filterState}
                  onChange={(e) => setFilterState(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0B2545]/30 dark:focus:ring-amber-500/40 shadow-sm cursor-pointer appearance-none"
                >
                  {availableStates.map((st) => (
                    <option key={st} value={st}>
                      {st === "All" ? "All States / UTs" : st}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={loadPledges}
                disabled={isRefreshing}
                className="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400 hover:border-amber-300 dark:hover:border-amber-500/40 transition-colors shrink-0"
                title="Refresh pledge wall"
              >
                <RefreshCw
                  className={`w-4 h-4 ${isRefreshing ? "animate-spin text-amber-500" : ""}`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {filteredPledges.length === 0 ? (
        <div className="max-w-md mx-auto text-center py-12 px-6">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {pledges.length === 0
              ? "No pledges yet — be the first to sign."
              : "No pledges match your search or filter."}
          </p>
        </div>
      ) : (
        <div ref={viewportRef} className="relative w-full overflow-hidden py-4">
          {/* Gradient edge fades — only meaningful once content actually scrolls */}
          {shouldAnimate && (
            <>
              <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-slate-50 dark:from-slate-950 to-transparent z-20 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-slate-50 dark:from-slate-950 to-transparent z-20 pointer-events-none" />
            </>
          )}

          {/* Hidden measuring row: exactly one, un-duplicated set of cards */}
          <div
            ref={measureRowRef}
            className="flex gap-6 w-max absolute opacity-0 pointer-events-none -z-10"
            aria-hidden="true"
          >
            {filteredPledges.map((p) => (
              <PledgeCard
                key={`measure-${p.id}`}
                pledge={p}
                onCopy={() => {}}
                isCopied={false}
              />
            ))}
          </div>

          {shouldAnimate ? (
            <div
              className="flex gap-6 w-max"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              onTouchStart={() => setIsPaused(true)}
              onTouchEnd={() => setIsPaused(false)}
            >
              <div
                className={
                  isPaused
                    ? "flex gap-6 prm-marquee-paused"
                    : "flex gap-6 prm-marquee-running"
                }
                style={{
                  animationName: "prmMarqueeScroll",
                  animationDuration: `${marqueeDuration}s`,
                  animationTimingFunction: "linear",
                  animationIterationCount: "infinite",
                }}
              >
                {[...filteredPledges, ...filteredPledges].map((p, idx) => (
                  <PledgeCard
                    key={`${p.id}-${idx}`}
                    pledge={p}
                    onCopy={() => handleCopyStatement(p)}
                    isCopied={copiedId === p.id}
                  />
                ))}
              </div>
            </div>
          ) : (
            // Fits on screen — show once, statically, centered. No animation, no duplication.
            <div className="flex flex-wrap gap-6 justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {filteredPledges.map((p) => (
                <PledgeCard
                  key={p.id}
                  pledge={p}
                  onCopy={() => handleCopyStatement(p)}
                  isCopied={copiedId === p.id}
                />
              ))}
            </div>
          )}
        </div>
      )}

      <style>{`
        @keyframes prmMarqueeScroll {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .prm-marquee-running { animation-play-state: running; }
        .prm-marquee-paused { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) {
          .prm-marquee-running, .prm-marquee-paused { animation: none !important; }
        }
      `}</style>
    </section>
  );
};

interface PledgeCardProps {
  pledge: PledgeRecord;
  onCopy: () => void;
  isCopied: boolean;
}

const PledgeCard: React.FC<PledgeCardProps> = ({
  pledge,
  onCopy,
  isCopied,
}) => {
  return (
    <div className="w-[340px] sm:w-[380px] shrink-0 p-6 rounded-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200/90 dark:border-slate-800 shadow-md hover:shadow-lg dark:hover:border-amber-500/40 transition-shadow flex flex-col justify-between group relative overflow-hidden select-none">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0B2545] to-amber-500" />

      <div>
        <div className="flex items-start justify-between gap-2 mb-3">
          <div>
            <h4 className="font-serif text-base font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
              <span>{pledge.fullName}</span>
              {pledge.isSample && (
                <span className="text-[10px] font-medium text-slate-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">
                  Sample
                </span>
              )}
            </h4>

            <div className="flex flex-wrap items-center gap-2 mt-1 text-[11px] text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-amber-500" />
                <span>{pledge.state}</span>
              </span>
              {pledge.profession && (
                <>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Briefcase className="w-3 h-3 text-[#0B2545] dark:text-blue-400" />
                    <span className="truncate max-w-[140px]">
                      {pledge.profession}
                    </span>
                  </span>
                </>
              )}
            </div>
          </div>

          <span className="shrink-0 px-2.5 py-1 text-[11px] font-mono font-semibold rounded-md bg-amber-50 dark:bg-amber-950/70 text-amber-900 dark:text-amber-300 border border-amber-200 dark:border-amber-800/70">
            {pledge.id}
          </span>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60 my-3 text-xs text-slate-700 dark:text-slate-200 leading-relaxed relative">
          <Quote className="w-4 h-4 text-amber-500/30 absolute top-2 right-2" />
          <p className="italic">
            "{getCanonicalPledgeStatement(pledge.fullName, pledge.id)}"
          </p>
          {pledge.message && (
            <p className="mt-2 pt-2 border-t border-slate-200/80 dark:border-slate-700/60 not-italic text-[11px] text-slate-600 dark:text-slate-300">
              <strong className="text-slate-800 dark:text-slate-200">
                Comment:
              </strong>{" "}
              "{pledge.message}"
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800/80 text-[11px]">
        <span className="text-slate-400 dark:text-slate-500">
          Pledged: {pledge.date}
        </span>
        <button
          onClick={onCopy}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-700 dark:text-slate-300 font-medium transition-colors"
          title="Copy canonical pledge statement"
        >
          <Copy className="w-3 h-3" />
          <span>{isCopied ? "Copied!" : "Copy"}</span>
        </button>
      </div>
    </div>
  );
};
