import { twMerge } from "tailwind-merge";
import { logos } from "@/assets";

// Función para formatear duración en horas y minutos
function formatDuration(durationMs: number): string {
  const totalSeconds = Math.floor(durationMs / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  } else {
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }
}

interface SoundCloudTrack {
  id: number;
  title: string;
  duration: number;
  artwork_url?: string;
  permalink_url: string;
}

interface SoundCloudCardsProps {
  tracks: SoundCloudTrack[];
}

export default function SoundCloudCards({ tracks }: SoundCloudCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {tracks.map((track) => (
        <a
          key={track.id}
          href={track.permalink_url}
          target="_blank"
          rel="noopener noreferrer"
          className="group block"
        >
          <div className="relative overflow-hidden rounded-lg bg-secondary/30 transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl">
            {/* Imagen de fondo */}
            <div className="aspect-square w-full">
              <img
                src={
                  track.artwork_url
                    ? track.artwork_url.replace("-large", "-t500x500")
                    : logos.logo_2
                }
                alt={track.title}
                className="h-full w-full object-cover"
              />
            </div>

            {/* Overlay con gradiente y título */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-white font-bold text-lg mb-2 line-clamp-2">
                  {track.title}
                </h3>
                {track.duration ? (
                  <p className="text-white/70 text-sm">
                    {formatDuration(track.duration)}
                  </p>
                ) : (
                  <p className="text-white/50 text-sm">
                    Duración no disponible
                  </p>
                )}
              </div>
            </div>

            {/* Icono de play superpuesto */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}
