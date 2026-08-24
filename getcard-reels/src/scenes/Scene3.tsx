import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

export const Scene3: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#92400E",
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
        Сцена 3
      </div>
      <div
        style={{
          marginTop: 24,
          fontSize: 32,
          color: "#FDE68A",
          fontFamily: "Arial, sans-serif",
          textAlign: "center",
        }}
      >
        6–9 сек · Заглушка
      </div>
    </AbsoluteFill>
  );
};
