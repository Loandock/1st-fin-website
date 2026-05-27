import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "The Mortgage Fellas — South Florida Mortgage Experts"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(135deg, #0D3F72 0%, #072548 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ width: 80, height: 4, backgroundColor: "#267AB1", borderRadius: 2, marginBottom: 32 }} />
        <div style={{ fontSize: 72, fontWeight: 800, color: "#FFFFFF", letterSpacing: "-0.02em", lineHeight: 1.1, textAlign: "center" }}>
          The Mortgage Fellas
        </div>
        <div style={{ fontSize: 32, fontWeight: 400, color: "#4A90B8", marginTop: 16 }}>
          South Florida Mortgage Experts
        </div>
        <div style={{ display: "flex", gap: 40, marginTop: 48, fontSize: 18, color: "#FFFFFF", opacity: 0.6 }}>
          <span>1st Financial Mortgage</span>
          <span>•</span>
          <span>Branch NMLS #1620197</span>
        </div>
        <div style={{ display: "flex", gap: 24, marginTop: 40 }}>
          {[
            { value: "$700M+", label: "Loans Funded" },
            { value: "1,300+", label: "Families Helped" },
            { value: "20+", label: "Years Experience" },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                backgroundColor: "rgba(38, 122, 177, 0.2)",
                border: "1px solid rgba(38, 122, 177, 0.35)",
                borderRadius: 12,
                padding: "16px 32px",
              }}
            >
              <span style={{ fontSize: 28, fontWeight: 800, color: "#267AB1" }}>{stat.value}</span>
              <span style={{ fontSize: 12, color: "#FFFFFF", opacity: 0.5, marginTop: 4, textTransform: "uppercase", letterSpacing: "0.1em" }}>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  )
}
