export type ProjectType = 'docs' | 'product' | 'blog' | 'changelog';
export type FormatType = 'markdown' | 'mdx' | 'documentation' | 'landing';
export type ThemeType = 'dark' | 'light';
export type PaletteType = 'aurora' | 'solar' | 'mint' | 'rose' | 'cobalt' | 'graphite';

export type ColorPalette = {
	name: string;
	primary: string;
	accent: string;
	surface: string;
	text: string;
};

export type FontOption = {
	name: string;
	label: string;
	stack: string;
};

export type AccentOption = {
	name: string;
	value: string;
};

export type SpacingTokens = {
	xxs: string;
	xs: string;
	sm: string;
	md: string;
	lg: string;
	xl: string;
	xxl: string;
	section: string;
};

export type RadiusTokens = {
	none: string;
	xs: string;
	sm: string;
	md: string;
	lg: string;
	xl: string;
	full: string;
};

export type ButtonTokenSet = {
	backgroundColor: string;
	textColor: string;
	rounded: string;
	padding: string;
	height?: string;
};

export type CardTokenSet = {
	backgroundColor: string;
	border: string;
	borderRadius: string;
	padding: string;
};

export type ComponentTokens = {
	buttonPrimary: ButtonTokenSet;
	buttonSecondary: ButtonTokenSet;
	cardDefault: CardTokenSet;
};

export const colorPalettes: Record<PaletteType, ColorPalette> = {
	aurora: { name: 'Aurora', primary: '#7c3aed', accent: '#22d3ee', surface: '#0f172a', text: '#f8fafc' },
	solar: { name: 'Solar', primary: '#f97316', accent: '#fde68a', surface: '#1e293b', text: '#f8fafc' },
	mint: { name: 'Mint', primary: '#10b981', accent: '#a7f3d0', surface: '#0f172a', text: '#f8fafc' },
	rose: { name: 'Rose', primary: '#fb7185', accent: '#fecdd3', surface: '#1f2937', text: '#f8fafc' },
	cobalt: { name: 'Cobalt', primary: '#2563eb', accent: '#93c5fd', surface: '#111827', text: '#f8fafc' },
	graphite: { name: 'Graphite', primary: '#111827', accent: '#f3f4f6', surface: '#030712', text: '#f8fafc' },
};

export const projectTypes: Array<{ value: ProjectType; label: string; description: string; accent: string }> = [
	{ value: 'docs', label: 'Docs', description: 'Technical documentation', accent: 'from-cyan-300 to-sky-500' },
	{ value: 'product', label: 'Product', description: 'Feature-driven pages', accent: 'from-violet-300 to-fuchsia-500' },
	{ value: 'blog', label: 'Blog', description: 'Editorial storytelling', accent: 'from-amber-300 to-orange-500' },
	{ value: 'changelog', label: 'Changelog', description: 'Release notes and updates', accent: 'from-emerald-300 to-teal-500' },
];

export const formatTypes: Array<{ value: FormatType; label: string; description: string }> = [
	{ value: 'markdown', label: 'Markdown', description: 'Plain markdown source' },
	{ value: 'mdx', label: 'MDX', description: 'Markdown with components' },
	{ value: 'documentation', label: 'Documentation', description: 'Structured knowledge base' },
	{ value: 'landing', label: 'Landing', description: 'Commercial narrative' },
];

export const themeModes: Array<{ value: ThemeType; label: string; description: string }> = [
	{ value: 'dark', label: 'Dark', description: 'High-contrast night mode' },
	{ value: 'light', label: 'Light', description: 'Soft editorial daylight' },
];

