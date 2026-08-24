import React from "react";
import { AbsoluteFill, Sequence, useCurrentFrame } from "remotion";
import { Scene1 } from "./scenes/Scene1";
import { Scene2 } from "./scenes/Scene2";
import { Scene3 } from "./scenes/Scene3";
import { Scene4 } from "./scenes/Scene4";
import { SCENES, VIDEO_DURATION_IN_FRAMES } from "./constants";

const DebugFrameCounter: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        position: "absolute",
        top: 40,
        left: 40,
        fontSize: 28,
        color: "#FFFFFF",
        backgroundColor: "rgba(0,0,0,0.35)",
        padding: "8px 16px",
        borderRadius: 8,
        fontFamily: "Arial, sans-serif",
      }}
    >
      Кадр {frame} / {VIDEO_DURATION_IN_FRAMES}
    </div>
  );
};

export const GetCardReels: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      <Sequence from={SCENES.scene1.from} durationInFrames={SCENES.scene1.durationInFrames}>
        <Scene1 />
      </Sequence>
      <Sequence from={SCENES.scene2.from} durationInFrames={SCENES.scene2.durationInFrames}>
        <Scene2 />
      </Sequence>
      <Sequence from={SCENES.scene3.from} durationInFrames={SCENES.scene3.durationInFrames}>
        <Scene3 />
      </Sequence>
      <Sequence from={SCENES.scene4.from} durationInFrames={SCENES.scene4.durationInFrames}>
        <Scene4 />
      </Sequence>
      <DebugFrameCounter />
    </AbsoluteFill>
  );
};
