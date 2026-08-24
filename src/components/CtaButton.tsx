import React from 'react';
import {FONT_STACK, COLORS} from '../theme';

export const CtaButton: React.FC<{
	scale: number;
	opacity: number;
	rippleProgress: number; // 0..1, 0 = no ripple
}> = ({scale, opacity, rippleProgress}) => {
	return (
		<div
			style={{
				position: 'relative',
				display: 'inline-block',
				transform: `scale(${scale})`,
				opacity,
			}}
		>
			<div
				style={{
					position: 'relative',
					overflow: 'hidden',
					padding: '34px 64px',
					borderRadius: 999,
					background: `linear-gradient(135deg, ${COLORS.orange} 0%, #ff9a56 45%, ${COLORS.gold} 100%)`,
					boxShadow: `0 18px 50px -10px rgba(255,122,61,0.65), 0 0 0 2px rgba(255,255,255,0.15) inset`,
					fontFamily: FONT_STACK,
					fontWeight: 800,
					fontSize: 44,
					letterSpacing: 1,
					color: '#1a0f05',
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
							width: 40,
							height: 40,
							marginLeft: -20,
							marginTop: -20,
							borderRadius: '50%',
							background: 'rgba(255,255,255,0.55)',
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
