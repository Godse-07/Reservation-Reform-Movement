import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";
import {
  BarChart3,
  PieChart as PieIcon,
  LineChart as LineIcon,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  BookOpen,
  Filter,
  Search,
  Calculator,
  Info,
} from "lucide-react";
import {
  NATIONAL_QUOTA_BREAKDOWN,
  STATE_QUOTA_DATA,
  HISTORICAL_QUOTA_TIMELINE,
  RESEARCH_ITEMS,
} from "../data/campaignData";

export const ResearchDataSection: React.FC = () => {
  const [activeChart, setActiveChart] = useState<"pie" | "bar" | "line">("pie");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string>("All");

  // Track dark mode for Recharts distinct palette variants
  const [isDarkMode, setIsDarkMode] = useState(() =>
    typeof document !== "undefined"
      ? document.documentElement.classList.contains("dark")
      : false,
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  // Theme-aware chart colors
  const pieColorsDark = ["#38BDF8", "#60A5FA", "#818CF8", "#F59E0B", "#34D399"];
  const pieColorsLight = [
    "#003366",
    "#2563EB",
    "#3B82F6",
    "#D97706",
    "#0284C7",
  ];
  const currentPieColors = isDarkMode ? pieColorsDark : pieColorsLight;

  const tickColor = isDarkMode ? "#94A3B8" : "#475569";
  const gridColor = isDarkMode ? "#334155" : "#E2E8F0";

  // Simulator State
  const [applicantCount, setApplicantCount] = useState<number>(1000000); // 10 Lakh applicants
  const [totalPosts, setTotalPosts] = useState<number>(1000); // 1000 posts

  const tags = [
    "All",
    "UPSC",
    "Employment",
    "EWS",
    "Indra Sawhney",
    "50% Cap",
    "Higher Education",
  ];

  const filteredResearch = RESEARCH_ITEMS.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.keyFinding.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = selectedTag === "All" || item.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  // Calculate competition metrics
  const reservedPosts = Math.round(totalPosts * 0.595); // 59.5%
  const openPosts = totalPosts - reservedPosts; // 40.5%
  const openAppsPerSeat = Math.round((applicantCount * 0.75) / openPosts); // ~75% general/open applicants competing for open seats

  return (
    <section
      id="research"
      className="py-20 bg-white dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-900 dark:text-blue-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Research & Data Vault</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Empirical Quota Statistics & Legal Charts
          </h2>
          <p className="mt-4 text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            All visual datasets ship with official gazette notifications, law
            reports, or UPSC annual report citations. Items awaiting further
            primary audit bear an explicit{" "}
            <span className="font-semibold text-amber-700 dark:text-amber-400">
              Source Required
            </span>{" "}
            flag.
          </p>
        </div>

        {/* Chart Selector Tabs */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => setActiveChart("pie")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
              activeChart === "pie"
                ? "bg-blue-900 text-white dark:bg-amber-500 dark:text-slate-950 shadow-md"
                : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
            }`}
          >
            <PieIcon className="w-4 h-4" />
            <span>Union Category Quota Breakdown (59.5%)</span>
          </button>

          <button
            onClick={() => setActiveChart("bar")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
              activeChart === "bar"
                ? "bg-blue-900 text-white dark:bg-amber-500 dark:text-slate-950 shadow-md"
                : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>State-wise Quota Cap Breaches</span>
          </button>

          <button
            onClick={() => setActiveChart("line")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
              activeChart === "line"
                ? "bg-blue-900 text-white dark:bg-amber-500 dark:text-slate-950 shadow-md"
                : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
            }`}
          >
            <LineIcon className="w-4 h-4" />
            <span>Historical Quota Expansion Trajectory</span>
          </button>
        </div>

        {/* Active Chart Display Container */}
        <div className="mt-8 p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 shadow-2xs">
          {activeChart === "pie" && (
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    Union Government Category Allocation Breakdown
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Source: Ministry of Social Justice & Empowerment Gazette
                    Notifications (59.5% Reserved vs 40.5% Unreserved)
                  </p>
                </div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300/60">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Verified Gazette Source
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 h-[320px] sm:h-[380px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={NATIONAL_QUOTA_BREAKDOWN}
                        cx="50%"
                        cy="50%"
                        innerRadius={70}
                        outerRadius={120}
                        paddingAngle={3}
                        dataKey="percentage"
                        label={(props: any) =>
                          `${props.name}: ${props.percentage}%`
                        }
                      >
                        {NATIONAL_QUOTA_BREAKDOWN.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={
                              currentPieColors[index % currentPieColors.length]
                            }
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value: any) => [`${value}%`, "Quota"]}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="lg:col-span-5 space-y-3">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                    Category Breakdown Legend
                  </h4>
                  {NATIONAL_QUOTA_BREAKDOWN.map((item, idx) => (
                    <div
                      key={item.name}
                      className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className="w-3.5 h-3.5 rounded-full"
                          style={{
                            backgroundColor:
                              currentPieColors[idx % currentPieColors.length],
                          }}
                        />
                        <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                          {item.name}
                        </span>
                      </div>
                      <span className="text-sm font-extrabold text-slate-900 dark:text-white font-mono">
                        {item.percentage}%
                      </span>
                    </div>
                  ))}
                  <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 text-xs text-blue-900 dark:text-blue-200">
                    <strong>Note:</strong> Total reserved category allocation
                    equals 59.5%. Open seats (40.5%) are open to all candidates
                    strictly on individual merit performance.
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeChart === "bar" && (
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    State Quotas vs 50% Indra Sawhney Ceiling Cap
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Comparison of state reservation enactments currently
                    challenged before Constitution Benches
                  </p>
                </div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300/60">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Sourced from Official Judgments
                </span>
              </div>

              <div className="h-[340px] sm:h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={STATE_QUOTA_DATA}
                    margin={{ top: 20, right: 30, left: 10, bottom: 60 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke={gridColor}
                      opacity={0.5}
                    />
                    <XAxis
                      dataKey="state"
                      angle={-20}
                      textAnchor="end"
                      tick={{ fontSize: 11, fill: tickColor }}
                      interval={0}
                    />
                    <YAxis
                      domain={[0, 80]}
                      tick={{ fontSize: 11, fill: tickColor }}
                      tickFormatter={(val) => `${val}%`}
                    />
                    <Tooltip
                      formatter={(value: any) => [`${value}%`, "Total Quota"]}
                    />
                    <Bar
                      dataKey="totalQuota"
                      fill={isDarkMode ? "#60A5FA" : "#1E3A8A"}
                      radius={[6, 6, 0, 0]}
                    >
                      {STATE_QUOTA_DATA.map((entry, index) => (
                        <Cell
                          key={`bar-${index}`}
                          fill={
                            entry.exceedsCap
                              ? isDarkMode
                                ? "#F59E0B"
                                : "#D97706"
                              : isDarkMode
                                ? "#38BDF8"
                                : "#2563EB"
                          }
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-600 dark:text-slate-400 pt-4 border-t border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded bg-blue-600 inline-block" />
                    At or below 50% Ceiling Cap
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded bg-amber-600 inline-block" />
                    Exceeds 50% Ceiling Cap (Under SC Challenge)
                  </span>
                </div>
                <span className="font-mono text-[11px]">
                  Indra Sawhney (1992) Benchmark: 50% Ceiling
                </span>
              </div>
            </div>
          )}

          {activeChart === "line" && (
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    Historical Expansion Trajectory of Central Quotas (1950 -
                    Present)
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Evolution from 22.5% initial SC/ST allocation to 59.5% total
                    central quota
                  </p>
                </div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300/60">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Constitutional Amendment History
                </span>
              </div>

              <div className="h-[340px] sm:h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={HISTORICAL_QUOTA_TIMELINE}
                    margin={{ top: 20, right: 30, left: 10, bottom: 20 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke={gridColor}
                      opacity={0.5}
                    />
                    <XAxis
                      dataKey="year"
                      tick={{ fontSize: 12, fill: tickColor }}
                    />
                    <YAxis
                      domain={[0, 80]}
                      tick={{ fontSize: 12, fill: tickColor }}
                      tickFormatter={(val) => `${val}%`}
                    />
                    <Tooltip
                      formatter={(val: any) => [`${val}%`, "Union Reservation"]}
                      labelFormatter={(year) => `Year: ${year}`}
                    />
                    <Line
                      type="monotone"
                      dataKey="unionQuota"
                      stroke={isDarkMode ? "#60A5FA" : "#1E3A8A"}
                      strokeWidth={3}
                      dot={{ r: 6, fill: isDarkMode ? "#F59E0B" : "#D97706" }}
                      activeDot={{ r: 8 }}
                    />
                    <Line
                      type="linear"
                      dataKey="ceiling"
                      stroke={isDarkMode ? "#F87171" : "#DC2626"}
                      strokeDasharray="5 5"
                      strokeWidth={2}
                      name="Indra Sawhney 50% Cap"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-4 text-xs text-slate-600 dark:text-slate-400 flex items-center justify-between pt-3 border-t border-slate-200 dark:border-slate-800">
                <span className="text-red-600 dark:text-red-400 font-semibold">
                  Red Dashed Line = 50% Ceiling Standard
                </span>
                <span>Data Source: Ministry of Law & Justice Enactments</span>
              </div>
            </div>
          )}
        </div>

        {/* Interactive Recruitment Competition Calculator */}
        <div className="mt-16 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-950 text-white shadow-xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">
                Interactive Competition Intensity Simulator
              </h3>
              <p className="text-xs text-slate-300">
                Simulate applicant-to-post ratios in public recruitment based on
                current central quota allocations.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Input Controls */}
            <div className="lg:col-span-5 space-y-5">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                  Total Applicant Pool: {applicantCount.toLocaleString("en-IN")}{" "}
                  Candidates
                </label>
                <input
                  type="range"
                  min="100000"
                  max="5000000"
                  step="100000"
                  value={applicantCount}
                  onChange={(e) => setApplicantCount(Number(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                  <span>1 Lakh</span>
                  <span>25 Lakhs</span>
                  <span>50 Lakhs</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                  Total Advertised Posts: {totalPosts.toLocaleString("en-IN")}{" "}
                  Vacancies
                </label>
                <input
                  type="range"
                  min="100"
                  max="10000"
                  step="100"
                  value={totalPosts}
                  onChange={(e) => setTotalPosts(Number(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                  <span>100 Posts</span>
                  <span>5,000 Posts</span>
                  <span>10,000 Posts</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white/10 border border-white/10 text-xs text-slate-300 flex items-start gap-2">
                <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  Uses central 59.5% quota distribution (15% SC, 7.5% ST, 27%
                  OBC, 10% EWS, 40.5% Open) to calculate category competition
                  intensity.
                </span>
              </div>
            </div>

            {/* Calculated Output Display */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-sm">
                <div className="text-xs text-slate-300 font-medium">
                  Unreserved Open Seats (40.5%)
                </div>
                <div className="text-3xl font-extrabold text-amber-400 mt-1 font-mono">
                  {openPosts.toLocaleString("en-IN")} Seats
                </div>
                <div className="text-xs text-slate-300 mt-2">
                  Est. Open Applicant Competition:{" "}
                  <strong className="text-white font-mono">
                    1 : {openAppsPerSeat}
                  </strong>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-sm">
                <div className="text-xs text-slate-300 font-medium">
                  Reserved Seats (59.5%)
                </div>
                <div className="text-3xl font-extrabold text-blue-400 mt-1 font-mono">
                  {reservedPosts.toLocaleString("en-IN")} Seats
                </div>
                <div className="text-xs text-slate-300 mt-2">
                  EWS Quota (10%):{" "}
                  <strong className="text-white font-mono">
                    {Math.round(totalPosts * 0.1)} Seats
                  </strong>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filterable Research Summaries Library */}
        <div className="mt-16">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                Research Briefs & Data Dossiers
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Peer-reviewed academic papers, government survey reports, and
                judicial analysis briefs.
              </p>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search research tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>

          {/* Tag Filter Pills */}
          <div className="flex flex-wrap gap-2 mb-6">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  selectedTag === tag
                    ? "bg-blue-900 text-white dark:bg-amber-500 dark:text-slate-950 font-bold"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Research Brief Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredResearch.map((item) => (
              <div
                key={item.id}
                className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded bg-blue-100 dark:bg-blue-950 text-blue-900 dark:text-blue-300">
                      {item.category}
                    </span>
                    {item.isVerified ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                        <CheckCircle2 className="w-3 h-3" />
                        Verified Source
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/80 px-2 py-0.5 rounded border border-amber-200 dark:border-amber-800">
                        <AlertCircle className="w-3 h-3" />
                        Source Required
                      </span>
                    )}
                  </div>

                  <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                    {item.title}
                  </h4>
                  <p className="mt-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {item.summary}
                  </p>

                  <div className="mt-3 p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-xs text-slate-800 dark:text-slate-200">
                    <strong className="text-blue-900 dark:text-amber-400">
                      Key Finding:
                    </strong>{" "}
                    {item.keyFinding}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                  <span className="font-mono truncate pr-2">
                    Cite: {item.verifiedSource}
                  </span>
                  {item.sourceUrl && (
                    <a
                      href={item.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-700 dark:text-amber-400 font-semibold hover:underline flex items-center gap-1 shrink-0"
                    >
                      <span>Read Source</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
