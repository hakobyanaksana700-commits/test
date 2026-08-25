import React from 'react';
import {isoProject, shade, polyStr} from './engine';

// A flat-shaded isometric "toy" box: top / right / front faces, each a
// polygon, top brightest and front darkest — the classic iso-illustration
// cube used to build every 3D-looking object in this composition.
export const Cuboid3D: React.FC<{
	x: number; // world x (center)
	y: number; // world y (base / ground contact)
	z: number; // world z (center)
	w: number;
	h: number;
	d: number;
	color: string;
	scale?: number;
	opacity?: number;
	strokeColor?: string;
}> = ({x, y, z, w, h, d, color, scale = 1, opacity = 1, strokeColor}) => {
	const hw = w / 2;
	const hd = d / 2;

	const p = (px: number, py: number, pz: number) => isoProject(px, py, pz, scale);

	const top = [
		p(x - hw, y + h, z - hd),
		p(x + hw, y + h, z - hd),
		p(x + hw, y + h, z + hd),
		p(x - hw, y + h, z + hd),
	];
	const right = [
		p(x + hw, y, z - hd),
		p(x + hw, y, z + hd),
		p(x + hw, y + h, z + hd),
		p(x + hw, y + h, z - hd),
	];
	const front = [
		p(x - hw, y, z + hd),
		p(x + hw, y, z + hd),
		p(x + hw, y + h, z + hd),
		p(x - hw, y + h, z + hd),
	];

	const stroke = strokeColor ?? 'rgba(0,0,0,0.12)';

	return (
		<g opacity={opacity}>
			<polygon points={polyStr(front)} fill={shade(color, -0.32)} stroke={stroke} strokeWidth={1} />
			<polygon points={polyStr(right)} fill={shade(color, -0.14)} stroke={stroke} strokeWidth={1} />
			<polygon points={polyStr(top)} fill={shade(color, 0.16)} stroke={stroke} strokeWidth={1} />
		</g>
	);
};

export const isoGroundShadow = (
	x: number,
	z: number,
	rx: number,
	rz: number,
	scale = 1,
	opacity = 0.22,
) => {
	const c = isoProject(x, 0, z, scale);
	const rxS = rx * Math.cos(Math.PI / 6) * scale;
	const ryS = rz * Math.sin(Math.PI / 6) * scale;
	return <ellipse cx={c.x} cy={c.y} rx={rxS} ry={ryS} fill="#0b1230" opacity={opacity} />;
};
