import React from 'react';
import {
	AbsoluteFill,
	useCurrentFrame,
	useVideoConfig,
	interpolate,
	spring,
	Easing,
} from 'remotion';
import {NightBackground} from '../components/NightBackground';
import {PersonWithPhone} from '../components/PersonWithPhone';
import {ServiceBadge} from '../components/ServiceBadge';
import {COLORS, FONT_STACK, SERVICES} from '../theme';

export const Scene1: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps, width, height} = useVideoConfig();

	// slow, steady push-in for the whole scene
	const camScale = interpolate(frame, [0, 89], [1, 1.12], {
		easing: Easing.inOut(Easing.ease),
	});

	const sceneIn = spring({frame, fps, config: {damping: 200}, durationInFrames: 20});

	const glow = interpolate(frame, [10, 55], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.inOut(Easing.ease),
	});

	const textSpring = spring({
		frame: frame - 34,
		fps,
		config: {damping: 14, stiffness: 120, mass: 0.9},
		durationInFrames: 26,
	});
	const textOpacity = interpolate(frame, [34, 50], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const textScale = interpolate(textSpring, [0, 1], [0.82, 1]);

	const badgeY = height * 0.83;
	const badgeStartFrame = 48;

	return (
		<AbsoluteFill style={{backgroundColor: COLORS.bgDarkA, overflow: 'hidden'}}>
			<NightBackground intensity={0.9} />

			<AbsoluteFill
				style={{
					transform: `scale(${camScale})`,
					opacity: sceneIn,
				}}
			>
				<svg
					width={width}
					height={height}
					viewBox={`0 0 ${width} ${height}`}
					style={{position: 'absolute', inset: 0}}
				>
					<g transform={`translate(${width / 2} ${height * 0.56})`}>
						<PersonWithPhone glow={glow} scale={1.05} />
					</g>
				</svg>
			</AbsoluteFill>

			{/* vignette for cinematic focus */}
			<AbsoluteFill
				style={{
					background:
						'radial-gradient(ellipse at 50% 45%, rgba(0,0,0,0) 40%, rgba(0,0,0,0.55) 100%)',
				}}
			/>

			<AbsoluteFill
				style={{
					alignItems: 'center',
					justifyContent: 'flex-start',
					paddingTop: height * 0.14,
				}}
			>
				<div
					style={{
						opacity: textOpacity,
						transform: `scale(${textScale})`,
						fontFamily: FONT_STACK,
						fontWeight: 800,
						fontSize: 68,
						letterSpacing: 1,
						color: '#fff',
						textAlign: 'center',
						textShadow: `0 0 40px ${COLORS.red}aa, 0 4px 24px rgba(0,0,0,0.6)`,
					}}
				>
					ПЛАТЁЖ ОТКЛОНЁН
				</div>
			</AbsoluteFill>

			{SERVICES.map((label, i) => {
				const start = badgeStartFrame + i * 7;
				const s = spring({
					frame: frame - start,
					fps,
					config: {damping: 12, stiffness: 140, mass: 0.7},
					durationInFrames: 18,
				});
				const op = interpolate(frame, [start, start + 10], [0, 1], {
					extrapolateLeft: 'clamp',
					extrapolateRight: 'clamp',
				});
				const spread = width * 0.88;
				const x = width / 2 + (i - (SERVICES.length - 1) / 2) * (spread / (SERVICES.length - 1));
				return (
					<ServiceBadge
						key={label}
						label={label}
						x={x}
						y={badgeY - (1 - s) * 30}
						opacity={op}
						scale={0.7 + s * 0.3}
					/>
				);
			})}
		</AbsoluteFill>
	);
};
