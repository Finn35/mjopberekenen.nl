import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          borderRadius: 40,
          background: "#2E5E4E",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          gap: 12,
          paddingBottom: 38,
        }}
      >
        <div
          style={{
            width: 28,
            height: 44,
            borderRadius: 8,
            background: "rgba(255,255,255,0.45)",
          }}
        />
        <div
          style={{
            width: 28,
            height: 72,
            borderRadius: 8,
            background: "rgba(255,255,255,0.7)",
          }}
        />
        <div
          style={{
            width: 28,
            height: 100,
            borderRadius: 8,
            background: "rgba(255,255,255,1)",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
