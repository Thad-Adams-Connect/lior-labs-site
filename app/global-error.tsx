"use client";

// Catches errors that bubble up through the root layout.
// Intentionally uses inline styles — Tailwind CSS is not loaded in global-error.
export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          background: "#050505",
          color: "#ffffff",
          fontFamily: "system-ui, -apple-system, sans-serif",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          margin: 0,
          padding: "1.5rem",
          boxSizing: "border-box",
        }}
      >
        <div style={{ textAlign: "center", maxWidth: "24rem" }}>
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              marginBottom: "1rem",
            }}
          >
            Something went wrong
          </h2>
          <p style={{ color: "#9ca3af", marginBottom: "1.5rem" }}>
            Please refresh the page to try again.
          </p>
          <button
            onClick={reset}
            style={{
              background: "#6134C1",
              color: "#ffffff",
              padding: "0.75rem 1.5rem",
              borderRadius: "999px",
              border: "none",
              cursor: "pointer",
              fontSize: "1rem",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
