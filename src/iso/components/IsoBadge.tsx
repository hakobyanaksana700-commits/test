import React from 'react';
import {Cuboid3D, isoGroundShadow} from '../Cuboid3D';
import {worldToScreen} from '../engine';
import {FONT_STACK, ISO_COLORS} from '../theme';

export const IsoBadge: React.FC<{
	label: string;
	originX: number;
	originY: number;
	x: number;
	y?: number;
	z: number;
	scale?: number;
	state?: 'neutral' | 'red' | 'green';
	opacity?: number;
	pop?: number; // 0..1 scale-in
}> = ({label, originX, originY, x, y = 0, z, scale = 1, state = 'neutral', opacity = 1, pop = 1}) => {
	const color =
		state === 'red' ? ISO_COLORS.red : state === 'green' ? ISO_COLORS.green : '#e7edff';
	const w = 170 * pop;
	const h = 46 * pop;
	const d = 70 * pop;

	const labelPos = worldToScreen(originX, originY, x, y + h + 14, z, scale);

	return (
		<g opacity={opacity}>
			{isoGroundShadow(x, z, 90 * pop, 45 * pop, scale, 0.16)}
			<Cuboid3D x={x} y={y} z={z} w={w} h={h} d={d} color={color} scale={scale} />
			<text
				x={labelPos.x}
				y={labelPos.y}
				textAnchor="middle"
				fontFamily={FONT_STACK}
				fontWeight={800}
				fontSize={26 * pop}
				fill={state === 'green' ? ISO_COLORS.navy : ISO_COLORS.navy}
			>
				{label}
			</text>
		</g>
	);
};
