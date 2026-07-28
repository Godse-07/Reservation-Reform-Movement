import type { VercelRequest, VercelResponse } from "@vercel/node";

const SHEETS_URL = process.env.GOOGLE_SHEETS_WEB_APP_URL!;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const response = await fetch(SHEETS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: "lookup",
        ...req.body,
      }),
    });

    const data = await response.json();

    res.status(200).json(data);
  } catch (err: any) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
}
