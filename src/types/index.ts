export interface ResearchItem {
  id: string;
  title: string;
  category: 'Quota Analysis' | 'Quota Allocation' | 'Economic Metrics' | 'Judicial Precedents' | 'Employment Stats' | 'Education Cutoffs';
  summary: string;
  keyFinding: string;
  verifiedSource: string;
  sourceUrl?: string;
  isVerified: boolean;
  publishedDate: string;
  tags: string[];
}

export interface TimelineEvent {
  id: string;
  year: string;
  dateStr?: string;
  title: string;
  category: 'Constitutional Amendment' | 'Supreme Court Landmark' | 'Commission Report' | 'State Legislation';
  summary: string;
  details: string;
  citation: string;
  citationUrl?: string;
  isVerified: boolean;
  keyOutcome: string;
}

export interface ConstitutionalCase {
  id: string;
  title: string;
  year: number;
  benchSize: string;
  verdictRatio: string;
  keyHolding: string;
  majorityOpinion: string;
  dissentingOpinion?: string;
  movementPerspective: string;
  citation: string;
  officialDocUrl?: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'General' | 'Constitutional' | 'Methodology' | 'Participation';
  keyTakeaway: string;
}

export interface StateQuotaData {
  state: string;
  totalQuota: number;
  scQuota: number;
  stQuota: number;
  obcQuota: number;
  ewsQuota: number;
  otherQuota?: number;
  exceedsCap: boolean;
  legalStatus: string;
  citation: string;
  sourceUrl?: string;
  isVerified: boolean;
}

export interface JoinFormData {
  fullName: string;
  email: string;
  state: string;
  profession: string;
  categoryInterest: string;
  message: string;
  acceptedGuidelines: boolean;
}

export interface PledgeRecord {
  id: string; // Ref ID PRM-XXXXXX-YYYY
  fullName: string;
  email?: string;
  state: string;
  profession: string;
  message?: string;
  date: string;
  isSample?: boolean;
}

export interface TestCaseResult {
  name: string;
  category: string;
  passed: boolean;
  details: string;
  durationMs: number;
}
