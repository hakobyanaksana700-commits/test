import React from 'react';
import {AbsoluteFill, Sequence} from 'remotion';
import {IsoScene1} from './scenes/IsoScene1';
import {IsoScene2} from './scenes/IsoScene2';
import {IsoScene3} from './scenes/IsoScene3';
import {IsoScene4} from './scenes/IsoScene4';

const SCENE_LENGTH = 90;

// Same story as GetCardReels (declined payment -> barrier -> GetCard breaks
// through -> CTA), told in an entirely different visual language: bright
// flat isometric "3D toy" objects instead of the dark cinematic neon look.
export const GetCardReelsIso: React.FC = () => {
	return (
		<AbsoluteFill style={{backgroundColor: '#eaf1ff'}}>
			<Sequence from={0 * SCENE_LENGTH} durationInFrames={SCENE_LENGTH} name="IsoScene1 — Платёж отклонён">
				<IsoScene1 />
			</Sequence>
			<Sequence from={1 * SCENE_LENGTH} durationInFrames={SCENE_LENGTH} name="IsoScene2 — Барьер">
				<IsoScene2 />
			</Sequence>
			<Sequence from={2 * SCENE_LENGTH} durationInFrames={SCENE_LENGTH} name="IsoScene3 — GetCard пробивает барьер">
				<IsoScene3 />
			</Sequence>
			<Sequence from={3 * SCENE_LENGTH} durationInFrames={SCENE_LENGTH} name="IsoScene4 — GetCard">
				<IsoScene4 />
			</Sequence>
		</AbsoluteFill>
	);
};
