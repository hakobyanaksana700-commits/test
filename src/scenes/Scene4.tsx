import React from 'react';
import {
	AbsoluteFill,
	useCurrentFrame,
	useVideoConfig,
	interpolate,
	spring,
	Easing,
} from 'remotion';
import {GetCardFace, GETCARD_SIZE} from '../components/GetCardCard';
import {Finger} from '../components/Finger';
import {CtaButton} from '../components/CtaButton';
import {COLORS, FONT_STACK} from '../theme';

const BUTTON_START = 40;
const FINGER_DESCEND_START = 56;
const PRESS_FRAME = 70;
const FINAL_HOLD_START = 75;

export const Scene4: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps, width, height} = useVideoConfig();

	const cardCx = width / 2;
	const cardCy = height * 0.35;

	const entrance = spring({frame, fps, config: {damping: 14, stiffness: 90, mass: 1}, durationInFrames: 22});
	const cardScale = interpolate(entrance, [0, 1], [0.55, 1.35]);
	const cardOpacity = interpolate(frame, [0, 12], [0, 1], {extrapolateRight: 'clamp'});

	// gentle continuous sway + slow spin for depth
	const sway = Math.sin(frame / 42) * 16;
	const bob = Math.sin(frame / 30) * 10;
	const rotY = Math.sin(frame / 55) * 0.35; // used to fake perspective via scaleX squeeze
	const skew = interpolate(rotY, [-0.35, 0.35], [-8, 8]);
	const squeeze = interpolate(Math.abs(rotY), [0, 0.35], [1, 0.86]);

	const shine = (Math.sin(frame / 26) + 1) / 2;

	const titleOpacity = interpolate(frame, [18, 32], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
	const titleY = interpolate(frame, [18, 32], [24, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

	const btnSpring = spring({
		frame: frame - BUTTON_START,
		fps,
		config: {damping: 12, stiffness: 130, mass: 0.8},
		durationInFrames: 20,
	});
	const btnOpacity = interpolate(frame, [BUTTON_START, BUTTON_START + 12], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const btnBaseScale = interpolate(btnSpring, [0, 1], [0.6, 1]);

	const pressAmount = spring({
		frame: frame - PRESS_FRAME,
		fps,
		config: {damping: 7, stiffness: 260, mass: 0.5},
		durationInFrames: 10,
	});
	const pressSquash = frame >= PRESS_FRAME ? 1 - Math.max(0, 0.5 - Math.abs(pressAmount - 0.5)) * 0.16 : 1;

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
	const fingerOpacity = interpolate(frame, [FINGER_DESCEND_START, FINGER_DESCEND_START + 8, FINAL_HOLD_START - 6, FINAL_HOLD_START], [0, 1, 1, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	// soft floating particles
	const particles = new Array(18).fill(0).map((_, i) => {
		const seed = i * 71.3;
		const x = width / 2 + Math.sin(seed) * width * 0.42;
		const baseY = height * 0.15 + ((Math.cos(seed * 1.7) * 0.5 + 0.5) * height * 0.55);
		const y = baseY - ((frame * (0.4 + (i % 4) * 0.15)) % (height * 0.6));
		const size = 3 + (i % 4) * 2;
		return {x, y, size, key: i, op: 0.25 + (i % 3) * 0.15};
	});

	const gradAngle = 135 + Math.sin(frame / 90) * 12;

	return (
		<AbsoluteFill
			style={{
				overflow: 'hidden',
				background: `linear-gradient(${gradAngle}deg, ${COLORS.orange} 0%, #2a1c3a 38%, ${COLORS.bgDarkB} 68%, ${COLORS.blue} 100%)`,
			}}
		>
			{/* soft radial glow behind the card */}
			<AbsoluteFill
				style={{
					background: `radial-gradient(circle at 50% 32%, rgba(255,180,110,0.35) 0%, rgba(255,180,110,0) 55%)`,
				}}
			/>

			<svg width={width} height={height} style={{position: 'absolute', inset: 0}}>
				{particles.map((p) => (
					<circle key={p.key} cx={p.x} cy={p.y} r={p.size} fill={COLORS.gold} opacity={p.op} />
				))}
			</svg>

			<svg width={width} height={height} style={{position: 'absolute', inset: 0}}>
				<defs>
					<linearGradient id="reflFade" x1="0" y1="0" x2="0" y2="1">
						<stop offset="0%" stopColor="#fff" stopOpacity={0.5} />
						<stop offset="100%" stopColor="#fff" stopOpacity={0} />
					</linearGradient>
					<mask id="reflMask">
						<rect
							x={-GETCARD_SIZE.W / 2 - 20}
							y={0}
							width={GETCARD_SIZE.W + 40}
							height={GETCARD_SIZE.H * 0.8}
							fill="url(#reflFade)"
						/>
					</mask>
				</defs>
				<g transform={`translate(${cardCx + sway} ${cardCy + bob})`} opacity={cardOpacity}>
					<g transform={`scale(${cardScale * squeeze} ${cardScale}) skewX(${skew})`}>
						{/* reflection: mirrored below the card's bottom edge, faded out */}
						<g transform={`translate(0 ${GETCARD_SIZE.H}) scale(1 -1)`} mask="url(#reflMask)" opacity={0.3}>
							<GetCardFace shine={shine} />
						</g>
						<GetCardFace shine={shine} />
					</g>
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
						fontWeight: 800,
						fontSize: 78,
						letterSpacing: 1,
						color: '#fff',
						textShadow: '0 6px 30px rgba(0,0,0,0.35)',
						textAlign: 'center',
					}}
				>
					GetCard.one
				</div>

				<div
					style={{
						position: 'absolute',
						top: height * 0.68,
						transform: `scale(${pressSquash})`,
					}}
				>
					<CtaButton scale={btnBaseScale} opacity={btnOpacity} rippleProgress={rippleProgress} />
				</div>

				{fingerOpacity > 0 && (
					<svg
						width={220}
						height={520}
						style={{
							position: 'absolute',
							top: height * 0.68 - 470,
							opacity: fingerOpacity,
							transform: `translateY(${fingerY}px)`,
						}}
						viewBox="-110 -260 220 520"
					>
						<Finger press={frame >= PRESS_FRAME ? 1 : 0} />
					</svg>
				)}
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
