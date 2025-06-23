import { google } from "googleapis";
import { NextResponse } from "next/server";
import { JWT } from "google-auth-library";

// Autenticación con la API de Google
const serviceAccountAuth = new JWT({
  email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const SPREADSHEET_ID =
  process.env.GOOGLE_SHEET_RELEASES_ID ??
  "1NSjR_Zx80s-tZCRV7iMVWEALX7XxOHr3GpcBInOBQHY";
const SHEET_UPCOMING_RELEASES = "PROXIMOS LANZAMIENTOS";

function parseReleaseRows(rows: any[][]) {
  return rows
    .filter((row) => row.length > 0)
    .map(([name, recordLabel, date]) => ({
      name: name || "",
      recordLabel: recordLabel || "",
      date: date || "",
    }))
    .filter((release) => release.name && release.recordLabel && release.date)
    .filter(({ name }) => name !== "SET TECHNO 0001");
}

export async function GET() {
  try {
    const sheets = google.sheets({ version: "v4", auth: serviceAccountAuth });

    // Leer los próximos lanzamientos
    const releasesRes = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_UPCOMING_RELEASES}!B2:D`,
    });
    const releaseRows = releasesRes.data.values || [];

    const upcomingReleases = parseReleaseRows(releaseRows);

    return NextResponse.json({ upcomingReleases }, { status: 200 });
  } catch (error) {
    console.error("❌ Error en API:", error);
    return NextResponse.json(
      { error: `Error interno del servidor: ${error}` },
      { status: 500 }
    );
  }
}
