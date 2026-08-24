export const COLORS = {
	bgDarkA: '#050914',
	bgDarkB: '#0b1330',
	bgDarkC: '#141d3d',
	red: '#ff2b4a',
	redDeep: '#8a0f22',
	redGlow: '#ff5570',
	blue: '#1b6bff',
	teal: '#22d3c8',
	green: '#2bff8a',
	greenDeep: '#0c9a52',
	gold: '#ffd27a',
	white: '#ffffff',
	ink: '#0a1020',
	mirBlue: '#0e2a52',
	mirTeal: '#1fb6a8',
	orange: '#ff7a3d',
} as const;

// System font stack only — no external font files or network requests.
export const FONT_STACK =
	"-apple-system, 'Helvetica Neue', Arial, 'Segoe UI', sans-serif";

export const SERVICES = [
	'ChatGPT',
	'Google',
	'Apple',
	'Alipay',
	'Cloud',
] as const;
