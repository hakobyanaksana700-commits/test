import React from 'react';
import {FONT_STACK, COLORS} from '../theme';

export const ServiceBadge: React.FC<{
	label: string;
	x: number;
	y: number;
	opacity?: number;
	scale?: number;
	glow?: 'none' | 'red' | 'green';
	rotate?: number;
}> = ({label, x, y, opacity = 1, scale = 1, glow = 'none', rotate = 0}) => {
	const glowColor =
		glow === 'red' ? COLORS.red : glow === 'green' ? COLORS.green : 'transparent';
	const borderColor =
		glow === 'red' ? 'rgba(255,43,74,0.7)' : glow === 'green' ? 'rgba(43,255,138,0.7)' : 'rgba(255,255,255,0.18)';
	const textColor = glow === 'green' ? COLORS.green : '#e7ecff';

	return (
		<div
			style={{
				position: 'absolute',
				left: x,
				top: y,
				transform: `translate(-50%, -50%) scale(${scale}) rotate(${rotate}deg)`,
				opacity,
				padding: '10px 20px',
				borderRadius: 999,
				background: 'rgba(12,16,32,0.55)',
				border: `1.5px solid ${borderColor}`,
				boxShadow: glow === 'none' ? 'none' : `0 0 26px 4px ${glowColor}55, 0 0 6px 1px ${glowColor}`,
				backdropFilter: 'blur(6px)',
				fontFamily: FONT_STACK,
				fontWeight: 700,
				fontSize: 22,
				letterSpacing: 0.2,
				color: textColor,
				whiteSpace: 'nowrap',
				transition: 'none',
			}}
		>
			{label}
		</div>
	);
};
