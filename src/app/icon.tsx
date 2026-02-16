import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          background: "#2E5E4E",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          gap: 2,
          paddingBottom: 7,
          paddingLeft: 1,
          paddingRight: 1,
        }}
      >
        <div
          style={{
            width: 5,
            height: 8,
            borderRadius: 2,
            background: "rgba(255,255,255,0.45)",
          }}
        />
        <div
          style={{
            width: 5,
            height: 13,
            borderRadius: 2,
            background: "rgba(255,255,255,0.7)",
          }}
        />
        <div
          style={{
            width: 5,
            height: 18,
            borderRadius: 2,
            background: "rgba(255,255,255,1)",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
