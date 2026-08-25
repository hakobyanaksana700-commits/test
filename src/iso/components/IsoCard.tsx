import React from 'react';
import {Cuboid3D, isoGroundShadow} from '../Cuboid3D';
import {worldToScreen} from '../engine';
import {FONT_STACK, ISO_COLORS} from '../theme';

export const CARD_W = 320;
export const CARD_D = 200;
export const CARD_H = 24;

export const IsoCard: React.FC<{
	originX: number;
	originY: number;
	x: number;
	y: number;
	z: number;
	color: string;
	title: string;
	subtitle?: string;
	scale?: number;
	opacity?: number;
	sizeMul?: number;
	shadow?: boolean;
	gold?: boolean;
	hideText?: boolean;
}> = ({
	originX,
	originY,
	x,
	y,
	z,
	color,
	title,
	subtitle,
	scale = 1,
	opacity = 1,
	sizeMul = 1,
	shadow = true,
	gold = false,
	hideText = false,
}) => {
	const w = CARD_W * sizeMul;
	const d = CARD_D * sizeMul;
	const h = CARD_H * sizeMul;

	// Single anchor at the top-face center; title/subtitle/chip are then
	// stacked in pure screen-space pixels so they stay legible and never
	// overlap regardless of the iso shear or how small sizeMul gets.
	const anchor = worldToScreen(originX, originY, x, y + h, z, scale);
	const unit = sizeMul * scale;
	const titlePos = {x: anchor.x, y: anchor.y + 6 * unit};
	const subPos = {x: anchor.x, y: anchor.y + 30 * unit};
	const chipPos = {x: anchor.x - 70 * unit, y: anchor.y - 34 * unit};

	return (
		<g opacity={opacity}>
			{shadow && isoGroundShadow(x, z, w * 0.55, d * 0.55, scale, 0.2)}
			<Cuboid3D x={x} y={y} z={z} w={w} h={h} d={d} color={color} scale={scale} />
			{gold && !hideText && (
				<rect
					x={chipPos.x - 16 * unit}
					y={chipPos.y - 12 * unit}
					width={32 * unit}
					height={24 * unit}
					rx={5 * unit}
					fill={ISO_COLORS.gold}
					opacity={opacity}
				/>
			)}
			{!hideText && (
			<text
				x={titlePos.x}
				y={titlePos.y}
				textAnchor="middle"
				fontFamily={FONT_STACK}
				fontWeight={800}
				fontSize={30 * unit}
				fill="#f4f7ff"
			>
				{title}
			</text>
			)}
			{!hideText && subtitle && (
				<text
					x={subPos.x}
					y={subPos.y}
					textAnchor="middle"
					fontFamily={FONT_STACK}
					fontWeight={600}
					fontSize={15 * unit}
					letterSpacing={2}
					fill="#cdd8ff"
				>
					{subtitle}
				</text>
			)}
		</g>
	);
};

export type Fragment = {ox: number; oy: number; oz: number; w: number; h: number; d: number; vx: number; vz: number};

export const buildCardFragments = (count = 6): Fragment[] => {
	const frags: Fragment[] = [];
	for (let i = 0; i < count; i++) {
		const angle = (Math.PI * 2 * i) / count + (i % 2 ? 0.3 : -0.2);
		frags.push({
			ox: Math.cos(angle) * CARD_W * 0.22,
			oz: Math.sin(angle) * CARD_D * 0.22,
			oy: 0,
			w: 70 + (i % 3) * 20,
			h: CARD_H,
			d: 50 + (i % 2) * 20,
			vx: Math.cos(angle) * (180 + (i % 3) * 60),
			vz: Math.sin(angle) * (180 + (i % 3) * 60),
		});
	}
	return frags;
};

export const IsoCardFragments: React.FC<{
	originX: number;
	originY: number;
	x: number;
	y: number;
	z: number;
	color: string;
	progress: number; // 0..1
	scale?: number;
	fragments: Fragment[];
}> = ({originX, originY, x, y, z, color, progress, scale = 1, fragments}) => {
	if (progress <= 0) return null;
	const fall = progress * progress * 260;
	const op = Math.max(0, 1 - Math.max(0, progress - 0.6) / 0.4);
	return (
		<g opacity={op}>
			{fragments.map((f, i) => (
				<Cuboid3D
					key={i}
					x={x + f.ox + f.vx * progress}
					y={y - fall + Math.abs(Math.sin(i + progress * 4)) * 20}
					z={z + f.oz + f.vz * progress}
					w={f.w}
					h={f.h}
					d={f.d}
					color={color}
					scale={scale}
				/>
			))}
		</g>
	);
};
