import React from 'react';
import {FONT_STACK, ISO_COLORS} from '../theme';

export const KineticTitle: React.FC<{
	text: string;
	scale: number;
	opacity: number;
	color?: string;
	shadow?: string;
	fontSize?: number;
}> = ({text, scale, opacity, color = ISO_COLORS.ink, shadow = ISO_COLORS.red, fontSize = 72}) => (
	<div
		style={{
			position: 'relative',
			transform: `scale(${scale})`,
			opacity,
			fontFamily: FONT_STACK,
			fontWeight: 900,
			fontSize,
			letterSpacing: 0.5,
			color,
			textAlign: 'center',
			textShadow: `5px 5px 0 ${shadow}, 5px 5px 18px rgba(0,0,0,0.15)`,
		}}
	>
		{text}
	</div>
);
