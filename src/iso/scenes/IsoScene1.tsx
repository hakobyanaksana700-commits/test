import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring, Easing} from 'remotion';
import {IsoBackdrop} from '../components/IsoBackdrop';
import {IsoPersonPhone} from '../components/IsoPersonPhone';
import {IsoBadge} from '../components/IsoBadge';
import {KineticTitle} from '../components/KineticTitle';
import {SERVICES} from '../theme';

export const IsoScene1: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps, width, height} = useVideoConfig();

	const originX = width / 2;
	const originY = height * 0.64;
	const scale = 0.92;

	const camScale = interpolate(frame, [0, 89], [1, 1.1], {easing: Easing.inOut(Easing.ease)});
	const sceneIn = spring({frame, fps, config: {damping: 200}, durationInFrames: 18});

	const glow = interpolate(frame, [10, 55], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.inOut(Easing.ease),
	});

	const textSpring = spring({frame: frame - 32, fps, config: {damping: 11, stiffness: 150, mass: 0.8}, durationInFrames: 22});
	const textOpacity = interpolate(frame, [32, 46], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
	const textScale = interpolate(textSpring, [0, 1], [0.75, 1]);

	return (
		<AbsoluteFill style={{overflow: 'hidden'}}>
			<IsoBackdrop originX={originX} originY={originY} scale={scale} frame={frame} />

			<AbsoluteFill style={{transform: `scale(${camScale})`, opacity: sceneIn}}>
				<svg width={width} height={height} style={{position: 'absolute', inset: 0}}>
					<g transform={`translate(${originX} ${originY})`}>
						<IsoPersonPhone originX={0} originY={0} scale={scale} glow={glow} />
					</g>
				</svg>
			</AbsoluteFill>

			<AbsoluteFill style={{alignItems: 'center', justifyContent: 'flex-start', paddingTop: height * 0.1}}>
				<KineticTitle text="ПЛАТЁЖ ОТКЛОНЁН" scale={textScale} opacity={textOpacity} fontSize={64} />
			</AbsoluteFill>

			<svg width={width} height={height} style={{position: 'absolute', inset: 0}}>
				<g transform={`translate(${originX} ${originY})`}>
					{SERVICES.map((label, i) => {
						const start = 46 + i * 7;
						const s = spring({frame: frame - start, fps, config: {damping: 12, stiffness: 150, mass: 0.7}, durationInFrames: 16});
						const op = interpolate(frame, [start, start + 10], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
						const spreadCount = SERVICES.length - 1;
						const worldX = (i - spreadCount / 2) * 190;
						return (
							<IsoBadge
								key={label}
								label={label}
								originX={0}
								originY={0}
								x={worldX}
								z={330}
								scale={scale}
								opacity={op}
								pop={0.6 + s * 0.4}
							/>
						);
					})}
				</g>
			</svg>
		</AbsoluteFill>
	);
};
