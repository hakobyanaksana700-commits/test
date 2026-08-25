import React from 'react';
import {Cuboid3D} from '../Cuboid3D';
import {ISO_COLORS} from '../theme';

export type BarrierBlock = {angle: number; x: number; z: number};

export const buildBarrierRing = (radius: number, count = 14): BarrierBlock[] => {
	const blocks: BarrierBlock[] = [];
	for (let i = 0; i < count; i++) {
		const angle = (Math.PI * 2 * i) / count;
		blocks.push({angle, x: Math.cos(angle) * radius, z: Math.sin(angle) * radius});
	}
	return blocks;
};

export const IsoBarrierRing: React.FC<{
	blocks: BarrierBlock[];
	scale?: number;
	scatter?: number; // 0 = intact ring, 1 = fully scattered
	pulse?: number; // 0..1 subtle glow pulse on the cap
}> = ({blocks, scale = 1, scatter = 0, pulse = 0}) => {
	if (scatter >= 1) return null;
	const fall = scatter * scatter * 300;
	const op = Math.max(0, 1 - Math.max(0, scatter - 0.55) / 0.45);

	return (
		<g opacity={op}>
			{blocks.map((b, i) => {
				const dx = Math.cos(b.angle) * (140 + (i % 3) * 40) * scatter;
				const dz = Math.sin(b.angle) * (140 + (i % 3) * 40) * scatter;
				const x = b.x + dx;
				const z = b.z + dz;
				const y = -fall * (0.4 + (i % 4) * 0.2);
				return (
					<React.Fragment key={i}>
						<Cuboid3D x={x} y={y} z={z} w={46} h={78} d={46} color={ISO_COLORS.red} scale={scale} />
						<Cuboid3D
							x={x}
							y={y + 78}
							z={z}
							w={50}
							h={14}
							d={50}
							color={i % 2 === 0 ? ISO_COLORS.white : ISO_COLORS.redDark}
							scale={scale}
							opacity={0.9 + pulse * 0.1}
						/>
					</React.Fragment>
				);
			})}
		</g>
	);
};
