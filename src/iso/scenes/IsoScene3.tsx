import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring, Easing} from 'remotion';
import {IsoBackdrop} from '../components/IsoBackdrop';
import {IsoGlobeToy} from '../components/IsoGlobeToy';
import {IsoBarrierRing, buildBarrierRing} from '../components/IsoBarrier';
import {IsoCard} from '../components/IsoCard';
import {IsoBadge} from '../components/IsoBadge';
import {IsoBurst} from '../components/IsoBurst';
import {ISO_COLORS, SERVICES} from '../theme';

const BARRIER_RADIUS = 350;
const IMPACT_FRAME = 56;
const APPROACH_START = 14;

const blocks = buildBarrierRing(BARRIER_RADIUS, 14);

export const IsoScene3: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps, width, height} = useVideoConfig();

	const originX = width / 2;
	const originY = height * 0.46;
	const scale = 0.72;

	const globeOpacity = interpolate(frame, [0, 10], [0.9, 1]);

	const approach = interpolate(frame, [APPROACH_START, IMPACT_FRAME], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.in(Easing.cubic),
	});
	const cardOpacity = interpolate(frame, [APPROACH_START, APPROACH_START + 12], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const cardZ = interpolate(approach, [0, 1], [-140, BARRIER_RADIUS]);
	const cardSize = interpolate(approach, [0, 1], [0.35, 1]);

	const punch = spring({frame: frame - IMPACT_FRAME, fps, config: {damping: 10, stiffness: 120, mass: 0.8}, durationInFrames: 24});
	const settledZ = interpolate(punch, [0, 0.4, 1], [BARRIER_RADIUS, BARRIER_RADIUS + 90, BARRIER_RADIUS + 30]);
	const finalCardZ = frame < IMPACT_FRAME ? cardZ : settledZ;
	const finalCardSize = frame < IMPACT_FRAME ? cardSize : interpolate(punch, [0, 0.4, 1], [1, 1.12, 1.02]);

	const flash = interpolate(frame, [IMPACT_FRAME - 1, IMPACT_FRAME + 2, IMPACT_FRAME + 12], [0, 0.8, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	const scatter = interpolate(frame, [IMPACT_FRAME, IMPACT_FRAME + 18], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.out(Easing.cubic),
	});
	const burstProgress = interpolate(frame, [IMPACT_FRAME, IMPACT_FRAME + 22], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	const servicesStart = IMPACT_FRAME + 12;

	return (
		<AbsoluteFill style={{overflow: 'hidden'}}>
			<IsoBackdrop originX={originX} originY={originY} scale={scale} frame={frame} groundRadius={900} />

			<svg width={width} height={height} style={{position: 'absolute', inset: 0}}>
				<g transform={`translate(${originX} ${originY})`}>
					<IsoGlobeToy originX={0} originY={0} scale={scale} radius={190} spin={frame * 1.4} opacity={globeOpacity} />

					<IsoBarrierRing blocks={blocks} scale={scale} scatter={scatter} />

					{frame >= IMPACT_FRAME && (
						<IsoBurst originX={0} originY={0} x={0} y={130} z={BARRIER_RADIUS} progress={burstProgress} scale={scale} color={ISO_COLORS.yellow} />
					)}

					{frame >= APPROACH_START && (
						<IsoCard
							originX={0}
							originY={0}
							x={0}
							y={130}
							z={finalCardZ}
							color={ISO_COLORS.navy}
							title="GetCard"
							subtitle="GETCARD.ONE"
							scale={scale}
							sizeMul={finalCardSize}
							opacity={cardOpacity}
							gold
						/>
					)}
				</g>
			</svg>

			<AbsoluteFill style={{backgroundColor: '#fff', opacity: flash}} />

			<svg width={width} height={height} style={{position: 'absolute', inset: 0}}>
				<g transform={`translate(${originX} ${height * 0.86})`}>
					{SERVICES.map((label, i) => {
						const start = servicesStart + i * 6;
						const s = spring({frame: frame - start, fps, config: {damping: 11, stiffness: 160, mass: 0.6}, durationInFrames: 16});
						const lit = frame >= start;
						const spreadCount = SERVICES.length - 1;
						const worldX = (i - spreadCount / 2) * 200;
						return (
							<IsoBadge
								key={label}
								label={label}
								originX={0}
								originY={0}
								x={worldX}
								z={0}
								scale={scale * 0.9}
								opacity={1}
								pop={0.85 + (lit ? s * 0.25 : 0)}
								state={lit ? 'green' : 'neutral'}
							/>
						);
					})}
				</g>
			</svg>
		</AbsoluteFill>
	);
};
