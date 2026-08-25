import React from 'react';
import {AbsoluteFill, useVideoConfig} from 'remotion';
import {isoProject} from '../engine';
import {ISO_COLORS} from '../theme';

// Bright flat-toy backdrop: two-tone sky gradient + an isometric ground
// plate with a soft grid, replacing the previous dark cinematic backdrop.
export const IsoBackdrop: React.FC<{
	originX: number;
	originY: number;
	scale?: number;
	groundRadius?: number;
	skyFrom?: string;
	skyTo?: string;
	frame?: number;
}> = ({
	originX,
	originY,
	scale = 1,
	groundRadius = 720,
	skyFrom = ISO_COLORS.skyTop,
	skyTo = ISO_COLORS.skyBottom,
	frame = 0,
}) => {
	const {width, height} = useVideoConfig();

	const corners = [
		isoProject(-groundRadius, 0, -groundRadius, scale),
		isoProject(groundRadius, 0, -groundRadius, scale),
		isoProject(groundRadius, 0, groundRadius, scale),
		isoProject(-groundRadius, 0, groundRadius, scale),
	].map((p) => ({x: p.x + originX, y: p.y + originY}));

	const gridLines: {x1: number; y1: number; x2: number; y2: number}[] = [];
	const step = groundRadius / 5;
	for (let i = -5; i <= 5; i++) {
		const a = isoProject(i * step, 0, -groundRadius, scale);
		const b = isoProject(i * step, 0, groundRadius, scale);
		gridLines.push({x1: a.x + originX, y1: a.y + originY, x2: b.x + originX, y2: b.y + originY});
		const c = isoProject(-groundRadius, 0, i * step, scale);
		const d = isoProject(groundRadius, 0, i * step, scale);
		gridLines.push({x1: c.x + originX, y1: c.y + originY, x2: d.x + originX, y2: d.y + originY});
	}

	const clouds = new Array(5).fill(0).map((_, i) => {
		const seed = i * 53.7;
		const bx = width * (0.15 + ((i * 0.21) % 0.7));
		const by = height * (0.06 + ((i * 0.13) % 0.16));
		const drift = ((frame * 0.4 + seed) % (width + 300)) - 150;
		return {x: bx + drift * 0.05, y: by, r: 34 + (i % 3) * 12, key: i};
	});

	return (
		<AbsoluteFill>
			<svg width={width} height={height} style={{position: 'absolute', inset: 0}}>
				<defs>
					<linearGradient id="isoSky" x1="0" y1="0" x2="0" y2="1">
						<stop offset="0%" stopColor={skyFrom} />
						<stop offset="100%" stopColor={skyTo} />
					</linearGradient>
					<clipPath id="isoGroundClip">
						<polygon points={corners.map((c) => `${c.x},${c.y}`).join(' ')} />
					</clipPath>
				</defs>
				<rect x={0} y={0} width={width} height={height} fill="url(#isoSky)" />

				{clouds.map((c) => (
					<g key={c.key} opacity={0.55}>
						<ellipse cx={c.x} cy={c.y} rx={c.r} ry={c.r * 0.6} fill="#ffffff" />
						<ellipse cx={c.x + c.r * 0.7} cy={c.y + c.r * 0.15} rx={c.r * 0.7} ry={c.r * 0.5} fill="#ffffff" />
						<ellipse cx={c.x - c.r * 0.7} cy={c.y + c.r * 0.2} rx={c.r * 0.6} ry={c.r * 0.42} fill="#ffffff" />
					</g>
				))}

				<polygon points={corners.map((c) => `${c.x},${c.y}`).join(' ')} fill={ISO_COLORS.ground} />
				<g clipPath="url(#isoGroundClip)" opacity={0.5} stroke={ISO_COLORS.groundLine} strokeWidth={1.5}>
					{gridLines.map((l, i) => (
						<line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} />
					))}
				</g>
			</svg>
		</AbsoluteFill>
	);
};
