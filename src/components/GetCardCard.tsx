import React from 'react';
import {FONT_STACK} from '../theme';

const W = 380;
const H = 240;

// Premium metallic GetCard card, fully drawn with SVG gradients/shapes.
export const GetCardFace: React.FC<{shine?: number}> = ({shine = 0}) => (
	<g>
		<defs>
			<linearGradient id="gcMetal" x1="0" y1="0" x2="1" y2="1">
				<stop offset="0%" stopColor="#3a4a63" />
				<stop offset="22%" stopColor="#1a2333" />
				<stop offset="50%" stopColor="#0d1420" />
				<stop offset="78%" stopColor="#1c2740" />
				<stop offset="100%" stopColor="#39485f" />
			</linearGradient>
			<linearGradient id="gcSheen" x1="0" y1="0" x2="1" y2="1">
				<stop offset="0%" stopColor="#ffffff" stopOpacity={0.35} />
				<stop offset="18%" stopColor="#ffffff" stopOpacity={0.05} />
				<stop offset="40%" stopColor="#ffffff" stopOpacity={0} />
			</linearGradient>
			<linearGradient id="gcGold" x1="0" y1="0" x2="1" y2="0">
				<stop offset="0%" stopColor="#f4d38a" />
				<stop offset="50%" stopColor="#fff3d4" />
				<stop offset="100%" stopColor="#d9a94f" />
			</linearGradient>
			<filter id="gcShadow" x="-40%" y="-40%" width="180%" height="180%">
				<feDropShadow dx="0" dy="22" stdDeviation="26" floodColor="#000" floodOpacity="0.55" />
			</filter>
			<clipPath id="gcClip">
				<rect x={-W / 2} y={-H / 2} width={W} height={H} rx={26} />
			</clipPath>
		</defs>

		<g filter="url(#gcShadow)">
			<rect x={-W / 2} y={-H / 2} width={W} height={H} rx={26} fill="url(#gcMetal)" />
			<rect x={-W / 2} y={-H / 2} width={W} height={H} rx={26} fill="url(#gcSheen)" />
			<rect
				x={-W / 2}
				y={-H / 2}
				width={W}
				height={H}
				rx={26}
				fill="none"
				stroke="#8fa2c2"
				strokeOpacity={0.35}
				strokeWidth={1.5}
			/>

			{/* moving highlight streak (blick), clipped to the card body */}
			<g clipPath="url(#gcClip)">
				<rect
					x={-W / 2 - 40 + shine * (W + 80)}
					y={-H / 2 - 20}
					width={60}
					height={H + 40}
					fill="#ffffff"
					opacity={0.14}
					transform="skewX(-18)"
				/>
			</g>

			{/* chip */}
			<rect x={-W / 2 + 30} y={-26} width={54} height={42} rx={8} fill="url(#gcGold)" />
			<line x1={-W / 2 + 30} y1={-5} x2={-W / 2 + 84} y2={-5} stroke="#c79a44" strokeWidth={1.5} opacity={0.6} />
			<line x1={-W / 2 + 57} y1={-26} x2={-W / 2 + 57} y2={16} stroke="#c79a44" strokeWidth={1.5} opacity={0.6} />

			{/* contactless icon */}
			<g transform={`translate(${-W / 2 + 130} -6)`} opacity={0.85}>
				{[8, 15, 22].map((r, i) => (
					<path
						key={i}
						d={`M ${-r * 0.4} ${-r} A ${r} ${r} 0 0 1 ${-r * 0.4} ${r}`}
						fill="none"
						stroke="#cfd8ea"
						strokeWidth={2.4}
						strokeLinecap="round"
					/>
				))}
			</g>

			<text
				x={-W / 2 + 30}
				y={H / 2 - 34}
				fill="#f3f6ff"
				fontFamily={FONT_STACK}
				fontSize={28}
				fontWeight={800}
				letterSpacing={0.5}
			>
				GetCard
			</text>
			<text
				x={-W / 2 + 30}
				y={H / 2 - 12}
				fill="#9fb0d0"
				fontFamily={FONT_STACK}
				fontSize={15}
				fontWeight={500}
				letterSpacing={2.5}
			>
				GETCARD.ONE
			</text>

			{/* brand monogram — an original abstract mark, not a copy of any existing logo */}
			<g transform={`translate(${W / 2 - 46} ${-H / 2 + 42})`}>
				<circle r={20} fill="none" stroke="url(#gcGold)" strokeWidth={3} opacity={0.9} />
				<circle r={7} fill="url(#gcGold)" opacity={0.95} />
				<path
					d="M -2 -16 L 6 -10 L -2 -4"
					fill="none"
					stroke="url(#gcGold)"
					strokeWidth={3}
					strokeLinecap="round"
					strokeLinejoin="round"
					opacity={0.95}
				/>
			</g>
		</g>
	</g>
);

export const GetCardCard: React.FC<{scale?: number; shine?: number}> = ({
	scale = 1,
	shine = 0,
}) => (
	<g transform={`scale(${scale})`}>
		<GetCardFace shine={shine} />
	</g>
);

export const GETCARD_SIZE = {W, H};
