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
  process.env.GOOGLE_SHEET_EVENTS_ID ??
  "1oeoiQAeKnX-wVZlxqZ2XTf68s2eZx2Ebyfm3ltRARBk";
const SHEET_NAME = "Hoja 1";

export async function GET() {
  try {
    const sheets = google.sheets({ version: "v4", auth: serviceAccountAuth });

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!B2:E`,
    });

    const rows = response.data.values || [];

    const formatted = rows
      .filter((row) => row.length > 0)
      .map(([name, date, location, link]) => ({
        name: name || "",
        date: date || "",
        location: location || "",
        link: link || "",
      }));

    // 🔥 Filtramos:
    const today = new Date();

    const filtered = formatted
      .filter(({ name }) => name !== "SUNSET EN TERRAZA / REAL STUDIOS")
      .filter(({ date }) => {
        // Convertimos de "DD/MM/YYYY" a Date
        const [day, month, year] = date.split("/").map(Number);
        const eventDate = new Date(year, month - 1, day); // mes empieza en 0

        return eventDate >= today; // solo eventos futuros o de hoy
      });

    return NextResponse.json(filtered, { status: 200 });
  } catch (error) {
    console.error("❌ Error en API:", error);
    return NextResponse.json(
      { error: `Error interno del servidor: ${error}` },
      { status: 500 }
    );
  }
}
