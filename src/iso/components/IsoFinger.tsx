import React from 'react';
import {ISO_COLORS} from '../theme';

export const IsoFinger: React.FC<{press: number}> = ({press}) => {
	const ty = press * 22;
	return (
		<g transform={`translate(0 ${ty})`}>
			<path
				d="M -30 240 C -34 130 -38 40 -26 -18 C -20 -44 20 -44 26 -18 C 36 40 34 130 30 240 Z"
				fill={ISO_COLORS.skin}
				stroke="#c99164"
				strokeWidth={3}
			/>
			<ellipse cx={0} cy={-34} rx={26} ry={22} fill="#f6d9b8" stroke="#c99164" strokeWidth={3} />
		</g>
	);
};
