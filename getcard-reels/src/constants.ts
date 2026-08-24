export const VIDEO_WIDTH = 1080;
export const VIDEO_HEIGHT = 1920;
export const VIDEO_FPS = 30;
export const VIDEO_DURATION_IN_FRAMES = 360; // 12 seconds

export const SCENE_DURATION_IN_FRAMES = 90; // 3 seconds each

export const SCENES = {
  scene1: { from: 0, durationInFrames: SCENE_DURATION_IN_FRAMES },
  scene2: { from: 90, durationInFrames: SCENE_DURATION_IN_FRAMES },
  scene3: { from: 180, durationInFrames: SCENE_DURATION_IN_FRAMES },
  scene4: { from: 270, durationInFrames: SCENE_DURATION_IN_FRAMES },
} as const;