export const fontOptionsByKey = {
	sora: { name: 'sora', label: 'Sora', stack: '"Sora", system-ui, sans-serif' },
	'inter-tight': { name: 'inter-tight', label: 'Inter Tight', stack: '"Inter Tight", "Inter", system-ui, sans-serif' },
	fraunces: { name: 'fraunces', label: 'Fraunces', stack: '"Fraunces", Georgia, serif' },
	manrope: { name: 'manrope', label: 'Manrope', stack: '"Manrope", "Inter", system-ui, sans-serif' },
	'dm-sans': { name: 'dm-sans', label: 'DM Sans', stack: '"DM Sans", "Inter", system-ui, sans-serif' },
	'source-serif-4': { name: 'source-serif-4', label: 'Source Serif 4', stack: '"Source Serif 4", Georgia, serif' },
	'playfair-display': { name: 'playfair-display', label: 'Playfair Display', stack: '"Playfair Display", Georgia, serif' },
	lora: { name: 'lora', label: 'Lora', stack: '"Lora", Georgia, serif' },
	roboto: { name: 'roboto', label: 'Roboto', stack: '"Roboto", system-ui, sans-serif' },
	'open-sans': { name: 'open-sans', label: 'Open Sans', stack: '"Open Sans", system-ui, sans-serif' },
	poppins: { name: 'poppins', label: 'Poppins', stack: '"Poppins", system-ui, sans-serif' },
	raleway: { name: 'raleway', label: 'Raleway', stack: '"Raleway", system-ui, sans-serif' },
	montserrat: { name: 'montserrat', label: 'Montserrat', stack: '"Montserrat", system-ui, sans-serif' },
	'crimson-text': { name: 'crimson-text', label: 'Crimson Text', stack: '"Crimson Text", Georgia, serif' },
	merriweather: { name: 'merriweather', label: 'Merriweather', stack: '"Merriweather", Georgia, serif' },
	nunito: { name: 'nunito', label: 'Nunito', stack: '"Nunito", system-ui, sans-serif' },
	quicksand: { name: 'quicksand', label: 'Quicksand', stack: '"Quicksand", system-ui, sans-serif' },
	'source-code-pro': { name: 'source-code-pro', label: 'Source Code Pro', stack: '"Source Code Pro", monospace' },
	'jetbrains-mono': { name: 'jetbrains-mono', label: 'JetBrains Mono', stack: '"JetBrains Mono", monospace' },
	inter: { name: 'inter', label: 'Inter', stack: '"Inter", system-ui, sans-serif' },
	'ibm-plex-mono': { name: 'ibm-plex-mono', label: 'IBM Plex Mono', stack: '"IBM Plex Mono", monospace' },
	'ibm-plex-sans': { name: 'ibm-plex-sans', label: 'IBM Plex Sans', stack: '"IBM Plex Sans", system-ui, sans-serif' },
	'ibm-plex-serif': { name: 'ibm-plex-serif', label: 'IBM Plex Serif', stack: '"IBM Plex Serif", Georgia, serif' },
	ubuntu: { name: 'ubuntu', label: 'Ubuntu', stack: '"Ubuntu", system-ui, sans-serif' },
	'ubuntu-mono': { name: 'ubuntu-mono', label: 'Ubuntu Mono', stack: '"Ubuntu Mono", monospace' },
	inconsolata: { name: 'inconsolata', label: 'Inconsolata', stack: '"Inconsolata", monospace' },
	'fira-code': { name: 'fira-code', label: 'Fira Code', stack: '"Fira Code", monospace' },
	'fira-sans': { name: 'fira-sans', label: 'Fira Sans', stack: '"Fira Sans", system-ui, sans-serif' },
	'fira-serif': { name: 'fira-serif', label: 'Fira Serif', stack: '"Fira Serif", Georgia, serif' },
	'noto-sans': { name: 'noto-sans', label: 'Noto Sans', stack: '"Noto Sans", system-ui, sans-serif' },
	'noto-serif': { name: 'noto-serif', label: 'Noto Serif', stack: '"Noto Serif", Georgia, serif' },
	'droid-sans': { name: 'droid-sans', label: 'Droid Sans', stack: '"Droid Sans", system-ui, sans-serif' },
	'droid-serif': { name: 'droid-serif', label: 'Droid Serif', stack: '"Droid Serif", Georgia, serif' },
	garamond: { name: 'garamond', label: 'Garamond', stack: '"Garamond", Georgia, serif' },
	georgia: { name: 'georgia', label: 'Georgia', stack: 'Georgia, serif' },
	'times-new-roman': { name: 'times-new-roman', label: 'Times New Roman', stack: '"Times New Roman", serif' },
	'courier-new': { name: 'courier-new', label: 'Courier New', stack: '"Courier New", monospace' },
	consolas: { name: 'consolas', label: 'Consolas', stack: 'Consolas, monospace' },
	monaco: { name: 'monaco', label: 'Monaco', stack: 'Monaco, monospace' },
	'liberation-mono': { name: 'liberation-mono', label: 'Liberation Mono', stack: '"Liberation Mono", monospace' },
	'liberation-sans': { name: 'liberation-sans', label: 'Liberation Sans', stack: '"Liberation Sans", system-ui, sans-serif' },
	'liberation-serif': { name: 'liberation-serif', label: 'Liberation Serif', stack: '"Liberation Serif", Georgia, serif' },
	'dejavu-sans': { name: 'dejavu-sans', label: 'DejaVu Sans', stack: '"DejaVu Sans", system-ui, sans-serif' },
	'dejavu-serif': { name: 'dejavu-serif', label: 'DejaVu Serif', stack: '"DejaVu Serif", Georgia, serif' },
	'dejavu-mono': { name: 'dejavu-mono', label: 'DejaVu Mono', stack: '"DejaVu Mono", monospace' },
	'cascadia-code': { name: 'cascadia-code', label: 'Cascadia Code', stack: '"Cascadia Code", monospace' },
	'cascadia-mono': { name: 'cascadia-mono', label: 'Cascadia Mono', stack: '"Cascadia Mono", monospace' },
	'victor-mono': { name: 'victor-mono', label: 'Victor Mono', stack: '"Victor Mono", monospace' },
	'input-mono': { name: 'input-mono', label: 'Input Mono', stack: '"Input Mono", monospace' },
	'input-sans': { name: 'input-sans', label: 'Input Sans', stack: '"Input Sans", system-ui, sans-serif' },
	'input-serif': { name: 'input-serif', label: 'Input Serif', stack: '"Input Serif", Georgia, serif' },
	'space-mono': { name: 'space-mono', label: 'Space Mono', stack: '"Space Mono", monospace' },
	'space-grotesk': { name: 'space-grotesk', label: 'Space Grotesk', stack: '"Space Grotesk", system-ui, sans-serif' },
	lexend: { name: 'lexend', label: 'Lexend', stack: '"Lexend", system-ui, sans-serif' },
	'plus-jakarta-sans': { name: 'plus-jakarta-sans', label: 'Plus Jakarta Sans', stack: '"Plus Jakarta Sans", system-ui, sans-serif' },
	alexandria: { name: 'alexandria', label: 'Alexandria', stack: '"Alexandria", system-ui, sans-serif' },
	'abril-fatface': { name: 'abril-fatface', label: 'Abril Fatface', stack: '"Abril Fatface", Georgia, serif' },
	'beautiful-stories': { name: 'beautiful-stories', label: 'Beautiful Stories', stack: '"Beautiful Stories", Georgia, serif' },
	'bodoni-moda': { name: 'bodoni-moda', label: 'Bodoni Moda', stack: '"Bodoni Moda", Georgia, serif' },
	'cormorant-garamond': { name: 'cormorant-garamond', label: 'Cormorant Garamond', stack: '"Cormorant Garamond", Georgia, serif' },
	'dm-serif-display': { name: 'dm-serif-display', label: 'DM Serif Display', stack: '"DM Serif Display", Georgia, serif' },
	ebgaramond: { name: 'ebgaramond', label: 'EB Garamond', stack: '"EB Garamond", Georgia, serif' },
	epilogue: { name: 'epilogue', label: 'Epilogue', stack: '"Epilogue", system-ui, sans-serif' },
	'gara-mono': { name: 'gara-mono', label: 'IBM Plex Sans Devanagari', stack: '"IBM Plex Sans Devanagari", system-ui, sans-serif' },
	grotesk: { name: 'grotesk', label: 'Grotesk', stack: '"Grotesk", system-ui, sans-serif' },
	'instrument-sans': { name: 'instrument-sans', label: 'Instrument Sans', stack: '"Instrument Sans", system-ui, sans-serif' },
	'instrument-serif': { name: 'instrument-serif', label: 'Instrument Serif', stack: '"Instrument Serif", Georgia, serif' },
	jost: { name: 'jost', label: 'Jost', stack: '"Jost", system-ui, sans-serif' },
	'josefin-sans': { name: 'josefin-sans', label: 'Josefin Sans', stack: '"Josefin Sans", system-ui, sans-serif' },
	karla: { name: 'karla', label: 'Karla', stack: '"Karla", system-ui, sans-serif' },
	lato: { name: 'lato', label: 'Lato', stack: '"Lato", system-ui, sans-serif' },
	'libre-baskerville': { name: 'libre-baskerville', label: 'Libre Baskerville', stack: '"Libre Baskerville", Georgia, serif' },
	'libre-franklin': { name: 'libre-franklin', label: 'Libre Franklin', stack: '"Libre Franklin", system-ui, sans-serif' },
	mulish: { name: 'mulish', label: 'Mulish', stack: '"Mulish", system-ui, sans-serif' },
	'noto-sans-display': { name: 'noto-sans-display', label: 'Noto Sans Display', stack: '"Noto Sans Display", system-ui, sans-serif' },
	outfit: { name: 'outfit', label: 'Outfit', stack: '"Outfit", system-ui, sans-serif' },
	oxygen: { name: 'oxygen', label: 'Oxygen', stack: '"Oxygen", system-ui, sans-serif' },
	'playfair-display-sc': { name: 'playfair-display-sc', label: 'Playfair Display SC', stack: '"Playfair Display SC", Georgia, serif' },
	recoleta: { name: 'recoleta', label: 'Recoleta', stack: '"Recoleta", Georgia, serif' },
	'red-hat-display': { name: 'red-hat-display', label: 'Red Hat Display', stack: '"Red Hat Display", system-ui, sans-serif' },
	'red-hat-mono': { name: 'red-hat-mono', label: 'Red Hat Mono', stack: '"Red Hat Mono", monospace' },
	'red-hat-text': { name: 'red-hat-text', label: 'Red Hat Text', stack: '"Red Hat Text", system-ui, sans-serif' },
	sahitya: { name: 'sahitya', label: 'Sahitya', stack: '"Sahitya", Georgia, serif' },
	signika: { name: 'signika', label: 'Signika', stack: '"Signika", system-ui, sans-serif' },
	'sorting-hat': { name: 'sorting-hat', label: 'Sorting Hat', stack: '"Sorting Hat", Georgia, serif' },
	syne: { name: 'syne', label: 'Syne', stack: '"Syne", system-ui, sans-serif' },
	taviraj: { name: 'taviraj', label: 'Taviraj', stack: '"Taviraj", Georgia, serif' },
	texturina: { name: 'texturina', label: 'Texturina', stack: '"Texturina", Georgia, serif' },
	'tiempos-headline': { name: 'tiempos-headline', label: 'Tiempos Headline', stack: '"Tiempos Headline", Georgia, serif' },
	'twilio-sans': { name: 'twilio-sans', label: 'Twilio Sans', stack: '"Twilio Sans", system-ui, sans-serif' },
	'varela-round': { name: 'varela-round', label: 'Varela Round', stack: '"Varela Round", system-ui, sans-serif' },
	'vina-sans': { name: 'vina-sans', label: 'Vina Sans', stack: '"Vina Sans", system-ui, sans-serif' },
	'wix-madefor-display': { name: 'wix-madefor-display', label: 'Wix Madefor Display', stack: '"Wix Madefor Display", system-ui, sans-serif' },
	'work-sans': { name: 'work-sans', label: 'Work Sans', stack: '"Work Sans", system-ui, sans-serif' },
} satisfies Record<string, FontOption>;

export const fontOptions = Object.values(fontOptionsByKey);

export const accentOptions: AccentOption[] = [
	{ name: 'Cyan', value: '#22d3ee' },
	{ name: 'Violet', value: '#a78bfa' },
	{ name: 'Amber', value: '#f59e0b' },
	{ name: 'Emerald', value: '#34d399' },
	{ name: 'Rose', value: '#fb7185' },
	{ name: 'Blue', value: '#60a5fa' },
];

export const projectLabelMap: Record<ProjectType, { title: string; summary: string; stat: string }> = {
	docs: { title: 'Documentation system', summary: 'A layout focused on order and maintainability.', stat: 'Docs ready' },
	product: { title: 'Product story', summary: 'More emphasis on benefits and conversion blocks.', stat: 'Conversion focus' },
	blog: { title: 'Editorial blog', summary: 'Reading first, with controlled rhythm.', stat: 'Editorial mode' },
	changelog: { title: 'Changelog', summary: 'Short updates and quick-scanning states.', stat: 'Release notes' },
};

export const formatLabelMap: Record<FormatType, string> = {
	markdown: 'Markdown core',
	mdx: 'Component friendly',
	documentation: 'Technical docs',
	landing: 'Narrative landing',
};