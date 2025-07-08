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
      // Intentar parsear el reset_time si es 429
      if (tokenResponse.status === 429) {
        try {
          const errorJson = JSON.parse(errorText);
          const resetTime =
            errorJson?.errors?.[0]?.meta?.rate_limit?.reset_time;
          if (resetTime) {
            console.error(
              `[SoundCloud][RATE LIMIT] El ban se levanta a las: ${resetTime}`
            );
          }
        } catch (e) {
          console.error(
            "No se pudo parsear el reset_time del error 429:",
            errorText
          );
        }
      }
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

// --- CACHE Y LOGGING MODULAR ---

// Configuración de cache
const CACHE_DURATION = 3 * 60 * 60 * 1000; // 3 horas en ms
let tracksCache: any = null;
let cacheTimestamp: number = 0;

function isCacheValid() {
  return tracksCache && Date.now() - cacheTimestamp < CACHE_DURATION;
}

function setCache(data: any) {
  tracksCache = data;
  cacheTimestamp = Date.now();
  logInfo(
    `Tracks guardados en cache a las: ${new Date(cacheTimestamp).toISOString()}`
  );
}

function getCache() {
  logInfo(
    `Sirviendo tracks desde cache. Última actualización: ${new Date(
      cacheTimestamp
    ).toISOString()}`
  );
  return {
    success: true,
    tracks: tracksCache.collection || [],
    total_tracks: tracksCache.collection?.length || 0,
    total_available: tracksCache.total_available || 0,
    from_cache: true,
    cache_timestamp: cacheTimestamp,
  };
}

function logInfo(...args: any[]) {
  console.log("[SoundCloud][INFO]", ...args);
}
function logError(...args: any[]) {
  console.error("[SoundCloud][ERROR]", ...args);
}

function logRateLimitError(error: any) {
  try {
    const errorJson = typeof error === "string" ? JSON.parse(error) : error;
    const resetTime = errorJson?.errors?.[0]?.meta?.rate_limit?.reset_time;
    logError(
      "¡Límite de rate alcanzado! reset_time:",
      resetTime,
      "Detalles:",
      errorJson
    );
  } catch (parseErr) {
    logError("Error 429 recibido pero no se pudo parsear el cuerpo:", error);
  }
}
// --- FIN CACHE Y LOGGING MODULAR ---

export async function GET() {
  const SOUNDCLOUD_USER_URN = process.env.SOUNDCLOUD_USER_URN;

  if (!SOUNDCLOUD_USER_URN) {
    return NextResponse.json(
      { error: "Falta SOUNDCLOUD_USER_URN en las variables de entorno" },
      { status: 400 }
    );
  }

  // 1. Revisar si hay cache vigente
  if (isCacheValid()) {
    return NextResponse.json(getCache());
  }

  try {
    // Paso 1: Obtener access token
    logInfo("Obteniendo access token...");
    const accessToken = await getAccessToken();
    logInfo("Access token obtenido exitosamente");

    // Paso 2: Obtener tracks del usuario
    logInfo("Obteniendo tracks del usuario:", SOUNDCLOUD_USER_URN);
    const tracksData = await getUserTracks(SOUNDCLOUD_USER_URN, accessToken);
    logInfo("Tracks obtenidos:", tracksData.collection?.length || 0, "tracks");

    // Guardar en cache
    setCache(tracksData);

    return NextResponse.json({
      success: true,
      tracks: tracksData.collection || [],
      total_tracks: tracksData.collection?.length || 0,
      total_available: tracksData.total_available || 0,
      from_cache: false,
      cache_timestamp: cacheTimestamp,
    });
  } catch (error: any) {
    // Si es error 429, loguear el reset_time si existe
    if (error.message?.includes("429")) {
      logRateLimitError(error.message);
    }
    logError("Error en getSoundcloudTracks:", error);
    return NextResponse.json(
      {
        error: "Error al obtener tracks de SoundCloud",
        details: error instanceof Error ? error.message : "Error desconocido",
      },
      { status: 500 }
    );
  }
}
