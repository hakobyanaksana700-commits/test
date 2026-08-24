import React from 'react';

// Stylised finger/hand pressing down, drawn purely with SVG shapes.
export const Finger: React.FC<{press: number}> = ({press}) => {
	const ty = press * 26;
	return (
		<g transform={`translate(0 ${ty})`}>
			<defs>
				<linearGradient id="fingerSkin" x1="0" y1="0" x2="0" y2="1">
					<stop offset="0%" stopColor="#f0c9a6" />
					<stop offset="100%" stopColor="#d9a374" />
				</linearGradient>
			</defs>
			<path
				d="M -34 260 C -40 140 -46 40 -30 -30 C -24 -58 22 -58 28 -30 C 40 40 40 140 34 260 Z"
				fill="url(#fingerSkin)"
				stroke="#b8845a"
				strokeWidth={2}
			/>
			<ellipse cx={0} cy={-40} rx={30} ry={26} fill="#f3d2b2" stroke="#b8845a" strokeWidth={2} />
			<path d="M -22 -10 C -10 0 10 0 22 -10" stroke="#c99164" strokeWidth={2} fill="none" opacity={0.6} />
		</g>
	);
};
