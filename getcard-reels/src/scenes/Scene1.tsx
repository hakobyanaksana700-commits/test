import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

export const Scene1: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#1E3A8A",
        justifyContent: "center",
        alignItems: "center",
        opacity,
      }}
    >
      <div
        style={{
          fontSize: 64,
          fontWeight: 700,
          color: "#FFFFFF",
          fontFamily: "Arial, sans-serif",
          textAlign: "center",
          padding: "0 60px",
        }}
      >
        Сцена 1
      </div>
      <div
        style={{
          marginTop: 24,
          fontSize: 32,
          color: "#BFDBFE",
          fontFamily: "Arial, sans-serif",
          textAlign: "center",
        }}
      >
        0–3 сек · Заглушка
      </div>
    </AbsoluteFill>
  );
};
