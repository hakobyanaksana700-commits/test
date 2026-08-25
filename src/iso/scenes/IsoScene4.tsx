import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring, Easing} from 'remotion';
import {IsoCard} from '../components/IsoCard';
import {IsoConfetti} from '../components/IsoConfetti';
import {IsoButton} from '../components/IsoButton';
import {IsoFinger} from '../components/IsoFinger';
import {FONT_STACK, ISO_COLORS} from '../theme';

const BUTTON_START = 40;
const FINGER_DESCEND_START = 56;
const PRESS_FRAME = 70;
const FINAL_HOLD_START = 75;

export const IsoScene4: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps, width, height} = useVideoConfig();

	const originX = width / 2;
	const originY = height * 0.36;
	const scale = 0.92;

	const entrance = spring({frame, fps, config: {damping: 14, stiffness: 90, mass: 1}, durationInFrames: 22});
	const cardSize = interpolate(entrance, [0, 1], [0.55, 1.05]);
	const cardOpacity = interpolate(frame, [0, 12], [0, 1], {extrapolateRight: 'clamp'});
	const bob = Math.sin(frame / 26) * 14;
	const sway = Math.sin(frame / 48) * 90;

	const titleOpacity = interpolate(frame, [18, 32], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
	const titleY = interpolate(frame, [18, 32], [24, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

	const btnSpring = spring({frame: frame - BUTTON_START, fps, config: {damping: 12, stiffness: 130, mass: 0.8}, durationInFrames: 20});
	const btnOpacity = interpolate(frame, [BUTTON_START, BUTTON_START + 12], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
	const btnBaseScale = interpolate(btnSpring, [0, 1], [0.6, 1]);

	const pressAmount = spring({frame: frame - PRESS_FRAME, fps, config: {damping: 7, stiffness: 260, mass: 0.5}, durationInFrames: 10});
	const pressDepth = frame >= PRESS_FRAME ? Math.min(1, pressAmount * 2) * Math.max(0, 1 - (frame - PRESS_FRAME) / 10) : 0;
	const rippleProgress = interpolate(frame, [PRESS_FRAME, PRESS_FRAME + 16], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	const fingerProgress = interpolate(frame, [FINGER_DESCEND_START, PRESS_FRAME], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.in(Easing.cubic),
	});
	const fingerLift = interpolate(frame, [PRESS_FRAME + 4, FINAL_HOLD_START], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const fingerY = interpolate(fingerProgress, [0, 1], [-420, -40]) + fingerLift * -260;
	const fingerOpacity = interpolate(
		frame,
		[FINGER_DESCEND_START, FINGER_DESCEND_START + 8, FINAL_HOLD_START - 6, FINAL_HOLD_START],
		[0, 1, 1, 0],
		{extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
	);

	return (
		<AbsoluteFill
			style={{
				overflow: 'hidden',
				background: `linear-gradient(150deg, ${ISO_COLORS.orange} 0%, #ffd9a0 30%, #cfe0ff 62%, ${ISO_COLORS.blueDeep} 100%)`,
			}}
		>
			<AbsoluteFill
				style={{background: `radial-gradient(circle at 50% 30%, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 55%)`}}
			/>

			<svg width={width} height={height} style={{position: 'absolute', inset: 0}}>
				<g transform={`translate(${originX + sway} ${originY})`}>
					<IsoConfetti frame={frame} scale={scale * 0.9} count={16} />

					{/* reflection */}
					<g transform="scale(1 -1) translate(0 -210)" opacity={0.16}>
						<IsoCard
							originX={0}
							originY={0}
							x={0}
							y={bob}
							z={0}
							color={ISO_COLORS.navy}
							title="GetCard"
							subtitle="GETCARD.ONE"
							scale={scale}
							sizeMul={cardSize}
							opacity={cardOpacity}
							gold
							shadow={false}
							hideText
						/>
					</g>

					<IsoCard
						originX={0}
						originY={0}
						x={0}
						y={140 + bob}
						z={0}
						color={ISO_COLORS.navy}
						title="GetCard"
						subtitle="GETCARD.ONE"
						scale={scale}
						sizeMul={cardSize}
						opacity={cardOpacity}
						gold
					/>
				</g>
			</svg>

			<AbsoluteFill style={{alignItems: 'center'}}>
				<div
					style={{
						position: 'absolute',
						top: height * 0.56,
						opacity: titleOpacity,
						transform: `translateY(${titleY}px)`,
						fontFamily: FONT_STACK,
						fontWeight: 900,
						fontSize: 76,
						letterSpacing: 0.5,
						color: ISO_COLORS.ink,
						textShadow: '4px 4px 0 rgba(255,255,255,0.5)',
						textAlign: 'center',
					}}
				>
					GetCard.one
				</div>

				<div style={{position: 'absolute', top: height * 0.68}}>
					<IsoButton scale={btnBaseScale} opacity={btnOpacity} pressDepth={pressDepth} rippleProgress={rippleProgress} />
				</div>

				{fingerOpacity > 0 && (
					<svg
						width={220}
						height={520}
						style={{position: 'absolute', top: height * 0.68 - 470, opacity: fingerOpacity, transform: `translateY(${fingerY}px)`}}
						viewBox="-110 -260 220 520"
					>
						<IsoFinger press={frame >= PRESS_FRAME ? 1 : 0} />
					</svg>
				)}
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
