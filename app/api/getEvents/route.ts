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
  "1edKQA1C2PnIP6vgmVowLjtAC2S-8pT08U18imzc5xlQ";
const SHEET_PAST = "EVENTOS PASADOS";
const SHEET_UPCOMING = "EVENTOS PROXIMOS";

function parseRows(rows: any[][]) {
  return rows
    .filter((row) => row.length > 0)
    .map(([name, date, location, link]) => ({
      name: name || "",
      date: date || "",
      location: location || "",
      link: link || "",
    }))
    .filter((event) => event.name !== "SUNSET EN TERRAZA / REAL STUDIOS");
}

function sortByDateDesc(events: any[]) {
  return events.sort((a, b) => {
    const [da, ma, ya] = a.date.split("/").map(Number);
    const [db, mb, yb] = b.date.split("/").map(Number);
    const dateA = new Date(ya, ma - 1, da);
    const dateB = new Date(yb, mb - 1, db);
    return dateB.getTime() - dateA.getTime();
  });
}

function sortByDateAsc(events: any[]) {
  return events.sort((a, b) => {
    const [da, ma, ya] = a.date.split("/").map(Number);
    const [db, mb, yb] = b.date.split("/").map(Number);
    const dateA = new Date(ya, ma - 1, da);
    const dateB = new Date(yb, mb - 1, db);
    return dateA.getTime() - dateB.getTime();
  });
}

function isPast(dateStr: string) {
  const [day, month, year] = dateStr.split("/").map(Number);
  const eventDate = new Date(year, month - 1, day);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return eventDate < today;
}

function isUpcoming(dateStr: string) {
  const [day, month, year] = dateStr.split("/").map(Number);
  const eventDate = new Date(year, month - 1, day);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return eventDate >= today;
}

export async function GET() {
  try {
    const sheets = google.sheets({ version: "v4", auth: serviceAccountAuth });

    const pastRes = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_PAST}!B2:E`,
    });
    const pastRows = pastRes.data.values || [];
    const pastEvents = sortByDateDesc(
      parseRows(pastRows).filter((e) => isPast(e.date))
    );

    // Obtener eventos próximos
    const upcomingRes = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_UPCOMING}!B2:E`,
    });
    const upcomingRows = upcomingRes.data.values || [];
    const upcomingEvents = sortByDateAsc(
      parseRows(upcomingRows).filter((e) => isUpcoming(e.date))
    );

    return NextResponse.json({ pastEvents, upcomingEvents }, { status: 200 });
  } catch (error) {
    console.error("❌ Error en API:", error);
    return NextResponse.json(
      { error: `Error interno del servidor: ${error}` },
      { status: 500 }
    );
  }
}
