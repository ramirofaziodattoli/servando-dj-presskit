import { google } from "googleapis";
import { NextResponse } from "next/server";
import { JWT } from "google-auth-library";
import { FormValues } from "@/sections/Contact";

// Autenticación con la API de Google
const serviceAccountAuth = new JWT({
  email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

// ID de la hoja de Google Sheets
const SPREADSHEET_ID = process.env.GOOGLE_SHEET_CONTACT_ID;
const SHEET_NAME = "Hoja 1"; // Asegúrate de que coincide con el nombre de la hoja

export async function POST(req: Request) {
  try {
    const { values }: { values: FormValues } = await req.json();
    console.log("📩 Datos recibidos en API:", values);

    const sheets = google.sheets({ version: "v4", auth: serviceAccountAuth });

    // 1️⃣ Obtener todos los datos de la hoja
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!B:B`, // Columna B (Correo Electrónico)
    });

    const emails = response.data.values?.flat() || []; // Convertir a array plano

    // 2️⃣ Verificar si el correo ya existe
    if (emails.includes(values.correoElectronico)) {
      console.log("⚠️ Correo ya registrado:", values.correoElectronico);
      return NextResponse.json(
        { error: "El correo ya está registrado" },
        { status: 400 }
      );
    }

    // 3️⃣ Insertar los nuevos datos
    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A1`,
      valueInputOption: "RAW",
      insertDataOption: "INSERT_ROWS",
      requestBody: {
        values: [
          [
            values.nombreCompleto,
            values.correoElectronico,
            values.tipoDeEvento,
            values.mensaje,
          ],
        ],
      },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("❌ Error en API:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
