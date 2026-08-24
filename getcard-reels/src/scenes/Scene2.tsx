import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

export const Scene2: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#065F46",
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
        Сцена 2
      </div>
      <div
        style={{
          marginTop: 24,
          fontSize: 32,
          color: "#A7F3D0",
          fontFamily: "Arial, sans-serif",
          textAlign: "center",
        }}
      >
        3–6 сек · Заглушка
      </div>
    </AbsoluteFill>
  );
};
