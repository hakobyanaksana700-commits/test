// Minimal classic 2:1 isometric projection engine — fixed camera, no external
// 3D library. World coords: x = right, z = depth, y = up (elevation).

const ISO = Math.PI / 6; // 30deg

export const isoProject = (
	x: number,
	y: number,
	z: number,
	scale = 1,
): {x: number; y: number} => ({
	x: (x - z) * Math.cos(ISO) * scale,
	y: ((x + z) * Math.sin(ISO) - y) * scale,
});

const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));

export const shade = (hex: string, amount: number): string => {
	const n = hex.replace('#', '');
	const r = parseInt(n.substring(0, 2), 16);
	const g = parseInt(n.substring(2, 4), 16);
	const b = parseInt(n.substring(4, 6), 16);
	const f = (c: number) =>
		Math.round(clamp(amount >= 0 ? c + (255 - c) * amount : c * (1 + amount), 0, 255));
	return `rgb(${f(r)}, ${f(g)}, ${f(b)})`;
};

export type Point = {x: number; y: number};

export const polyStr = (pts: Point[]): string => pts.map((p) => `${p.x},${p.y}`).join(' ');

// Projects a world point to absolute screen coords given a scene origin.
export const worldToScreen = (
	originX: number,
	originY: number,
	x: number,
	y: number,
	z: number,
	scale = 1,
): Point => {
	const p = isoProject(x, y, z, scale);
	return {x: originX + p.x, y: originY + p.y};
};
