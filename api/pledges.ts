import type { VercelRequest, VercelResponse } from "@vercel/node";

const SHEETS_URL = process.env.GOOGLE_SHEETS_WEB_APP_URL!;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!SHEETS_URL) {
    return res.status(500).json({
      success: false,
      error: "GOOGLE_SHEETS_WEB_APP_URL not configured",
    });
  }

  try {
    if (req.method === "GET") {
      const response = await fetch(SHEETS_URL);

      const data = await response.json();

      return res.status(200).json(data);
    }

    if (req.method === "POST") {
      const response = await fetch(SHEETS_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req.body),
      });

      const data = await response.json();

      return res.status(200).json(data);
    }

    return res.status(405).json({
      success: false,
      error: "Method not allowed",
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
}
