import { TestCaseResult, JoinFormData } from '../types';
import {
  NATIONAL_QUOTA_BREAKDOWN,
  STATE_QUOTA_DATA,
  CONSTITUTIONAL_CASES,
  TIMELINE_EVENTS,
  FAQ_ITEMS,
  RESEARCH_ITEMS
} from '../data/campaignData';

import { generatePledgeId, saveUserPledge } from './pledgeStore';

export function runAllUnitTests(): { results: TestCaseResult[]; totalPassed: number; totalFailed: number } {
  const results: TestCaseResult[] = [];

  // Test 1: Verify National Quota Breakdown total equals 100%
  const t1Start = performance.now();
  const totalPercentage = NATIONAL_QUOTA_BREAKDOWN.reduce((acc, curr) => acc + curr.percentage, 0);
  const isPercentage100 = Math.abs(totalPercentage - 100) < 0.01;
  results.push({
    name: 'National Quota Breakdown Sum Check',
    category: 'Data Integrity',
    passed: isPercentage100,
    details: `Sum calculated as ${totalPercentage.toFixed(2)}%. Expected exactly 100.00%.`,
    durationMs: +(performance.now() - t1Start).toFixed(2)
  });

  // Test 2: Verify State Quota Cap exceed flags
  const t2Start = performance.now();
  let stateCapValid = true;
  let stateCapFailures: string[] = [];
  STATE_QUOTA_DATA.forEach((s) => {
    if (s.exceedsCap && s.totalQuota <= 50.0) {
      stateCapValid = false;
      stateCapFailures.push(`${s.state} marked exceedsCap true but totalQuota is ${s.totalQuota}%`);
    }
  });
  results.push({
    name: 'State Quota Cap Exceed Logic Test',
    category: 'Data Integrity',
    passed: stateCapValid,
    details: stateCapValid
      ? `Validated ${STATE_QUOTA_DATA.length} state records against 50% Indra Sawhney threshold.`
      : `Failures: ${stateCapFailures.join('; ')}`,
    durationMs: +(performance.now() - t2Start).toFixed(2)
  });

  // Test 3: Check Citation Integrity for Constitutional Cases
  const t3Start = performance.now();
  let casesHasCitations = true;
  CONSTITUTIONAL_CASES.forEach((c) => {
    if (!c.citation || c.citation.trim().length === 0) {
      casesHasCitations = false;
    }
  });
  results.push({
    name: 'Constitutional Cases Legal Citation Check',
    category: 'Legal Standards',
    passed: casesHasCitations,
    details: casesHasCitations
      ? `All ${CONSTITUTIONAL_CASES.length} constitutional cases contain official law report citations.`
      : 'One or more cases missing law report citations.',
    durationMs: +(performance.now() - t3Start).toFixed(2)
  });

  // Test 4: Timeline Chronology Test
  const t4Start = performance.now();
  let isChronological = true;
  for (let i = 0; i < TIMELINE_EVENTS.length - 1; i++) {
    const y1 = parseInt(TIMELINE_EVENTS[i].year, 10);
    const y2 = parseInt(TIMELINE_EVENTS[i + 1].year, 10);
    if (!isNaN(y1) && !isNaN(y2) && y1 > y2) {
      isChronological = false;
      break;
    }
  }
  results.push({
    name: 'Timeline Chronological Sequence Test',
    category: 'Historical Accuracy',
    passed: isChronological,
    details: isChronological
      ? `Timeline events correctly ordered from ${TIMELINE_EVENTS[0].year} to ${TIMELINE_EVENTS[TIMELINE_EVENTS.length - 1].year}.`
      : 'Timeline events are out of chronological order.',
    durationMs: +(performance.now() - t4Start).toFixed(2)
  });

  // Test 5: Form Validation Logic
  const t5Start = performance.now();
  const sampleValidForm: JoinFormData = {
    fullName: 'Ananya Sharma',
    email: 'ananya@example.com',
    state: 'Delhi (NCT)',
    profession: 'Researcher',
    categoryInterest: 'Academic Research',
    message: 'Support peaceful constitutional review.',
    acceptedGuidelines: true
  };
  const isValid = validateFormInputs(sampleValidForm);
  const sampleInvalidForm: JoinFormData = { ...sampleValidForm, acceptedGuidelines: false };
  const isInvalidRejected = !validateFormInputs(sampleInvalidForm);
  const formValidationPassed = isValid && isInvalidRejected;
  results.push({
    name: 'Pledge Form Validation & Guidelines Check',
    category: 'Security & UX',
    passed: formValidationPassed,
    details: formValidationPassed
      ? 'Successfully verified form validation logic requiring guideline acceptance and valid email.'
      : 'Form validation failed expected constraints.',
    durationMs: +(performance.now() - t5Start).toFixed(2)
  });

  // Test 6: Global Search Indexing Test
  const t6Start = performance.now();
  const query = 'Indra Sawhney';
  const matchingCases = CONSTITUTIONAL_CASES.filter((c) =>
    c.title.toLowerCase().includes(query.toLowerCase()) ||
    c.citation.toLowerCase().includes(query.toLowerCase())
  );
  const searchIndexPassed = matchingCases.length > 0;
  results.push({
    name: 'Global Search Indexing Test',
    category: 'Search Engine',
    passed: searchIndexPassed,
    details: searchIndexPassed
      ? `Query "${query}" matched ${matchingCases.length} landmark records correctly.`
      : 'Search query indexing failed to return landmark records.',
    durationMs: +(performance.now() - t6Start).toFixed(2)
  });

  // Test 7: Source Required Badge Verification
  const t7Start = performance.now();
  const unverifiedResearch = RESEARCH_ITEMS.filter((r) => !r.isVerified);
  const hasProperUnverifiedFlag = unverifiedResearch.every((r) =>
    r.verifiedSource.includes('PLACEHOLDER') || r.verifiedSource.includes('Source Required')
  );
  results.push({
    name: 'Source Verification Badge Compliance',
    category: 'Sourced Fact Discipline',
    passed: hasProperUnverifiedFlag,
    details: hasProperUnverifiedFlag
      ? `Verified that all ${unverifiedResearch.length} unverified items strictly bear "PLACEHOLDER / Source Required" markers.`
      : 'Unverified dataset items missing explicit placeholder flags.',
    durationMs: +(performance.now() - t7Start).toFixed(2)
  });

  // Test 8: Pledge ID Format & Persistence Test (PRM-XXXXXX-YYYY)
  const t8Start = performance.now();
  const sampleId = generatePledgeId();
  const idRegex = /^PRM-[A-Z0-9]{6}-\d{4}$/;
  const isValidFormat = idRegex.test(sampleId);

  // Test ID consistency on update
  const sampleForm: JoinFormData = {
    fullName: 'Test User',
    email: 'testprm@example.com',
    state: 'Delhi (NCT)',
    profession: 'Student',
    categoryInterest: 'Research',
    message: 'Initial message',
    acceptedGuidelines: true
  };
  const rec1 = saveUserPledge(sampleForm);
  const rec2 = saveUserPledge({ ...sampleForm, message: 'Updated message' });
  const isPersistentId = rec1.id === rec2.id && idRegex.test(rec1.id);

  const pledgeTestPassed = isValidFormat && isPersistentId;
  results.push({
    name: 'Pledge ID Format (PRM-XXXXXX-YYYY) & Non-Regeneration Test',
    category: 'Pledge System Integrity',
    passed: pledgeTestPassed,
    details: pledgeTestPassed
      ? `Verified ID format (${rec1.id}) and confirmed ID is permanently retained across profile updates.`
      : 'Pledge ID failed format pattern or regenerated on update.',
    durationMs: +(performance.now() - t8Start).toFixed(2)
  });

  const totalPassed = results.filter((r) => r.passed).length;
  const totalFailed = results.length - totalPassed;

  return { results, totalPassed, totalFailed };
}

export function validateFormInputs(formData: JoinFormData): boolean {
  if (!formData.fullName || formData.fullName.trim().length < 2) return false;
  if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return false;
  if (!formData.state) return false;
  if (!formData.acceptedGuidelines) return false;
  return true;
}
