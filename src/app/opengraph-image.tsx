import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Synaptix Concussion Management Platform";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0A0A0A",
          color: "white",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 24,
          }}
        >
          <div
            style={{
              fontSize: 72,
              fontWeight: 700,
              letterSpacing: "0.05em",
            }}
          >
            SYNAPTIX
          </div>
          <div
            style={{
              fontSize: 36,
              color: "#0FBDD5",
              fontWeight: 400,
            }}
          >
            Concussion Assessment & Recovery Platform
          </div>
          <div
            style={{
              fontSize: 24,
              color: "rgba(255,255,255,0.6)",
              maxWidth: 800,
              textAlign: "center",
            }}
          >
            Structured concussion management software for orthopedic, neurosurgery, and sports medicine practices
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
