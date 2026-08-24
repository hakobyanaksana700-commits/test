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
import {Globe} from '../components/Globe';
import {Barrier} from '../components/Barrier';
import {GetCardFace} from '../components/GetCardCard';
import {Shockwave, BurstParticles} from '../components/Shockwave';
import {ServiceBadge} from '../components/ServiceBadge';
import {COLORS, SERVICES} from '../theme';

const IMPACT_FRAME = 56;
const APPROACH_START = 16;

export const Scene3: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps, width, height} = useVideoConfig();

	const cx = width / 2;
	const cy = height * 0.44;
	const barrierRadius = 330;

	const globeOpacity = interpolate(frame, [0, 10], [0.9, 1]);

	// card approaches from depth: scale + opacity grow, simulating flying toward camera
	const approach = interpolate(frame, [APPROACH_START, IMPACT_FRAME], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.in(Easing.cubic),
	});
	const cardOpacity = interpolate(frame, [APPROACH_START, APPROACH_START + 12], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const cardScaleApproach = interpolate(approach, [0, 1], [0.18, 1.05]);

	// punch-through spring right after impact, then settle
	const punch = spring({
		frame: frame - IMPACT_FRAME,
		fps,
		config: {damping: 10, stiffness: 120, mass: 0.8},
		durationInFrames: 24,
	});
	const cardScale = frame < IMPACT_FRAME ? cardScaleApproach : interpolate(punch, [0, 0.4, 1], [1.05, 1.28, 1.12]);

	const flash = interpolate(frame, [IMPACT_FRAME - 1, IMPACT_FRAME + 2, IMPACT_FRAME + 12], [0, 1, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	const barrierStrength = interpolate(frame, [IMPACT_FRAME, IMPACT_FRAME + 16], [1, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.out(Easing.cubic),
	});
	const barrierBroken = frame > IMPACT_FRAME + 16;

	const shockProgress = interpolate(frame, [IMPACT_FRAME, IMPACT_FRAME + 22], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	const servicesStart = IMPACT_FRAME + 12;

	return (
		<AbsoluteFill style={{backgroundColor: COLORS.bgDarkA, overflow: 'hidden'}}>
			<NightBackground intensity={0.75} />

			<svg
				width={width}
				height={height}
				viewBox={`0 0 ${width} ${height}`}
				style={{position: 'absolute', inset: 0}}
			>
				<g transform={`translate(${cx} ${cy})`}>
					<Globe frame={frame} radius={220} opacity={globeOpacity} />
					{!barrierBroken && (
						<Barrier frame={frame} radius={barrierRadius} strength={barrierStrength} />
					)}

					{/* barrier break: red shards bursting outward */}
					{frame >= IMPACT_FRAME && (
						<>
							<BurstParticles
								progress={shockProgress}
								color={COLORS.red}
								count={40}
								spread={620}
								seedOffset={11}
							/>
							<Shockwave progress={shockProgress} maxRadius={620} color={COLORS.white} />
						</>
					)}

					{frame >= APPROACH_START && (
						<g transform={`scale(${cardScale})`} opacity={cardOpacity}>
							<GetCardFace shine={interpolate(frame, [0, 89], [0, 1])} />
						</g>
					)}
				</g>
			</svg>

			<AbsoluteFill style={{backgroundColor: '#fff', opacity: flash * 0.85}} />

			{SERVICES.map((label, i) => {
				const start = servicesStart + i * 6;
				const s = spring({
					frame: frame - start,
					fps,
					config: {damping: 11, stiffness: 160, mass: 0.6},
					durationInFrames: 16,
				});
				const lit = frame >= start;
				const spread = width * 0.88;
				const x = width / 2 + (i - (SERVICES.length - 1) / 2) * (spread / (SERVICES.length - 1));
				const y = height * 0.85;
				return (
					<ServiceBadge
						key={label}
						label={label}
						x={x}
						y={y}
						opacity={1}
						scale={1 + (lit ? s * 0.18 : 0)}
						glow={lit ? 'green' : 'none'}
					/>
				);
			})}
		</AbsoluteFill>
	);
};
