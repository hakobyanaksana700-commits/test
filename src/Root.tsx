import React from 'react';
import {Composition} from 'remotion';
import {GetCardReels} from './GetCardReels';

export const Root: React.FC = () => {
	return (
		<>
			<Composition
				id="GetCardReels"
				component={GetCardReels}
				durationInFrames={360}
				fps={30}
				width={1080}
				height={1920}
			/>
		</>
	);
};
