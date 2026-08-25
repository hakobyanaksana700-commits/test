import React from 'react';
import {Cuboid3D, isoGroundShadow} from '../Cuboid3D';
import {worldToScreen} from '../engine';
import {ISO_COLORS} from '../theme';

// A cute "toy globe on a stand" — sphere approximated as a flat shaded disc
// (orthographic iso projection of a sphere is still a circle) sitting on a
// small isometric pedestal block.
export const IsoGlobeToy: React.FC<{
	originX: number;
	originY: number;
	scale?: number;
	radius?: number;
	spin: number; // frame-driven, degrees
	opacity?: number;
}> = ({originX, originY, scale = 1, radius = 190, spin, opacity = 1}) => {
	const pedestalH = 44;
	const center = worldToScreen(originX, originY, 0, pedestalH + radius * 0.86, 0, scale);
	const r = radius * scale;

	const bands = [-0.55, -0.2, 0.15, 0.5].map((f, i) => {
		const bandR = Math.sqrt(Math.max(0, 1 - f * f));
		const drift = ((spin * 1.1 + i * 70) % 360) - 180;
		const squish = Math.max(0.12, Math.abs(Math.cos((drift * Math.PI) / 180)));
		return {cy: center.y - f * r * 0.9, rx: r * bandR * squish, key: i};
	});

	return (
		<g opacity={opacity}>
			{isoGroundShadow(0, 0, 150, 90, scale, 0.22)}
			<Cuboid3D x={0} y={0} z={0} w={140} h={pedestalH} d={140} color={ISO_COLORS.navyLight} scale={scale} />

			<defs>
				<radialGradient id="isoGlobeGrad" cx="36%" cy="30%" r="75%">
					<stop offset="0%" stopColor="#8fc4ff" />
					<stop offset="55%" stopColor={ISO_COLORS.sky} />
					<stop offset="100%" stopColor={ISO_COLORS.blueDeep} />
				</radialGradient>
				<clipPath id="isoGlobeClip">
					<circle cx={center.x} cy={center.y} r={r} />
				</clipPath>
			</defs>

			<circle cx={center.x} cy={center.y} r={r} fill="url(#isoGlobeGrad)" />
			<g clipPath="url(#isoGlobeClip)" opacity={0.85}>
				{bands.map((b) => (
					<ellipse key={b.key} cx={center.x} cy={b.cy} rx={b.rx} ry={r * 0.16} fill={ISO_COLORS.mint} opacity={0.55} />
				))}
			</g>
			<circle cx={center.x} cy={center.y} r={r} fill="none" stroke="#2f5fb8" strokeOpacity={0.4} strokeWidth={3} />
			<ellipse
				cx={center.x - r * 0.32}
				cy={center.y - r * 0.38}
				rx={r * 0.32}
				ry={r * 0.2}
				fill="#ffffff"
				opacity={0.35}
			/>
		</g>
	);
};
