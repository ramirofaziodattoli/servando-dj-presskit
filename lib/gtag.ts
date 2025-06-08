// lib/gtag.ts

export const GA_MEASUREMENT_ID = "G-BBBD01RY23";

// Envia eventos a GA
export const pageview = (url: string) => {
  if (!GA_MEASUREMENT_ID) return;
  (window as any).gtag("config", GA_MEASUREMENT_ID, {
    page_path: url,
  });
};
