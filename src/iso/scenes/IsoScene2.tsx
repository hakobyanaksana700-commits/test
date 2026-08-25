import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Easing} from 'remotion';
import {IsoBackdrop} from '../components/IsoBackdrop';
import {IsoGlobeToy} from '../components/IsoGlobeToy';
import {IsoBarrierRing, buildBarrierRing} from '../components/IsoBarrier';
import {IsoCard, buildCardFragments, IsoCardFragments} from '../components/IsoCard';
import {IsoBadge} from '../components/IsoBadge';
import {IsoBurst} from '../components/IsoBurst';
import {ISO_COLORS, SERVICES} from '../theme';

const BARRIER_RADIUS = 350;
const IMPACT_FRAME = 68;
const FLIGHT_START = 34;
const IMPACT_ANGLE = (70 * Math.PI) / 180;
const IMPACT_X = Math.cos(IMPACT_ANGLE) * BARRIER_RADIUS;
const IMPACT_Z = Math.sin(IMPACT_ANGLE) * BARRIER_RADIUS;

const blocks = buildBarrierRing(BARRIER_RADIUS, 14);
const fragments = buildCardFragments(6);

export const IsoScene2: React.FC = () => {
	const frame = useCurrentFrame();
	const {width, height} = useVideoConfig();

	const originX = width / 2;
	const originY = height * 0.46;
	const scale = 0.72;

	const transitionScale = interpolate(frame, [0, 12], [1.45, 1], {
		extrapolateRight: 'clamp',
		easing: Easing.out(Easing.cubic),
	});
	const flash = interpolate(frame, [0, 4, 14], [0.85, 0.3, 0], {extrapolateRight: 'clamp'});

	const barrierOpacity = interpolate(frame, [8, 26], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
	const globeOpacity = interpolate(frame, [0, 10], [0, 1], {extrapolateRight: 'clamp'});

	const flightT = interpolate(frame, [FLIGHT_START, IMPACT_FRAME], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.in(Easing.cubic),
	});
	const startX = 260;
	const startY = 30;
	const startZ = 640;
	const cardX = interpolate(flightT, [0, 1], [startX, IMPACT_X]);
	const cardY = interpolate(flightT, [0, 1], [startY, 130]);
	const cardZ = interpolate(flightT, [0, 1], [startZ, IMPACT_Z]);
	const cardVisible = frame >= FLIGHT_START && frame < IMPACT_FRAME + 2;

	const bounceT = interpolate(frame, [IMPACT_FRAME, IMPACT_FRAME + 6], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.out(Easing.cubic),
	});
	const bounceX = IMPACT_X - Math.cos(IMPACT_ANGLE) * 60 * bounceT;
	const bounceZ = IMPACT_Z - Math.sin(IMPACT_ANGLE) * 60 * bounceT;

	const shatterProgress = interpolate(frame, [IMPACT_FRAME, 89], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.out(Easing.cubic),
	});
	const burstProgress = interpolate(frame, [IMPACT_FRAME, IMPACT_FRAME + 20], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	const orbitOpacity = interpolate(frame, [16, 30], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

	return (
		<AbsoluteFill style={{overflow: 'hidden'}}>
			<IsoBackdrop originX={originX} originY={originY} scale={scale} frame={frame} groundRadius={900} />

			<svg
				width={width}
				height={height}
				style={{position: 'absolute', inset: 0, transform: `scale(${transitionScale})`, transformOrigin: '50% 46%'}}
			>
				<g transform={`translate(${originX} ${originY})`}>
					<IsoGlobeToy originX={0} originY={0} scale={scale} radius={190} spin={frame * 1.4} opacity={globeOpacity} />

					<g opacity={barrierOpacity}>
						<IsoBarrierRing blocks={blocks} scale={scale} scatter={0} pulse={Math.sin(frame / 6) * 0.5 + 0.5} />
					</g>

					{frame >= IMPACT_FRAME && (
						<>
							<IsoBurst originX={0} originY={0} x={IMPACT_X} y={130} z={IMPACT_Z} progress={burstProgress} scale={scale} color={ISO_COLORS.mint} />
							<IsoCardFragments
								originX={0}
								originY={0}
								x={IMPACT_X}
								y={120}
								z={IMPACT_Z}
								color={ISO_COLORS.sky}
								progress={shatterProgress}
								scale={scale}
								fragments={fragments}
							/>
						</>
					)}

					{cardVisible && frame < IMPACT_FRAME && (
						<IsoCard
							originX={0}
							originY={0}
							x={cardX}
							y={cardY}
							z={cardZ}
							color={ISO_COLORS.sky}
							title="МИР"
							scale={scale}
							sizeMul={0.85}
						/>
					)}
					{cardVisible && frame >= IMPACT_FRAME && (
						<IsoCard
							originX={0}
							originY={0}
							x={bounceX}
							y={130}
							z={bounceZ}
							color={ISO_COLORS.sky}
							title="МИР"
							scale={scale}
							sizeMul={0.85}
							opacity={Math.max(0, 1 - shatterProgress * 3)}
						/>
					)}

					{SERVICES.map((label, i) => {
						const baseAngle = (Math.PI * 2 * i) / SERVICES.length;
						const angle = baseAngle + (frame * Math.PI) / 260;
						const radius = 470;
						const x = Math.cos(angle) * radius;
						const z = Math.sin(angle) * radius;
						const depth = Math.sin(angle);
						return (
							<IsoBadge
								key={label}
								label={label}
								originX={0}
								originY={0}
								x={x}
								y={260 + Math.sin(frame / 14 + i) * 16}
								z={z}
								scale={scale}
								opacity={orbitOpacity * (0.5 + 0.5 * (depth * 0.5 + 0.5))}
								pop={0.8 + (depth * 0.5 + 0.5) * 0.3}
							/>
						);
					})}
				</g>
			</svg>

			<AbsoluteFill style={{backgroundColor: '#fff', opacity: flash}} />
		</AbsoluteFill>
	);
};
