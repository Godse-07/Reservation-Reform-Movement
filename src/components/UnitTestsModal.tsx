import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TestTube2, CheckCircle2, XCircle, RefreshCw, X, ShieldCheck, FileCheck } from 'lucide-react';
import { runAllUnitTests } from '../utils/testRunner';
import { TestCaseResult } from '../types';

interface UnitTestsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UnitTestsModal: React.FC<UnitTestsModalProps> = ({ isOpen, onClose }) => {
  const [testData, setTestData] = useState<{
    results: TestCaseResult[];
    totalPassed: number;
    totalFailed: number;
  } | null>(null);

  const [isRunning, setIsRunning] = useState(false);

  const executeTests = () => {
    setIsRunning(true);
    setTimeout(() => {
      const res = runAllUnitTests();
      setTestData(res);
      setIsRunning(false);
    }, 300);
  };

  useEffect(() => {
    if (isOpen) {
      executeTests();
    }
  }, [isOpen]);

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
          <div className="p-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500 text-white flex items-center justify-center">
                <TestTube2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-white">Automated Unit Verification Suite</h3>
                <p className="text-xs text-slate-400">
                  Executable unit tests validating data calculations, citation badges, and form safety.
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Controls & Summary */}
          {testData && (
            <div className="p-4 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-4 text-xs">
                <span className="flex items-center gap-1.5 font-bold text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" />
                  {testData.totalPassed} Passed
                </span>
                <span className="flex items-center gap-1.5 font-bold text-red-600 dark:text-red-400">
                  <XCircle className="w-4 h-4" />
                  {testData.totalFailed} Failed
                </span>
                <span className="text-slate-400 font-mono">
                  Total Tests: {testData.results.length}
                </span>
              </div>

              <button
                onClick={executeTests}
                disabled={isRunning}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-500 disabled:opacity-50 cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isRunning ? 'animate-spin' : ''}`} />
                <span>Re-run Test Suite</span>
              </button>
            </div>
          )}

          {/* Test List */}
          <div className="p-6 overflow-y-auto space-y-3 flex-1 text-xs">
            {isRunning ? (
              <div className="py-12 text-center text-slate-400 space-y-2">
                <RefreshCw className="w-8 h-8 animate-spin mx-auto text-indigo-500" />
                <p>Running automated unit checks...</p>
              </div>
            ) : testData ? (
              testData.results.map((t, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-xl border transition-all ${
                    t.passed
                      ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/60'
                      : 'bg-red-50/50 dark:bg-red-950/20 border-red-200 dark:border-red-800/60'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <div className="flex items-center gap-2">
                      {t.passed ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-600 dark:text-red-400 shrink-0" />
                      )}
                      <span className="font-bold text-slate-900 dark:text-white text-sm">{t.name}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                        {t.category}
                      </span>
                      <span className="font-mono text-[10px] text-slate-400">{t.durationMs}ms</span>
                    </div>
                  </div>

                  <p className="text-slate-600 dark:text-slate-300 ml-6 text-xs leading-relaxed">
                    {t.details}
                  </p>
                </div>
              ))
            ) : null}
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 text-center text-[11px] text-slate-500">
            All unit tests execute client-side in real time to verify app health and data compliance.
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
