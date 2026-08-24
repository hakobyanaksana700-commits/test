import React from 'react';
import {useCurrentFrame, useVideoConfig, interpolate} from 'remotion';
import {COLORS} from '../theme';

// Dark cinematic fintech background: gradient + soft glow + blurred city lights + light lines.
export const NightBackground: React.FC<{intensity?: number}> = ({
	intensity = 1,
}) => {
	const frame = useCurrentFrame();
	const {width, height} = useVideoConfig();

	const drift = interpolate(frame, [0, 300], [0, 40], {
		extrapolateRight: 'clamp',
	});

	const lights = new Array(14).fill(0).map((_, i) => {
		const seed = i * 137.5;
		const x = (Math.sin(seed) * 0.5 + 0.5) * width;
		const y = (Math.cos(seed * 1.3) * 0.5 + 0.5) * height * 0.7 + height * 0.1;
		const r = 30 + (i % 5) * 18;
		const hue = i % 3 === 0 ? COLORS.blue : i % 3 === 1 ? COLORS.teal : COLORS.white;
		return {x, y, r, hue, key: i};
	});

	return (
		<svg
			width={width}
			height={height}
			viewBox={`0 0 ${width} ${height}`}
			style={{position: 'absolute', inset: 0}}
		>
			<defs>
				<radialGradient id="bgGlow" cx="50%" cy="38%" r="75%">
					<stop offset="0%" stopColor={COLORS.bgDarkC} stopOpacity={1} />
					<stop offset="55%" stopColor={COLORS.bgDarkB} stopOpacity={1} />
					<stop offset="100%" stopColor={COLORS.bgDarkA} stopOpacity={1} />
				</radialGradient>
				<filter id="cityBlur" x="-50%" y="-50%" width="200%" height="200%">
					<feGaussianBlur stdDeviation="22" />
				</filter>
			</defs>
			<rect x={0} y={0} width={width} height={height} fill="url(#bgGlow)" />
			<g filter="url(#cityBlur)" opacity={0.55 * intensity}>
				{lights.map((l) => (
					<circle
						key={l.key}
						cx={l.x + drift * (l.key % 2 === 0 ? 1 : -1) * 0.2}
						cy={l.y}
						r={l.r}
						fill={l.hue}
						opacity={0.35}
					/>
				))}
			</g>
			<g opacity={0.18 * intensity} stroke={COLORS.teal} strokeWidth={1.5}>
				{new Array(6).fill(0).map((_, i) => {
					const y = height * 0.15 + i * (height * 0.14);
					const shift = ((frame * 1.5 + i * 60) % (width + 400)) - 400;
					return (
						<line
							key={i}
							x1={shift}
							y1={y}
							x2={shift + 260}
							y2={y - 90}
							strokeLinecap="round"
						/>
					);
				})}
			</g>
		</svg>
	);
};
