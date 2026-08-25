import React from 'react';
import {worldToScreen} from '../engine';
import {ISO_COLORS} from '../theme';

const starPoints = (cx: number, cy: number, spikes: number, outerR: number, innerR: number) => {
	const pts: string[] = [];
	for (let i = 0; i < spikes * 2; i++) {
		const r = i % 2 === 0 ? outerR : innerR;
		const a = (Math.PI * i) / spikes - Math.PI / 2;
		pts.push(`${cx + Math.cos(a) * r},${cy + Math.sin(a) * r}`);
	}
	return pts.join(' ');
};

export const IsoBurst: React.FC<{
	originX: number;
	originY: number;
	x: number;
	y: number;
	z: number;
	progress: number; // 0..1
	scale?: number;
	color?: string;
}> = ({originX, originY, x, y, z, progress, scale = 1, color = ISO_COLORS.yellow}) => {
	if (progress <= 0 || progress >= 1) return null;
	const c = worldToScreen(originX, originY, x, y, z, scale);
	const grow = Math.min(1, progress / 0.35);
	const r = 40 + grow * 220;
	const op = 1 - Math.max(0, progress - 0.4) / 0.6;
	const ringR = progress * 420;

	return (
		<g opacity={op}>
			<circle cx={c.x} cy={c.y} r={ringR} fill="none" stroke={color} strokeWidth={10} opacity={0.7 * (1 - progress)} />
			<polygon
				points={starPoints(c.x, c.y, 8, r, r * 0.42)}
				fill={color}
				stroke="#fff"
				strokeWidth={3}
			/>
		</g>
	);
};
