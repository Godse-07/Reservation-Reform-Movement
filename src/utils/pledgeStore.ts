/// <reference types="vite/client" />

import { PledgeRecord, JoinFormData } from "../types";

const STORAGE_KEY_USER_PLEDGE = "PRM_USER_PLEDGE";
const STORAGE_KEY_ALL_PLEDGES = "PRM_ALL_PLEDGES";

/**
 * CANONICAL PLEDGE STATEMENT (Warm / Movement-forward choice from spec)
 */
export function getCanonicalPledgeStatement(
  fullName: string,
  refId: string,
): string {
  return `I, ${fullName}, join the Reservation Hatao Movement in pledging my support for a fair, merit-conscious, and evidence-based review of India's reservation policy. I commit to advancing this cause peacefully, lawfully, and through constitutional means — with dignity and respect for every citizen, regardless of background. (Ref: ${refId})`;
}

/**
 * Generates a unique reference ID in the format PRM-XXXXXX-YYYY
 * XXXXXX = 6-character random uppercase alphanumeric
 * YYYY = current year
 */
export function generatePledgeId(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let randomCode = "";
  for (let i = 0; i < 6; i++) {
    randomCode += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  const year = new Date().getFullYear();
  return `PRM-${randomCode}-${year}`;
}

export function createPledgeRecord(
  formData: JoinFormData,
  existing?: { id: string; date: string },
): { id: string; date: string; data: JoinFormData } {
  return {
    id: existing?.id || generatePledgeId(),
    date:
      existing?.date ||
      new Date().toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    data: formData,
  };
}

export function getUserPledge(): {
  id: string;
  date: string;
  data: JoinFormData;
} | null {
  if (typeof window === "undefined") return null;
  const saved = localStorage.getItem(STORAGE_KEY_USER_PLEDGE);
  if (!saved) return null;
  try {
    return JSON.parse(saved);
  } catch {
    return null;
  }
}

export function storePledgeLocally(pledgeRecord: {
  id: string;
  date: string;
  data: JoinFormData;
}): void {
  if (typeof window === "undefined") return;

  localStorage.setItem(STORAGE_KEY_USER_PLEDGE, JSON.stringify(pledgeRecord));

  const existingAllRaw = localStorage.getItem(STORAGE_KEY_ALL_PLEDGES);
  let userPledges: PledgeRecord[] = [];
  if (existingAllRaw) {
    try {
      userPledges = JSON.parse(existingAllRaw);
    } catch {
      userPledges = [];
    }
  }

  const newPledgeRecord: PledgeRecord = {
    id: pledgeRecord.id,
    fullName: pledgeRecord.data.fullName,
    email: pledgeRecord.data.email,
    state: pledgeRecord.data.state,
    profession: pledgeRecord.data.profession,
    message: pledgeRecord.data.message,
    date: pledgeRecord.date,
    isSample: false,
  };

  const existingIndex = userPledges.findIndex(
    (p) =>
      p.id === pledgeRecord.id ||
      (p.email &&
        p.email.toLowerCase() === pledgeRecord.data.email.toLowerCase()),
  );
  if (existingIndex >= 0) {
    userPledges[existingIndex] = newPledgeRecord;
  } else {
    userPledges.unshift(newPledgeRecord);
  }

  localStorage.setItem(STORAGE_KEY_ALL_PLEDGES, JSON.stringify(userPledges));
  window.dispatchEvent(new Event("prm-pledges-updated"));
}

export async function submitPledgeToSheets(pledgeRecord: {
  id: string;
  date: string;
  data: JoinFormData;
}): Promise<{
  success: boolean;
  refId?: string;
  action?: string;
  error?: string;
}> {
  const response = await fetch("/api/pledges", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fullName: pledgeRecord.data.fullName,
      email: pledgeRecord.data.email,
      state: pledgeRecord.data.state,
      profession: pledgeRecord.data.profession,
      message: pledgeRecord.data.message,
      refId: pledgeRecord.id,
    }),
  });

  const data = await response.json();

  if (!response.ok || (data as any)?.success === false) {
    throw new Error(
      (data as any)?.error ||
        `Failed to write pledge to Google Sheets (${response.status}).`,
    );
  }

  return data as any;
}

