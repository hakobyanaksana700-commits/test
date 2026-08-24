import React from 'react';
import {AbsoluteFill, Sequence} from 'remotion';
import {Scene1} from './scenes/Scene1';
import {Scene2} from './scenes/Scene2';
import {Scene3} from './scenes/Scene3';
import {Scene4} from './scenes/Scene4';

const SCENE_LENGTH = 90;

export const GetCardReels: React.FC = () => {
	return (
		<AbsoluteFill style={{backgroundColor: '#000000'}}>
			<Sequence from={0 * SCENE_LENGTH} durationInFrames={SCENE_LENGTH} name="Scene1 — Платёж отклонён">
				<Scene1 />
			</Sequence>
			<Sequence from={1 * SCENE_LENGTH} durationInFrames={SCENE_LENGTH} name="Scene2 — Барьер">
				<Scene2 />
			</Sequence>
			<Sequence from={2 * SCENE_LENGTH} durationInFrames={SCENE_LENGTH} name="Scene3 — GetCard пробивает барьер">
				<Scene3 />
			</Sequence>
			<Sequence from={3 * SCENE_LENGTH} durationInFrames={SCENE_LENGTH} name="Scene4 — GetCard">
				<Scene4 />
			</Sequence>
		</AbsoluteFill>
	);
};
