import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Lior Labs",
    short_name: "Lior Labs",
    description:
      "High-performance software by Lior Labs.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#050505",
    theme_color: "#050505",
    orientation: "portrait",
    icons: [
      {
        src: "/icon-192-theme.png?v=20260419",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512-theme.png?v=20260419",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/maskable-icon-512-theme.png?v=20260419",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
