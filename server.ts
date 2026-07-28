import express from "express";
import dotenv from "dotenv";
import path from "path";
import { createServer as createViteServer } from "vite";
import dns from "dns";

dotenv.config();
dns.setDefaultResultOrder("ipv4first");

const app = express();
const PORT = 3000;

function getSheetsUrl(): string | undefined {
  return (
    process.env.GOOGLE_SHEETS_WEB_APP_URL ||
    process.env.VITE_GOOGLE_SHEETS_WEB_APP_URL
  );
}

function hasRealSheetsUrl(): boolean {
  const sheetsUrl = getSheetsUrl();
  return Boolean(
    sheetsUrl && !sheetsUrl.includes("MOCK_PLEDGE_SHEETS_WEB_APP_KEY"),
  );
}

app.use(express.json());

// In-memory store fallback for development / local persistent cache when no Google Sheets URL is set
interface SheetPledgeRow {
  timestamp: string;
  refId: string;
  fullName: string;
  email: string;
  state: string;
  profession: string;
  message: string;
  approved: boolean;
}

const sampleSheetRows: SheetPledgeRow[] = [
  {
    timestamp: "2026-07-15T10:00:00.000Z",
    refId: "PRM-A8K2M9-2026",
    fullName: "Vikramaditya Singh",
    email: "vikram@example.com",
    state: "Delhi (NCT)",
    profession: "Student / Competitive Aspirant",
    message:
      "Constitutional reform must prioritize merit alongside targeted economic upliftment.",
    approved: true,
  },
  {
    timestamp: "2026-07-18T11:30:00.000Z",
    refId: "PRM-X9L4P2-2026",
    fullName: "Dr. Ananya Sharma",
    email: "ananya@example.com",
    state: "Maharashtra",
    profession: "Academic / Researcher",
    message:
      "Comprehensive empirical data collection and periodic statutory audits are essential for constitutional balance.",
    approved: true,
  },
  {
    timestamp: "2026-07-20T14:15:00.000Z",
    refId: "PRM-R3V7K1-2026",
    fullName: "Adv. Rajesh Kumar",
    email: "rajesh@example.com",
    state: "Uttar Pradesh",
    profession: "Legal Professional / Advocate",
    message:
      "Preserving the 50% ceiling from Indra Sawhney while refining economic criteria guarantees equal protection.",
    approved: true,
  },
  {
    timestamp: "2026-07-21T09:20:00.000Z",
    refId: "PRM-B5M8T4-2026",
    fullName: "Priya Mukherjee",
    email: "priya@example.com",
    state: "West Bengal",
    profession: "Private Professional",
    message:
      "Equal opportunity in higher education should reward hard work without arbitrary demographic ceilings.",
    approved: true,
  },
  {
    timestamp: "2026-07-22T16:45:00.000Z",
    refId: "PRM-Q2N6W8-2026",
    fullName: "Siddharth Rao",
    email: "siddharth@example.com",
    state: "Karnataka",
    profession: "Student / Competitive Aspirant",
    message:
      "A transparent, periodic review process helps reach those who need support most.",
    approved: true,
  },
  {
    timestamp: "2026-07-23T12:10:00.000Z",
    refId: "PRM-J7H3C5-2026",
    fullName: "Meenakshi Sundaram",
    email: "meenakshi@example.com",
    state: "Tamil Nadu",
    profession: "Academic / Researcher",
    message:
      "Evidence-based policy reform protects both social justice and institutional excellence.",
    approved: true,
  },
  {
    timestamp: "2026-07-24T08:30:00.000Z",
    refId: "PRM-K4P9Y2-2026",
    fullName: "Harpreet Singh Gill",
    email: "harpreet@example.com",
    state: "Punjab",
    profession: "Concerned Citizen",
    message:
      "Peaceful, lawful advocacy is the cornerstone of democratic progress in our nation.",
    approved: true,
  },
  {
    timestamp: "2026-07-25T15:00:00.000Z",
    refId: "PRM-F1T5Z3-2026",
    fullName: "Deepak Rathore",
    email: "deepak@example.com",
    state: "Rajasthan",
    profession: "Public Servant / Civil Employee",
    message:
      "Periodic statutory commissions ensure policy remains responsive to changing socio-economic realities.",
    approved: true,
  },
];

let pledgesDb: SheetPledgeRow[] = [...sampleSheetRows];

function generateRefId(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let randomCode = "";
  for (let i = 0; i < 6; i++) {
    randomCode += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  const year = new Date().getFullYear();
  return `PRM-${randomCode}-${year}`;
}

// API Routes
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", sheetsConfigured: hasRealSheetsUrl() });
});

