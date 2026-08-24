import React from 'react';
import {COLORS} from '../theme';

// Fully SVG globe: sphere gradient + latitude rings + rotating meridians + continent blobs.
export const Globe: React.FC<{
	frame: number;
	radius?: number;
	opacity?: number;
}> = ({frame, radius = 220, opacity = 1}) => {
	const rot = (frame * 1.6) % 360;
	const meridianCount = 6;

	return (
		<g opacity={opacity}>
			<defs>
				<radialGradient id="globeSphere" cx="38%" cy="32%" r="75%">
					<stop offset="0%" stopColor="#3a5fa8" />
					<stop offset="45%" stopColor="#1c3a72" />
					<stop offset="100%" stopColor="#081428" />
				</radialGradient>
				<radialGradient id="globeRim" cx="50%" cy="50%" r="50%">
					<stop offset="82%" stopColor="#4fd6ff" stopOpacity={0} />
					<stop offset="97%" stopColor="#4fd6ff" stopOpacity={0.55} />
					<stop offset="100%" stopColor="#4fd6ff" stopOpacity={0} />
				</radialGradient>
			</defs>

			<circle r={radius} fill="url(#globeSphere)" />
			<circle r={radius} fill="none" stroke="#5da4ff" strokeOpacity={0.35} strokeWidth={2} />
			<circle r={radius + 6} fill="url(#globeRim)" />

			{/* latitude rings */}
			<g clipPath="url(#globeClip)">
				{[-0.55, -0.22, 0.1, 0.4].map((f, i) => (
					<ellipse
						key={i}
						cy={f * radius}
						rx={radius * Math.sqrt(1 - f * f)}
						ry={radius * Math.sqrt(1 - f * f) * 0.22}
						fill="none"
						stroke="#9fd0ff"
						strokeOpacity={0.28}
						strokeWidth={1.5}
					/>
				))}
				{/* meridians rotating around the vertical axis */}
				{new Array(meridianCount).fill(0).map((_, i) => {
					const angle = (360 / meridianCount) * i + rot;
					const rad = (angle * Math.PI) / 180;
					const scaleX = Math.cos(rad);
					return (
						<ellipse
							key={i}
							rx={radius * Math.abs(scaleX)}
							ry={radius}
							fill="none"
							stroke="#9fd0ff"
							strokeOpacity={0.3}
							strokeWidth={1.5}
						/>
					);
				})}

				{/* continent blobs, drifting horizontally to sell rotation */}
				{[
					{cx: -60, cy: -40, rx: 55, ry: 30, s: 1},
					{cx: 40, cy: 10, rx: 40, ry: 50, s: 1.3},
					{cx: -20, cy: 70, rx: 60, ry: 24, s: 0.7},
					{cx: 90, cy: -60, rx: 30, ry: 24, s: 1.6},
				].map((c, i) => {
					const drift = ((rot * c.s) % 360) - 180;
					const rad = (drift * Math.PI) / 180;
					const x = c.cx + Math.sin(rad) * 30;
					const squish = Math.max(0.15, Math.abs(Math.cos(rad)));
					return (
						<ellipse
							key={i}
							cx={x}
							cy={c.cy}
							rx={c.rx * squish}
							ry={c.ry}
							fill="#2bff8a"
							opacity={0.28}
						/>
					);
				})}
			</g>

			<clipPath id="globeClip">
				<circle r={radius} />
			</clipPath>
		</g>
	);
};
