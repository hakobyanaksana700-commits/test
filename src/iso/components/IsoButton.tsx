import React from 'react';
import {FONT_STACK, ISO_COLORS} from '../theme';

// Chunky flat "toy UI" button: a solid pressed-shadow slab beneath a
// brighter top slab, mimicking the extruded look of the isometric objects
// while keeping the Cyrillic label perfectly legible (no skew/3D on text).
export const IsoButton: React.FC<{
	scale: number;
	opacity: number;
	pressDepth: number; // 0..1, how far pressed down right now
	rippleProgress: number;
}> = ({scale, opacity, pressDepth, rippleProgress}) => {
	const lift = 14 * (1 - pressDepth);
	return (
		<div style={{position: 'relative', display: 'inline-block', transform: `scale(${scale})`, opacity}}>
			<div
				style={{
					position: 'absolute',
					top: 14,
					left: 0,
					right: 0,
					bottom: -14 + lift,
					borderRadius: 999,
					background: ISO_COLORS.blueDeep,
				}}
			/>
			<div
				style={{
					position: 'relative',
					overflow: 'hidden',
					padding: '32px 60px',
					borderRadius: 999,
					background: `linear-gradient(135deg, ${ISO_COLORS.orange} 0%, ${ISO_COLORS.yellow} 100%)`,
					border: `4px solid ${ISO_COLORS.ink}22`,
					transform: `translateY(${14 - lift}px)`,
					fontFamily: FONT_STACK,
					fontWeight: 900,
					fontSize: 42,
					letterSpacing: 0.5,
					color: ISO_COLORS.ink,
					textAlign: 'center',
					whiteSpace: 'nowrap',
				}}
			>
				ОФОРМИТЬ КАРТУ
				{rippleProgress > 0 && (
					<span
						style={{
							position: 'absolute',
							left: '50%',
							top: '50%',
							width: 36,
							height: 36,
							marginLeft: -18,
							marginTop: -18,
							borderRadius: '50%',
							background: 'rgba(255,255,255,0.6)',
							transform: `scale(${1 + rippleProgress * 12})`,
							opacity: Math.max(0, 1 - rippleProgress * 1.2),
							pointerEvents: 'none',
						}}
					/>
				)}
			</div>
		</div>
	);
};