// GET /api/pledges - Returns approved pledges (EMAIL OMITTED FOR PRIVACY)
app.get("/api/pledges", async (req, res) => {
  const sheetsUrl = getSheetsUrl();

  if (hasRealSheetsUrl()) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000); // CHANGED: was 2500 — Apps Script cold starts can take several seconds
      const response = await fetch(sheetsUrl, { signal: controller.signal });
      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        // Ensure email is stripped out
        const publicPledges = (data.pledges || data || []).map((p: any) => ({
          id: p.refId || p.id,
          fullName: p.fullName,
          state: p.state,
          profession: p.profession || "Concerned Citizen",
          message: p.message || "",
          date: p.timestamp
            ? new Date(p.timestamp).toLocaleDateString("en-IN", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            : "2026",
          isSample: false,
        }));
        return res.json({
          success: true,
          source: "google_sheets",
          pledges: publicPledges,
        });
      }
    } catch (err) {
      console.warn(
        "Google Sheets fetch failed or timed out, serving in-memory store fallback.",
      );
    }
  }

  // Local fallback memory store
  const publicPledges = pledgesDb
    .filter((p) => p.approved)
    .map((p) => ({
      id: p.refId,
      fullName: p.fullName,
      state: p.state,
      profession: p.profession || "Concerned Citizen",
      message: p.message || "",
      date: new Date(p.timestamp).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      isSample:
        p.refId.startsWith("PRM-A") ||
        p.refId.startsWith("PRM-X") ||
        p.refId.startsWith("PRM-R") ||
        p.refId.startsWith("PRM-B"),
    }));

  return res.json({
    success: true,
    source: "memory_store",
    pledges: publicPledges,
  });
});

// POST /api/pledges - Create or Update pledge
app.post("/api/pledges", async (req, res) => {
  const { fullName, email, state, profession, message, refId } = req.body;

  if (!fullName || !email || !state) {
    return res.status(400).json({
      success: false,
      error: "Full name, email, and state are required.",
    });
  }

  const sheetsUrl = getSheetsUrl();

  if (!hasRealSheetsUrl()) {
    return res.status(503).json({
      success: false,
      error:
        "Google Sheets is not configured. Set GOOGLE_SHEETS_WEB_APP_URL to a deployed Apps Script web app URL.",
    });
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); // CHANGED: was 2500 — Apps Script POST/append can take longer than the old timeout allowed
    const response = await fetch(sheetsUrl!, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: controller.signal,
      body: JSON.stringify({
        action: refId ? "update" : "create",
        fullName,
        email,
        state,
        profession,
        message,
        refId,
      }),
    });
    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(502).json({
        success: false,
        error: `Google Sheets write failed with HTTP ${response.status}.`,
        details: errorText,
      });
    }

    const result = await response.json();
    if (!result || result.success === false) {
      return res.status(502).json({
        success: false,
        error: result?.error || "Google Sheets write failed.",
      });
    }

    return res.json(result);
  } catch (err) {
    console.error("Google Sheets Web App POST error:");
    console.error(err);

    return res.status(502).json({
      success: false,
      error: String(err),
    });
  }
});

// POST /api/pledges/verify - Verify ownership for edit lookup (Email + Ref ID)
app.post("/api/pledges/verify", async (req, res) => {
  const { email, refId } = req.body;

  if (!email || !refId) {
    return res
      .status(400)
      .json({ success: false, error: "Email and Reference ID are required." });
  }

  const sheetsUrl = getSheetsUrl();

  if (hasRealSheetsUrl()) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000);
      const response = await fetch(sheetsUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({ action: "lookup", email, refId }),
      });
      clearTimeout(timeoutId);
      if (response.ok) {
        const result = await response.json();
        return res.json(result);
      }
    } catch (err) {
      console.warn("Sheets lookup fetch error, falling back to memory store.");
    }
  }

  // Memory store verification
  const record = pledgesDb.find(
    (p) =>
      p.refId.toUpperCase() === refId.trim().toUpperCase() &&
      p.email.toLowerCase() === email.trim().toLowerCase(),
  );

  if (record) {
    return res.json({
      success: true,
      found: true,
      pledge: {
        refId: record.refId,
        fullName: record.fullName,
        email: record.email,
        state: record.state,
        profession: record.profession,
        message: record.message,
      },
    });
  }

  return res.json({
    success: false,
    found: false,
    error: "No matching pledge found for the provided Email and Reference ID.",
  });
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
