import React from 'react';
import {Cuboid3D} from '../Cuboid3D';
import {ISO_COLORS} from '../theme';

const PALETTE = [ISO_COLORS.coral, ISO_COLORS.mint, ISO_COLORS.gold, ISO_COLORS.sky, ISO_COLORS.purple];

export const IsoConfetti: React.FC<{frame: number; scale?: number; count?: number}> = ({
	frame,
	scale = 1,
	count = 16,
}) => {
	const items = new Array(count).fill(0).map((_, i) => {
		const seed = i * 61.3;
		const x = Math.sin(seed) * 420;
		const z = Math.cos(seed * 1.4) * 260;
		const baseY = 120 + ((i * 47) % 260);
		const y = ((baseY - frame * (0.9 + (i % 4) * 0.3)) % 420 + 420) % 420;
		const size = 14 + (i % 3) * 6;
		return {x, y, z, size, color: PALETTE[i % PALETTE.length], key: i};
	});

	return (
		<g>
			{items.map((it) => (
				<Cuboid3D
					key={it.key}
					x={it.x}
					y={it.y}
					z={it.z}
					w={it.size}
					h={it.size}
					d={it.size}
					color={it.color}
					scale={scale}
					opacity={0.85}
				/>
			))}
		</g>
	);
};