/**
 * Saves or updates user pledge.
 * Reuses existing Ref ID if updating.
 */
export function saveUserPledge(formData: JoinFormData): {
  id: string;
  date: string;
  data: JoinFormData;
} {
  const pledgeRecord = createPledgeRecord(
    formData,
    getUserPledge() || undefined,
  );
  storePledgeLocally(pledgeRecord);
  return pledgeRecord;
}

/**
 * Verify pledge ownership by Email + Ref ID for no-login edit lookup
 */
export async function lookupPledgeByEmailAndRef(
  email: string,
  refId: string,
): Promise<{ success: boolean; pledge?: any; error?: string }> {
  try {
    const response = await fetch("/api/pledges/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.trim(),
        refId: refId.trim(),
      }),
    });
    if (response.ok) {
      const data = await response.json();
      if (data.found && data.pledge) {
        return { success: true, pledge: data.pledge };
      }
    }
  } catch (err) {
    console.warn("Lookup API error, checking local store fallback:", err);
  }

  // Local storage lookup fallback
  const userPledge = getUserPledge();
  if (
    userPledge &&
    userPledge.id.toUpperCase() === refId.trim().toUpperCase() &&
    userPledge.data.email.toLowerCase() === email.trim().toLowerCase()
  ) {
    return {
      success: true,
      pledge: {
        refId: userPledge.id,
        fullName: userPledge.data.fullName,
        email: userPledge.data.email,
        state: userPledge.data.state,
        profession: userPledge.data.profession,
        message: userPledge.data.message,
      },
    };
  }

  return {
    success: false,
    error: "No matching pledge found for the provided Email and Reference ID.",
  };
}

/**
 * Reads pledges for public Pledge Wall (EXCLUDING EMAIL COLUMN)
 */
export async function fetchPublicPledges(): Promise<PledgeRecord[]> {
  try {
    const res = await fetch("/api/pledges");
    if (res.ok) {
      const data = await res.json();
      if (data.success && Array.isArray(data.pledges)) {
        return deduplicatePledges(data.pledges);
      }
    }
  } catch (err) {
    console.warn(
      "Failed to fetch public pledges from API, reading local cache:",
      err,
    );
  }

  return getAllPledgesLocal();
}

function getAllPledgesLocal(): PledgeRecord[] {
  if (typeof window === "undefined") return [];

  let storedUserPledges: PledgeRecord[] = [];
  const existingAllRaw = localStorage.getItem(STORAGE_KEY_ALL_PLEDGES);
  if (existingAllRaw) {
    try {
      storedUserPledges = JSON.parse(existingAllRaw);
    } catch {
      storedUserPledges = [];
    }
  }

  const userActive = getUserPledge();
  if (userActive) {
    const activeRecord: PledgeRecord = {
      id: userActive.id,
      fullName: userActive.data.fullName,
      email: userActive.data.email,
      state: userActive.data.state,
      profession: userActive.data.profession,
      message: userActive.data.message,
      date: userActive.date,
      isSample: false,
    };
    const exists = storedUserPledges.some((p) => p.id === activeRecord.id);
    if (!exists) {
      storedUserPledges.unshift(activeRecord);
    }
  }

  return deduplicatePledges(storedUserPledges);
}

function deduplicatePledges(list: PledgeRecord[]): PledgeRecord[] {
  const seen = new Set<string>();
  const res: PledgeRecord[] = [];
  for (const item of list) {
    if (!seen.has(item.id)) {
      seen.add(item.id);
      const { email, ...publicFields } = item;
      res.push(publicFields as PledgeRecord);
    }
  }
  return res;
}
