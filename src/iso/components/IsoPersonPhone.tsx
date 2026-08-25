import React from 'react';
import {Cuboid3D, isoGroundShadow} from '../Cuboid3D';
import {worldToScreen} from '../engine';
import {ISO_COLORS} from '../theme';

// Toy-style chibi character holding a phone up at chest height. The phone
// is modelled as a uniformly dark box — no face is ever textured as a
// screen, so the camera can never see a "front" of the display; only a
// soft red glow (behind/around the device) reads as "screen light",
// exactly mirroring the screen-hidden staging from the first cut.
export const IsoPersonPhone: React.FC<{
	originX: number;
	originY: number;
	scale?: number;
	glow: number; // 0..1
	opacity?: number;
}> = ({originX, originY, scale = 1, glow, opacity = 1}) => {
	const glowCenter = worldToScreen(originX, originY, 0, 210, 40, scale);
	const glowR = (110 + glow * 70) * scale;

	const phoneCenter = worldToScreen(originX, originY, 0, 175, 58, scale);

	return (
		<g opacity={opacity}>
			{isoGroundShadow(0, 0, 110, 60, scale, 0.25)}

			<defs>
				<radialGradient id="isoPersonGlow" cx="50%" cy="50%" r="50%">
					<stop offset="0%" stopColor={ISO_COLORS.red} stopOpacity={0.85} />
					<stop offset="65%" stopColor={ISO_COLORS.red} stopOpacity={0.35} />
					<stop offset="100%" stopColor={ISO_COLORS.red} stopOpacity={0} />
				</radialGradient>
			</defs>
			<circle cx={glowCenter.x} cy={glowCenter.y} r={glowR} fill="url(#isoPersonGlow)" opacity={0.25 + glow * 0.7} />

			{/* legs / base */}
			<Cuboid3D x={0} y={0} z={0} w={100} h={50} d={70} color={ISO_COLORS.navy} scale={scale} />
			{/* torso */}
			<Cuboid3D x={0} y={50} z={0} w={118} h={140} d={82} color={ISO_COLORS.purple} scale={scale} />
			{/* arms, raised toward the phone */}
			<Cuboid3D x={-78} y={110} z={30} w={34} h={90} d={34} color={ISO_COLORS.purple} scale={scale} />
			<Cuboid3D x={78} y={110} z={30} w={34} h={90} d={34} color={ISO_COLORS.purple} scale={scale} />
			{/* head */}
			<Cuboid3D x={0} y={190} z={0} w={96} h={88} d={88} color={ISO_COLORS.skin} scale={scale} />

			{/* phone: uniformly dark on every face, screen never rendered */}
			<Cuboid3D x={0} y={150} z={56} w={72} h={128} d={16} color="#0c1224" scale={scale} strokeColor="rgba(255,80,90,0.35)" />

			{/* rim glow hugging the phone edges */}
			<circle cx={phoneCenter.x} cy={phoneCenter.y} r={90 * scale} fill="url(#isoPersonGlow)" opacity={glow * 0.5} />
		</g>
	);
};
