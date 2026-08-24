import React from 'react';
import {COLORS} from '../theme';

/**
 * Stylised person viewed from behind/three-quarter, holding a phone up in
 * front of their face with both hands. The phone's screen faces the person
 * (away from camera) — the camera only ever sees the back of the device,
 * so the screen itself is never shown front-on. A red rim-glow bleeds
 * around the phone edges and across the hands/head to read as "screen glow"
 * without exposing the screen face.
 */
export const PersonWithPhone: React.FC<{
	glow: number; // 0..1 glow intensity (red)
	x?: number;
	y?: number;
	scale?: number;
}> = ({glow, x = 0, y = 0, scale = 1}) => {
	const glowOpacity = 0.25 + glow * 0.75;
	const glowBlur = 18 + glow * 26;

	return (
		<g transform={`translate(${x} ${y}) scale(${scale})`}>
			<defs>
				<linearGradient id="personBody" x1="0" y1="0" x2="0" y2="1">
					<stop offset="0%" stopColor="#1c2440" />
					<stop offset="100%" stopColor="#0a0e1c" />
				</linearGradient>
				<radialGradient id="phoneGlowGrad" cx="50%" cy="50%" r="50%">
					<stop offset="0%" stopColor={COLORS.redGlow} stopOpacity={0.95} />
					<stop offset="60%" stopColor={COLORS.red} stopOpacity={0.5} />
					<stop offset="100%" stopColor={COLORS.red} stopOpacity={0} />
				</radialGradient>
				<filter id="softBlur" x="-100%" y="-100%" width="300%" height="300%">
					<feGaussianBlur stdDeviation={glowBlur / 4} />
				</filter>
			</defs>

			{/* ambient red glow puddle behind phone, illuminating the scene */}
			<ellipse
				cx={0}
				cy={-210}
				rx={230}
				ry={200}
				fill="url(#phoneGlowGrad)"
				opacity={glowOpacity}
				filter="url(#softBlur)"
			/>

			{/* torso, back view */}
			<path
				d="M -140 520 C -150 280 -110 120 0 100 C 110 120 150 280 140 520 Z"
				fill="url(#personBody)"
			/>
			{/* shoulder highlight */}
			<path
				d="M -140 300 C -130 220 -80 140 0 130 C 80 140 130 220 140 300 L 120 320 C 100 240 60 180 0 175 C -60 180 -100 240 -120 320 Z"
				fill="#232c4e"
				opacity={0.6}
			/>

			{/* head, back/three-quarter view */}
			<ellipse cx={0} cy={-20} rx={78} ry={92} fill="#151b32" />
			<path
				d="M -78 -30 C -80 -90 -40 -128 0 -128 C 42 -128 80 -92 78 -32 C 78 -32 60 -55 40 -60 C 40 -95 -40 -95 -40 -60 C -58 -55 -78 -32 -78 -30 Z"
				fill="#10152a"
			/>
			{/* rim light on cheek/ear from phone glow */}
			<path
				d="M 58 -10 C 70 10 70 40 52 55 C 66 30 66 5 50 -14 Z"
				fill={COLORS.redGlow}
				opacity={glowOpacity * 0.8}
				filter="url(#softBlur)"
			/>

			{/* upper arms raised toward face */}
			<path
				d="M -132 300 C -170 220 -150 100 -84 40 C -74 30 -56 40 -60 58 C -104 108 -118 210 -96 288 Z"
				fill="#171f3a"
			/>
			<path
				d="M 132 300 C 170 220 150 100 84 40 C 74 30 56 40 60 58 C 104 108 118 210 96 288 Z"
				fill="#1a2340"
			/>

			{/* forearms + hands holding phone near face height */}
			<path
				d="M -96 288 C -80 210 -56 140 -18 96 C -6 84 8 90 4 104 C -30 148 -50 210 -62 280 Z"
				fill="#1c2544"
			/>
			<path
				d="M 96 288 C 80 210 56 140 18 96 C 6 84 -8 90 -4 104 C 30 148 50 210 62 280 Z"
				fill="#1f2948"
			/>
			<ellipse cx={-56} cy={70} rx={26} ry={20} fill="#232c4e" transform="rotate(-25 -56 70)" />
			<ellipse cx={56} cy={70} rx={26} ry={20} fill="#232c4e" transform="rotate(25 56 70)" />

			{/* phone body — back facing camera, screen faces the person (hidden) */}
			<g transform="translate(0 40) rotate(2)">
				<rect
					x={-58}
					y={-108}
					width={116}
					height={216}
					rx={20}
					fill="#0c0f1a"
					stroke="#2a3357"
					strokeWidth={3}
				/>
				<rect x={-58} y={-108} width={116} height={216} rx={20} fill="none" />
				{/* camera bump, reads as "this is the back of the phone" */}
				<rect x={-38} y={-92} width={44} height={44} rx={12} fill="#141a2c" />
				<circle cx={-24} cy={-78} r={7} fill="#0a0d16" stroke="#3a4570" strokeWidth={1.5} />
				<circle cx={-2} cy={-78} r={7} fill="#0a0d16" stroke="#3a4570" strokeWidth={1.5} />
				<circle cx={-24} cy={-56} r={7} fill="#0a0d16" stroke="#3a4570" strokeWidth={1.5} />
				{/* edge glow spilling from the screen side (around the frame) */}
				<rect
					x={-62}
					y={-112}
					width={124}
					height={224}
					rx={22}
					fill="none"
					stroke={COLORS.red}
					strokeWidth={6}
					opacity={glowOpacity}
					filter="url(#softBlur)"
				/>
			</g>
		</g>
	);
};
