import React from 'react';
import {
	AbsoluteFill,
	useCurrentFrame,
	useVideoConfig,
	interpolate,
	Easing,
} from 'remotion';
import {NightBackground} from '../components/NightBackground';
import {Globe} from '../components/Globe';
import {Barrier} from '../components/Barrier';
import {MirCardFace, MIR_CARD_SIZE} from '../components/MirCard';
import {CardShatter} from '../components/CardShatter';
import {Shockwave, BurstParticles} from '../components/Shockwave';
import {ServiceBadge} from '../components/ServiceBadge';
import {COLORS, SERVICES} from '../theme';

const IMPACT_FRAME = 68;
const FLIGHT_START = 34;

export const Scene2: React.FC = () => {
	const frame = useCurrentFrame();
	const {width, height} = useVideoConfig();

	const cx = width / 2;
	const cy = height * 0.44;

	// fast zoom-in transition at the start of the scene
	const transitionScale = interpolate(frame, [0, 12], [1.5, 1], {
		extrapolateRight: 'clamp',
		easing: Easing.out(Easing.cubic),
	});
	const flashOpacity = interpolate(frame, [0, 4, 14], [0.9, 0.4, 0], {
		extrapolateRight: 'clamp',
	});

	const globeOpacity = interpolate(frame, [0, 10], [0, 1], {extrapolateRight: 'clamp'});
	const barrierStrength = interpolate(frame, [8, 28], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const barrierRadius = 330;

	// orbiting service badges around the globe/barrier
	const orbitRadius = barrierRadius + 150;
	const orbitOpacity = interpolate(frame, [16, 30], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	// MIR card flight path: from off-screen bottom-right toward the barrier
	const impactAngleDeg = 100; // svg coords, down-ish
	const impactRad = (impactAngleDeg * Math.PI) / 180;
	const impactX = Math.cos(impactRad) * barrierRadius;
	const impactY = Math.sin(impactRad) * barrierRadius;

	const flightT = interpolate(frame, [FLIGHT_START, IMPACT_FRAME], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.in(Easing.cubic),
	});
	const startX = 260;
	const startY = height * 0.62;
	const cardX = interpolate(flightT, [0, 1], [startX, impactX]);
	const cardY = interpolate(flightT, [0, 1], [startY, impactY]);
	const cardRotation = interpolate(flightT, [0, 1], [-18, 6]);
	const cardScale = interpolate(flightT, [0, 1], [0.62, 0.92]);
	const cardVisible = frame >= FLIGHT_START && frame < IMPACT_FRAME + 2;

	// bounce-back just before shatter fully takes over
	const bounceT = interpolate(frame, [IMPACT_FRAME, IMPACT_FRAME + 6], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.out(Easing.cubic),
	});
	const bounceX = impactX - Math.cos(impactRad) * 46 * bounceT;
	const bounceY = impactY - Math.sin(impactRad) * 46 * bounceT;

	const shatterProgress = interpolate(frame, [IMPACT_FRAME, 89], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.out(Easing.cubic),
	});
	const shockProgress = interpolate(frame, [IMPACT_FRAME, IMPACT_FRAME + 18], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	return (
		<AbsoluteFill style={{backgroundColor: COLORS.bgDarkA, overflow: 'hidden'}}>
			<NightBackground intensity={0.7} />

			<svg
				width={width}
				height={height}
				viewBox={`0 0 ${width} ${height}`}
				style={{position: 'absolute', inset: 0, transform: `scale(${transitionScale})`, transformOrigin: '50% 44%'}}
			>
				<g transform={`translate(${cx} ${cy})`}>
					<Globe frame={frame} radius={220} opacity={globeOpacity} />
					<Barrier frame={frame} radius={barrierRadius} strength={barrierStrength} />

					{frame >= IMPACT_FRAME ? (
						<g transform={`translate(${impactX} ${impactY})`}>
							<Shockwave progress={shockProgress} maxRadius={420} color={COLORS.teal} />
							<BurstParticles
								progress={shockProgress}
								color={COLORS.teal}
								count={22}
								spread={360}
							/>
							<CardShatter
								id="mir"
								W={MIR_CARD_SIZE.W}
								H={MIR_CARD_SIZE.H}
								progress={shatterProgress}
								face={<MirCardFace />}
							/>
						</g>
					) : cardVisible ? (
						<g
							transform={`translate(${bounceT > 0 ? bounceX : cardX} ${
								bounceT > 0 ? bounceY : cardY
							}) rotate(${cardRotation}) scale(${cardScale})`}
						>
							<MirCardFace />
						</g>
					) : null}
				</g>
			</svg>

			{SERVICES.map((label, i) => {
				const baseAngle = (360 / SERVICES.length) * i;
				const angle = baseAngle + frame * 0.6;
				const rad = (angle * Math.PI) / 180;
				const x = cx + Math.cos(rad) * orbitRadius;
				const y = cy + Math.sin(rad) * orbitRadius * 0.62;
				const depth = Math.sin(rad);
				return (
					<ServiceBadge
						key={label}
						label={label}
						x={x}
						y={y}
						opacity={orbitOpacity * (0.55 + 0.45 * (depth * 0.5 + 0.5))}
						scale={0.75 + (depth * 0.5 + 0.5) * 0.35}
					/>
				);
			})}

			<AbsoluteFill style={{backgroundColor: '#fff', opacity: flashOpacity}} />
		</AbsoluteFill>
	);
};
