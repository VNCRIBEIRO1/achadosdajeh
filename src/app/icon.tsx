import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #F97316, #EA580C)",
          fontSize: 20,
          fontWeight: 900,
          color: "white",
          letterSpacing: "-0.02em",
        }}
      >
        A
      </div>
    ),
    { ...size }
  );
}
