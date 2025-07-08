import { NextResponse } from "next/server";

// Función para obtener access token usando Client Credentials Flow
async function getAccessToken() {
  const SOUNDCLOUD_CLIENT_ID = process.env.SOUNDCLOUD_CLIENT_ID;
  const SOUNDCLOUD_CLIENT_SECRET = process.env.SOUNDCLOUD_CLIENT_SECRET;

  if (!SOUNDCLOUD_CLIENT_ID || !SOUNDCLOUD_CLIENT_SECRET) {
    throw new Error("Faltan credenciales de SoundCloud");
  }

  // Crear Basic Auth header
  const credentials = Buffer.from(
    `${SOUNDCLOUD_CLIENT_ID}:${SOUNDCLOUD_CLIENT_SECRET}`
  ).toString("base64");

  try {
    const tokenResponse = await fetch(
      "https://secure.soundcloud.com/oauth/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${credentials}`,
          Accept: "application/json; charset=utf-8",
        },
        body: "grant_type=client_credentials",
      }
    );

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      console.error("Error obteniendo token:", errorText);
      throw new Error(`Error obteniendo token: ${tokenResponse.status}`);
    }

    const tokenData = await tokenResponse.json();
    return tokenData.access_token;
  } catch (error) {
    console.error("Error en getAccessToken:", error);
    throw error;
  }
}

// Función para obtener tracks del usuario con paginación
async function getUserTracks(userUrn: string, accessToken: string) {
  try {
    let allTracks: any[] = [];
    let nextHref = `https://api.soundcloud.com/users/${userUrn}/tracks?access=playable,preview&limit=50&linked_partitioning=true`;
    let trackCount = 0;
    const maxTracks = 6; // Solo queremos los últimos 6 tracks

    while (nextHref && trackCount < maxTracks) {
      const tracksResponse = await fetch(nextHref, {
        headers: {
          Authorization: `OAuth ${accessToken}`,
          Accept: "application/json; charset=utf-8",
        },
      });

      if (!tracksResponse.ok) {
        const errorText = await tracksResponse.text();
        console.error("Error obteniendo tracks:", errorText);
        throw new Error(`Error obteniendo tracks: ${tracksResponse.status}`);
      }

      const tracksData = await tracksResponse.json();

      // Agregar tracks a la colección
      if (tracksData.collection) {
        allTracks = allTracks.concat(tracksData.collection);
        trackCount = allTracks.length;
      }

      // Obtener el siguiente href para la paginación
      nextHref = tracksData.next_href || null;

      console.log(`Obtenidos ${trackCount} tracks hasta ahora...`);
    }

    // Retornar solo los últimos 6 tracks
    const latestTracks = allTracks.slice(0, maxTracks);
    console.log(
      `Total de tracks obtenidos: ${allTracks.length}, retornando los últimos ${latestTracks.length}`
    );

    // Log detallado de cada track para debugging
    latestTracks.forEach((track, index) => {
      console.log(`Track ${index + 1}:`, {
        id: track.id,
        title: track.title,
        duration: track.duration,
        has_artwork: !!track.artwork_url,
        permalink_url: track.permalink_url,
      });
    });

    return {
      collection: latestTracks,
      total_available: allTracks.length,
    };
  } catch (error) {
    console.error("Error en getUserTracks:", error);
    throw error;
  }
}

export async function GET() {
  const SOUNDCLOUD_USER_URN = process.env.SOUNDCLOUD_USER_URN;

  if (!SOUNDCLOUD_USER_URN) {
    return NextResponse.json(
      { error: "Falta SOUNDCLOUD_USER_URN en las variables de entorno" },
      { status: 400 }
    );
  }

  try {
    // Paso 1: Obtener access token
    console.log("Obteniendo access token...");
    const accessToken = await getAccessToken();
    console.log("Access token obtenido exitosamente");

    // Paso 2: Obtener tracks del usuario
    console.log("Obteniendo tracks del usuario:", SOUNDCLOUD_USER_URN);
    const tracksData = await getUserTracks(SOUNDCLOUD_USER_URN, accessToken);
    console.log(
      "Tracks obtenidos:",
      tracksData.collection?.length || 0,
      "tracks"
    );

    return NextResponse.json({
      success: true,
      tracks: tracksData.collection || [],
      total_tracks: tracksData.collection?.length || 0,
      total_available: tracksData.total_available || 0,
    });
  } catch (error) {
    console.error("Error en getSoundcloudTracks:", error);
    return NextResponse.json(
      {
        error: "Error al obtener tracks de SoundCloud",
        details: error instanceof Error ? error.message : "Error desconocido",
      },
      { status: 500 }
    );
  }
}
