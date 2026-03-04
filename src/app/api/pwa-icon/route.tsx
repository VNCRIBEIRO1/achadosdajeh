import { ImageResponse } from "next/og";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const s = Number(request.nextUrl.searchParams.get("s") || 192);
  const size = Math.min(Math.max(s, 16), 1024);

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
          fontSize: size * 0.55,
          fontWeight: 900,
          color: "white",
          letterSpacing: "-0.02em",
        }}
      >
        A
      </div>
    ),
    { width: size, height: size }
  );
}
