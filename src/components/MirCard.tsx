import React from 'react';
import {FONT_STACK} from '../theme';

const W = 340;
const H = 214;

// Bank card in blue/teal colourway, evoking the "МИР" payment system without
// using any external logo asset — everything below is drawn shapes + text.
export const MirCardFace: React.FC = () => (
	<g>
		<defs>
			<linearGradient id="mirGrad" x1="0" y1="0" x2="1" y2="1">
				<stop offset="0%" stopColor="#123a63" />
				<stop offset="55%" stopColor="#0e2a52" />
				<stop offset="100%" stopColor="#123a63" />
			</linearGradient>
			<linearGradient id="mirSheen" x1="0" y1="0" x2="1" y2="1">
				<stop offset="0%" stopColor="#ffffff" stopOpacity={0.22} />
				<stop offset="35%" stopColor="#ffffff" stopOpacity={0} />
			</linearGradient>
		</defs>
		<rect x={-W / 2} y={-H / 2} width={W} height={H} rx={22} fill="url(#mirGrad)" />
		<rect x={-W / 2} y={-H / 2} width={W} height={H} rx={22} fill="url(#mirSheen)" />
		<rect x={-W / 2} y={-H / 2} width={W} height={H} rx={22} fill="none" stroke="#1fb6a8" strokeOpacity={0.4} strokeWidth={2} />
		{/* chip */}
		<rect x={-W / 2 + 26} y={-24} width={46} height={36} rx={7} fill="#cfe8dd" opacity={0.85} />
		<rect x={-W / 2 + 26} y={-24} width={46} height={36} rx={7} fill="none" stroke="#0e2a52" strokeOpacity={0.3} />
		{/* two-tone arc, echoes the tricolour arc of MIR without copying the logo */}
		<path d={`M ${W / 2 - 96} 40 a 26 26 0 1 0 52 0 a 26 26 0 1 0 -52 0`} fill="#1fb6a8" opacity={0.9} />
		<path d={`M ${W / 2 - 78} 40 a 26 26 0 1 0 52 0 a 26 26 0 1 0 -52 0`} fill="#1b6bff" opacity={0.75} />
		<text
			x={-W / 2 + 26}
			y={H / 2 - 24}
			fill="#dfeeff"
			fontFamily={FONT_STACK}
			fontSize={22}
			fontWeight={700}
			letterSpacing={2}
		>
			МИР
		</text>
	</g>
);

export const MirCard: React.FC<{scale?: number}> = ({scale = 1}) => (
	<g transform={`scale(${scale})`}>
		<MirCardFace />
	</g>
);

export const MIR_CARD_SIZE = {W, H};
