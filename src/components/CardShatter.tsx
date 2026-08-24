import React from 'react';

type Fragment = {
	points: [number, number][];
	dx: number;
	dy: number;
	rot: number;
};

// Splits a W x H card into irregular triangular fragments (fan out from
// center) that fly apart with progress 0..1 (0 = intact, 1 = fully scattered).
export const buildFragments = (W: number, H: number, count = 8): Fragment[] => {
	const frags: Fragment[] = [];
	for (let i = 0; i < count; i++) {
		const a0 = (Math.PI * 2 * i) / count;
		const a1 = (Math.PI * 2 * (i + 1)) / count;
		const cx = 0;
		const cy = 0;
		const rEdge = Math.max(W, H);
		const p1: [number, number] = [cx, cy];
		const p2: [number, number] = [Math.cos(a0) * rEdge, Math.sin(a0) * rEdge];
		const p3: [number, number] = [Math.cos(a1) * rEdge, Math.sin(a1) * rEdge];
		const mid = (a0 + a1) / 2;
		frags.push({
			points: [p1, p2, p3],
			dx: Math.cos(mid) * (180 + (i % 3) * 60),
			dy: Math.sin(mid) * (180 + (i % 3) * 60),
			rot: (i % 2 === 0 ? 1 : -1) * (90 + i * 20),
		});
	}
	return frags;
};

export const CardShatter: React.FC<{
	W: number;
	H: number;
	progress: number; // 0..1
	face: React.ReactNode;
	id: string;
}> = ({W, H, progress, face, id}) => {
	const fragments = buildFragments(W, H, 8);
	const eased = progress;

	return (
		<g>
			{fragments.map((f, i) => {
				const clipId = `${id}-clip-${i}`;
				const tx = f.dx * eased;
				const ty = f.dy * eased - 80 * eased * eased; // slight arc/gravity
				const rot = f.rot * eased;
				const op = 1 - Math.max(0, eased - 0.7) / 0.3;
				return (
					<g
						key={i}
						transform={`translate(${tx} ${ty}) rotate(${rot})`}
						opacity={Math.max(0, op)}
					>
						<clipPath id={clipId}>
							<polygon points={f.points.map((p) => p.join(',')).join(' ')} />
						</clipPath>
						<g clipPath={`url(#${clipId})`}>
							<rect x={-W / 2} y={-H / 2} width={W} height={H} fill="rgba(0,0,0,0)" />
							{face}
						</g>
					</g>
				);
			})}
		</g>
	);
};
