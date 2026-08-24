import React from 'react';

export const Shockwave: React.FC<{
	progress: number; // 0..1
	maxRadius?: number;
	color?: string;
}> = ({progress, maxRadius = 500, color = '#ffffff'}) => {
	if (progress <= 0) return null;
	const r = progress * maxRadius;
	const opacity = 1 - progress;
	return (
		<g opacity={opacity}>
			<circle r={r} fill="none" stroke={color} strokeWidth={10} opacity={0.9} />
			<circle r={r * 0.7} fill="none" stroke={color} strokeWidth={4} opacity={0.5} />
		</g>
	);
};

export const BurstParticles: React.FC<{
	progress: number; // 0..1
	count?: number;
	color?: string;
	spread?: number;
	seedOffset?: number;
}> = ({progress, count = 26, color = '#ffffff', spread = 480, seedOffset = 0}) => {
	if (progress <= 0) return null;
	const items = new Array(count).fill(0).map((_, i) => {
		const seed = i * 92.3 + seedOffset;
		const angle = (Math.sin(seed) * 0.5 + 0.5) * Math.PI * 2;
		const dist = (0.4 + ((i * 37) % 100) / 100) * spread * progress;
		const x = Math.cos(angle) * dist;
		const y = Math.sin(angle) * dist - 60 * progress * progress;
		const size = 3 + (i % 5);
		const op = Math.max(0, 1 - progress * 1.1);
		return {x, y, size, op, key: i};
	});
	return (
		<g>
			{items.map((p) => (
				<rect
					key={p.key}
					x={p.x - p.size / 2}
					y={p.y - p.size / 2}
					width={p.size}
					height={p.size}
					fill={color}
					opacity={p.op}
					transform={`rotate(${p.key * 33} ${p.x} ${p.y})`}
				/>
			))}
		</g>
	);
};
