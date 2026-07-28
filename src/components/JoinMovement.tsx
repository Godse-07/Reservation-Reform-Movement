import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  ShieldCheck,
  AlertCircle,
  Copy,
  Award,
  Send,
  Edit3,
  Search,
  FileSpreadsheet,
  X,
} from "lucide-react";
import { JoinFormData } from "../types";
import { INDIAN_STATES_UTS } from "../data/campaignData";
import { validateFormInputs } from "../utils/testRunner";
import {
  getUserPledge,
  createPledgeRecord,
  storePledgeLocally,
  submitPledgeToSheets,
  lookupPledgeByEmailAndRef,
  getCanonicalPledgeStatement,
  fetchPublicPledges,
} from "../utils/pledgeStore";
import { PledgeRecord } from "../types";

export const JoinMovement: React.FC = () => {
  const [formData, setFormData] = useState<JoinFormData>({
    fullName: "",
    email: "",
    state: "Delhi (NCT)",
    profession: "Student / Competitive Aspirant",
    categoryInterest: "Academic Research",
    message: "",
    acceptedGuidelines: false,
  });

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [submittedPledge, setSubmittedPledge] = useState<{
    id: string;
    date: string;
    data: JoinFormData;
  } | null>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Lookup existing pledge state
  const [showLookupModal, setShowLookupModal] = useState(false);
  const [lookupEmail, setLookupEmail] = useState("");
  const [lookupRefId, setLookupRefId] = useState("");
  const [lookupError, setLookupError] = useState<string | null>(null);
  const [isLookingUp, setIsLookingUp] = useState(false);

  // Google Sheets setup modal state
  const [showSheetsGuide, setShowSheetsGuide] = useState(false);

  const [pledges, setPledges] = useState<PledgeRecord[]>([]);
  const [statsLoading, setStatsLoading] = useState(false);
  const [statsError, setStatsError] = useState<string | null>(null);

  useEffect(() => {
    const saved = getUserPledge();
    if (saved) {
      setSubmittedPledge(saved);
      setFormData(saved.data);
    }
  }, []);

  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!formData.acceptedGuidelines) {
      setErrorMsg(
        "You must review and accept the Peaceful Protest & Engagement Guidelines to join.",
      );
      return;
    }
    if (!formData.fullName || formData.fullName.trim().length < 2) {
      setErrorMsg("Please enter your full name.");
      return;
    }
    if (!formData.email || !EMAIL_REGEX.test(formData.email.trim())) {
      setErrorMsg(
        "Please provide a valid email address (e.g. name@example.com).",
      );
      return;
    }
    if (!validateFormInputs(formData)) {
      setErrorMsg(
        "Please check that all required fields are filled in correctly.",
      );
      return;
    }

    setIsSubmitting(true);
    try {
      const existingPledge = getUserPledge();
      const pledgeRecord = createPledgeRecord(
        formData,
        existingPledge || undefined,
      );
      await submitPledgeToSheets(pledgeRecord);
      storePledgeLocally(pledgeRecord);
      const savedRecord = pledgeRecord;
      setSubmittedPledge(savedRecord);
      setIsEditing(false);
    } catch (err) {
      setErrorMsg(
        "Failed to save your pledge to Google Sheets. Please verify the Sheets web app URL and try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLookupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLookupError(null);

    if (!lookupEmail.trim() || !lookupRefId.trim()) {
      setLookupError(
        "Please enter both your Email address and Pledge Reference ID.",
      );
      return;
    }

    setIsLookingUp(true);
    try {
      const res = await lookupPledgeByEmailAndRef(lookupEmail, lookupRefId);
      if (res.success && res.pledge) {
        const loadedForm: JoinFormData = {
          fullName: res.pledge.fullName || "",
          email: res.pledge.email || lookupEmail,
          state: res.pledge.state || "Delhi (NCT)",
          profession: res.pledge.profession || "Concerned Citizen",
          categoryInterest: "Academic Research",
          message: res.pledge.message || "",
          acceptedGuidelines: true,
        };
        setFormData(loadedForm);
        setSubmittedPledge({
          id: res.pledge.refId || lookupRefId.trim().toUpperCase(),
          date: new Date().toLocaleDateString("en-IN", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          data: loadedForm,
        });
        setIsEditing(true);
        setShowLookupModal(false);
        setLookupEmail("");
        setLookupRefId("");
      } else {
        setLookupError(
          res.error ||
            "No matching pledge found. Please verify your Email and Reference ID.",
        );
      }
    } catch (err) {
      setLookupError("Lookup service error. Please verify input and retry.");
    } finally {
      setIsLookingUp(false);
    }
  };

  const copyPledgeCode = () => {
    if (!submittedPledge) return;
    const statement = getCanonicalPledgeStatement(
      submittedPledge.data.fullName,
      submittedPledge.id,
    );
    navigator.clipboard.writeText(statement);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  useEffect(() => {
    if (!showSheetsGuide) return;
    setStatsLoading(true);
    setStatsError(null);
    fetchPublicPledges()
      .then(setPledges)
      .catch(() => setStatsError("Could not load live pledge data."))
      .finally(() => setStatsLoading(false));
  }, [showSheetsGuide]);

  return (
    <section
      id="join"
      className="py-20 bg-slate-50 dark:bg-slate-950 border-t border-slate-200/80 dark:border-slate-800 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-900 dark:text-blue-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600 dark:text-amber-400" />
            <span>
              Open & Accessible • Google Sheets Single Source of Truth
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Pledge for Peaceful & Constitutional Reform
          </h2>

          <p className="mt-4 text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Join thousands of students, researchers, academics, and citizens
            advocating for evidence-based policy review, equal opportunity, and
            constitutional balance in India.
          </p>

          <div className="mt-4 flex flex-wrap justify-center gap-3">

            <button
              onClick={() => setShowSheetsGuide(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-950/80 hover:bg-emerald-200 dark:hover:bg-emerald-900/80 text-emerald-900 dark:text-emerald-200 text-xs font-semibold border border-emerald-300 dark:border-emerald-800 transition-colors cursor-pointer"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Google Sheets Database Info</span>
            </button>
          </div>
        </div>

        <div className="mt-12 max-w-3xl mx-auto">
          {submittedPledge && !isEditing ? (
            /* Digital Pledge Card Confirmation */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl text-center relative overflow-hidden"
            >
              <div className="w-16 h-16 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center mb-4">
                <Award className="w-8 h-8" />
              </div>

              <span className="px-3 py-1 text-xs font-mono font-bold uppercase tracking-widest rounded bg-emerald-50 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                Pledge Reference: {submittedPledge.id}
              </span>

              <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-4">
                Thank You, {submittedPledge.data.fullName}!
              </h3>

              <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto leading-relaxed">
                Your pledge for peaceful, democratic, and evidence-based
                reservation policy review has been registered on{" "}
                {submittedPledge.date}.
              </p>

              {/* Exact Canonical Pledge Statement Card */}
              <div className="mt-6 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-left text-xs space-y-3">
                <div className="font-medium text-slate-800 dark:text-slate-200 italic leading-relaxed">
                  "
                  {getCanonicalPledgeStatement(
                    submittedPledge.data.fullName,
                    submittedPledge.id,
                  )}
                  "
                </div>
                {submittedPledge.data.message && (
                  <div className="pt-2 border-t border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300">
                    <span className="font-bold text-slate-700 dark:text-slate-200">
                      Public Note:{" "}
                    </span>
                    "{submittedPledge.data.message}"
                  </div>
                )}
                <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex flex-wrap justify-between text-[11px] text-slate-500 dark:text-slate-400">
                  <span>
                    State:{" "}
                    <strong className="text-slate-700 dark:text-slate-200">
                      {submittedPledge.data.state}
                    </strong>
                  </span>
                  <span>
                    Role:{" "}
                    <strong className="text-slate-700 dark:text-slate-200">
                      {submittedPledge.data.profession}
                    </strong>
                  </span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                    ✓ Non-Violent Commitment
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={copyPledgeCode}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-blue-900 text-white dark:bg-amber-500 dark:text-slate-950 hover:bg-blue-800 dark:hover:bg-amber-400 transition-colors cursor-pointer"
                >
                  <Copy className="w-4 h-4" />
                  <span>
                    {copied
                      ? "Copied Canonical Statement!"
                      : "Copy Pledge Statement"}
                  </span>
                </button>

                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Update Information</span>
                </button>
              </div>
            </motion.div>
          ) : (
            /* Join / Edit Form */
            <form
              onSubmit={handleSubmit}
              className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg space-y-6"
            >
              {submittedPledge && isEditing && (
                <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800/80 text-xs text-amber-900 dark:text-amber-200 flex items-center justify-between">
                  <span>
                    Editing pledge details. Reference ID{" "}
                    <strong className="font-mono font-bold">
                      {submittedPledge.id}
                    </strong>{" "}
                    is permanently preserved.
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="text-xs font-bold underline hover:text-amber-700 dark:hover:text-amber-300"
                  >
                    Cancel
                  </button>
                </div>
              )}

              {errorMsg && (
                <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-800 text-xs font-medium text-red-800 dark:text-red-300 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Vikramaditya Singh"
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                    Email Address{" "}
                    <span className="text-slate-400 font-normal">
                      (Never exposed publicly)
                    </span>{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. vikram@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                    State / Union Territory{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.state}
                    onChange={(e) =>
                      setFormData({ ...formData, state: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 cursor-pointer"
                  >
                    {INDIAN_STATES_UTS.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                    Profession / Background
                  </label>
                  <select
                    value={formData.profession}
                    onChange={(e) =>
                      setFormData({ ...formData, profession: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 cursor-pointer"
                  >
                    <option value="Student / Competitive Aspirant">
                      Student / Competitive Aspirant
                    </option>
                    <option value="Academic / Researcher">
                      Academic / Researcher
                    </option>
                    <option value="Legal Professional / Advocate">
                      Legal Professional / Advocate
                    </option>
                    <option value="Public Servant / Civil Employee">
                      Public Servant / Civil Employee
                    </option>
                    <option value="Private Professional">
                      Private Professional
                    </option>
                    <option value="Concerned Citizen">Concerned Citizen</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                  Optional Statement / Public Note
                </label>
                <textarea
                  rows={3}
                  placeholder="Share your thoughts on policy review, economic criteria, or constitutional balance..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              {/* Guidelines Checkbox */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-start gap-3">
                <input
                  type="checkbox"
                  id="accept-guidelines"
                  checked={formData.acceptedGuidelines}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      acceptedGuidelines: e.target.checked,
                    })
                  }
                  className="mt-1 w-4 h-4 text-blue-700 accent-blue-900 rounded cursor-pointer"
                />
                <label
                  htmlFor="accept-guidelines"
                  className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed cursor-pointer"
                >
                  I explicitly confirm that I have read and agree to abide by
                  the{" "}
                  <a
                    href="#guidelines"
                    className="font-bold underline text-blue-700 dark:text-amber-400"
                  >
                    Peaceful Protest & Engagement Guidelines
                  </a>
                  . I reject all forms of hate speech, violence, harassment, and
                  discrimination.
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 rounded-xl bg-blue-900 hover:bg-blue-800 dark:bg-amber-500 dark:hover:bg-amber-400 dark:text-slate-950 text-white font-bold text-sm tracking-wide shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>
                  {isSubmitting
                    ? "Recording Pledge..."
                    : isEditing
                      ? "Save Updated Pledge"
                      : "Register Peaceful Citizen Pledge"}
                </span>
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Lookup Existing Pledge Modal */}
      {showLookupModal && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl relative"
          >
            <button
              onClick={() => setShowLookupModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <Search className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Lookup & Edit Existing Pledge
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Verify Email & Pledge Reference ID
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
              To update your pledge information without creating a duplicate or
              changing your permanent reference ID, enter the Email address and
              Ref ID you used when signing.
            </p>

            <form onSubmit={handleLookupSubmit} className="space-y-4">
              {lookupError && (
                <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/80 border border-red-200 dark:border-red-800 text-xs text-red-800 dark:text-red-300 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{lookupError}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. vikram@example.com"
                  value={lookupEmail}
                  onChange={(e) => setLookupEmail(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Pledge Reference ID
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. PRM-MWKV6K-2026"
                  value={lookupRefId}
                  onChange={(e) => setLookupRefId(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white font-mono"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowLookupModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isLookingUp}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  {isLookingUp ? "Verifying..." : "Verify & Load Pledge"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Google Sheets Integration Guide Modal */}
      {showSheetsGuide && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-2xl p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl relative my-8"
          >
            <button
              onClick={() => setShowSheetsGuide(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <FileSpreadsheet className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                  Google Sheets Database Integration
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Single Source of Truth • No Traditional Database Required
                </p>
              </div>
            </div>

            <div className="space-y-4 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              <p>
                This application is designed to write all pledges directly to a{" "}
                <strong>Google Sheet</strong> as the primary database tab named{" "}
                <code className="font-mono bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded text-amber-600">
                  Pledges
                </code>
                .
              </p>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <h4 className="font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                  <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                  <span>Live Pledge Data</span>
                </h4>

                {statsLoading && (
                  <p className="text-slate-500 dark:text-slate-400">
                    Loading current pledges...
                  </p>
                )}

                {statsError && (
                  <p className="text-red-600 dark:text-red-400">{statsError}</p>
                )}

                {!statsLoading && !statsError && (
                  <>
                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
                        {pledges.length}
                      </span>
                      <span className="text-slate-500 dark:text-slate-400">
                        total pledges
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
                      {Object.entries(
                        pledges.reduce<Record<string, number>>((acc, p) => {
                          acc[p.state] = (acc[p.state] || 0) + 1;
                          return acc;
                        }, {}),
                      )
                        .sort((a, b) => b[1] - a[1])
                        .slice(0, 6)
                        .map(([state, count]) => (
                          <div
                            key={state}
                            className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex justify-between"
                          >
                            <span className="text-slate-600 dark:text-slate-300">
                              {state}
                            </span>
                            <span className="font-bold text-slate-900 dark:text-white">
                              {count}
                            </span>
                          </div>
                        ))}
                    </div>

                    <h5 className="font-semibold text-slate-700 dark:text-slate-300 mb-2">
                      Recently Joined
                    </h5>
                    <div className="space-y-1.5 max-h-40 overflow-y-auto">
                      {pledges.slice(0, 10).map((p) => (
                        <div
                          key={p.id}
                          className="flex justify-between p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
                        >
                          <span className="font-medium text-slate-800 dark:text-slate-200">
                            {p.fullName}
                          </span>
                          <span className="text-slate-500 dark:text-slate-400">
                            {p.state}
                          </span>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
};
