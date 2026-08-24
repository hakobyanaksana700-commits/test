import React from 'react';
import {COLORS} from '../theme';

// Red energy barrier: rings, arcs, radiating lines and particles around the globe.
export const Barrier: React.FC<{
	frame: number;
	radius?: number;
	strength?: number; // 0..1, fades/breaks it down
	broken?: boolean;
}> = ({frame, radius = 320, strength = 1, broken = false}) => {
	const spin = frame * 0.9;
	const spinSlow = -frame * 0.5;
	const pulse = 0.75 + 0.25 * Math.sin(frame / 6);

	const arcs = new Array(10).fill(0).map((_, i) => {
		const start = (360 / 10) * i + spin;
		const len = 22 + (i % 3) * 8;
		return {start, len, key: i};
	});

	const particles = new Array(24).fill(0).map((_, i) => {
		const angle = (360 / 24) * i + spinSlow * 1.3;
		const rad = (angle * Math.PI) / 180;
		const r = radius + 18 + 10 * Math.sin(frame / 5 + i);
		return {
			x: Math.cos(rad) * r,
			y: Math.sin(rad) * r,
			key: i,
			size: 2.5 + (i % 4),
		};
	});

	function arcPath(rOuter: number, startDeg: number, lenDeg: number) {
		const s = (startDeg * Math.PI) / 180;
		const e = ((startDeg + lenDeg) * Math.PI) / 180;
		const x1 = Math.cos(s) * rOuter;
		const y1 = Math.sin(s) * rOuter;
		const x2 = Math.cos(e) * rOuter;
		const y2 = Math.sin(e) * rOuter;
		const large = lenDeg > 180 ? 1 : 0;
		return `M ${x1} ${y1} A ${rOuter} ${rOuter} 0 ${large} 1 ${x2} ${y2}`;
	}

	return (
		<g opacity={broken ? 0 : strength}>
			<defs>
				<filter id="barrierGlow" x="-60%" y="-60%" width="220%" height="220%">
					<feGaussianBlur stdDeviation="6" result="b" />
					<feMerge>
						<feMergeNode in="b" />
						<feMergeNode in="SourceGraphic" />
					</feMerge>
				</filter>
			</defs>

			<circle r={radius} fill="none" stroke={COLORS.red} strokeOpacity={0.18 * pulse} strokeWidth={30} />
			<circle
				r={radius}
				fill="none"
				stroke={COLORS.redGlow}
				strokeOpacity={0.55}
				strokeWidth={3}
				filter="url(#barrierGlow)"
			/>

			<g filter="url(#barrierGlow)">
				{arcs.map((a) => (
					<path
						key={a.key}
						d={arcPath(radius, a.start, a.len)}
						fill="none"
						stroke={COLORS.red}
						strokeWidth={7}
						strokeLinecap="round"
						opacity={0.85}
					/>
				))}
				{arcs.map((a) => (
					<path
						key={`in-${a.key}`}
						d={arcPath(radius - 26, -a.start * 0.7, a.len * 1.4)}
						fill="none"
						stroke={COLORS.redDeep}
						strokeWidth={4}
						strokeLinecap="round"
						opacity={0.7}
					/>
				))}
			</g>

			{particles.map((p) => (
				<circle key={p.key} cx={p.x} cy={p.y} r={p.size} fill={COLORS.redGlow} opacity={0.8} />
			))}
		</g>
	);
};
