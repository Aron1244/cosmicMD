import { useMemo, useState, useEffect, type CSSProperties } from 'react';

type ProjectType = 'docs' | 'product' | 'blog' | 'changelog';
type FormatType = 'markdown' | 'mdx' | 'documentation' | 'landing';
type ThemeType = 'dark' | 'light';
type PaletteType = 'aurora' | 'solar' | 'mint' | 'rose' | 'cobalt' | 'graphite';

type ColorPalette = {
	name: string;
	primary: string;
	accent: string;
	surface: string;
	text: string;
};

type FontOption = {
	name: string;
	label: string;
	stack: string;
	preview: string;
};

type AccentOption = {
	name: string;
	value: string;
};

const colorPalettes: Record<PaletteType, ColorPalette> = {
	aurora: { name: 'Aurora', primary: '#7c3aed', accent: '#22d3ee', surface: '#0f172a', text: '#f8fafc' },
	solar: { name: 'Solar', primary: '#f97316', accent: '#fde68a', surface: '#1e293b', text: '#f8fafc' },
	mint: { name: 'Mint', primary: '#10b981', accent: '#a7f3d0', surface: '#0f172a', text: '#f8fafc' },
	rose: { name: 'Rose', primary: '#fb7185', accent: '#fecdd3', surface: '#1f2937', text: '#f8fafc' },
	cobalt: { name: 'Cobalt', primary: '#2563eb', accent: '#93c5fd', surface: '#111827', text: '#f8fafc' },
	graphite: { name: 'Graphite', primary: '#111827', accent: '#f3f4f6', surface: '#030712', text: '#f8fafc' },
};

const projectTypes: Array<{ value: ProjectType; label: string; description: string; accent: string }> = [
	{ value: 'docs', label: 'Docs', description: 'Technical documentation', accent: 'from-cyan-300 to-sky-500' },
	{ value: 'product', label: 'Product', description: 'Feature-driven pages', accent: 'from-violet-300 to-fuchsia-500' },
	{ value: 'blog', label: 'Blog', description: 'Editorial storytelling', accent: 'from-amber-300 to-orange-500' },
	{ value: 'changelog', label: 'Changelog', description: 'Release notes and updates', accent: 'from-emerald-300 to-teal-500' },
];

const formatTypes: Array<{ value: FormatType; label: string; description: string }> = [
	{ value: 'markdown', label: 'Markdown', description: 'Plain markdown source' },
	{ value: 'mdx', label: 'MDX', description: 'Markdown with components' },
	{ value: 'documentation', label: 'Documentation', description: 'Structured knowledge base' },
	{ value: 'landing', label: 'Landing', description: 'Commercial narrative' },
];

const themeModes: Array<{ value: ThemeType; label: string; description: string }> = [
	{ value: 'dark', label: 'Dark', description: 'High-contrast night mode' },
	{ value: 'light', label: 'Light', description: 'Soft editorial daylight' },
];

const defaultFonts: FontOption[] = [
	{ name: 'sora', label: 'Sora', stack: '"Sora", system-ui, sans-serif', preview: '' },
	{ name: 'inter-tight', label: 'Inter Tight', stack: '"Inter Tight", "Inter", system-ui, sans-serif', preview: '' },
	{ name: 'fraunces', label: 'Fraunces', stack: '"Fraunces", Georgia, serif', preview: '' },
	{ name: 'manrope', label: 'Manrope', stack: '"Manrope", "Inter", system-ui, sans-serif', preview: '' },
	{ name: 'dm-sans', label: 'DM Sans', stack: '"DM Sans", "Inter", system-ui, sans-serif', preview: '' },
	{ name: 'source-serif-4', label: 'Source Serif 4', stack: '"Source Serif 4", Georgia, serif', preview: '' },
	{ name: 'playfair-display', label: 'Playfair Display', stack: '"Playfair Display", Georgia, serif', preview: '' },
	{ name: 'lora', label: 'Lora', stack: '"Lora", Georgia, serif', preview: '' },
	{ name: 'roboto', label: 'Roboto', stack: '"Roboto", system-ui, sans-serif', preview: '' },
	{ name: 'open-sans', label: 'Open Sans', stack: '"Open Sans", system-ui, sans-serif', preview: '' },
	{ name: 'poppins', label: 'Poppins', stack: '"Poppins", system-ui, sans-serif', preview: '' },
	{ name: 'raleway', label: 'Raleway', stack: '"Raleway", system-ui, sans-serif', preview: '' },
	{ name: 'montserrat', label: 'Montserrat', stack: '"Montserrat", system-ui, sans-serif', preview: '' },
	{ name: 'crimson-text', label: 'Crimson Text', stack: '"Crimson Text", Georgia, serif', preview: '' },
	{ name: 'merriweather', label: 'Merriweather', stack: '"Merriweather", Georgia, serif', preview: '' },
	{ name: 'nunito', label: 'Nunito', stack: '"Nunito", system-ui, sans-serif', preview: '' },
	{ name: 'quicksand', label: 'Quicksand', stack: '"Quicksand", system-ui, sans-serif', preview: '' },
	{ name: 'source-code-pro', label: 'Source Code Pro', stack: '"Source Code Pro", monospace', preview: '' },
	{ name: 'jetbrains-mono', label: 'JetBrains Mono', stack: '"JetBrains Mono", monospace', preview: '' },
	{ name: 'inter', label: 'Inter', stack: '"Inter", system-ui, sans-serif', preview: '' },
	{ name: 'ibm-plex-mono', label: 'IBM Plex Mono', stack: '"IBM Plex Mono", monospace', preview: '' },
	{ name: 'ibm-plex-sans', label: 'IBM Plex Sans', stack: '"IBM Plex Sans", system-ui, sans-serif', preview: '' },
	{ name: 'ibm-plex-serif', label: 'IBM Plex Serif', stack: '"IBM Plex Serif", Georgia, serif', preview: '' },
	{ name: 'ubuntu', label: 'Ubuntu', stack: '"Ubuntu", system-ui, sans-serif', preview: '' },
	{ name: 'ubuntu-mono', label: 'Ubuntu Mono', stack: '"Ubuntu Mono", monospace', preview: '' },
	{ name: 'inconsolata', label: 'Inconsolata', stack: '"Inconsolata", monospace', preview: '' },
	{ name: 'fira-code', label: 'Fira Code', stack: '"Fira Code", monospace', preview: '' },
	{ name: 'fira-sans', label: 'Fira Sans', stack: '"Fira Sans", system-ui, sans-serif', preview: '' },
	{ name: 'fira-serif', label: 'Fira Serif', stack: '"Fira Serif", Georgia, serif', preview: '' },
	{ name: 'noto-sans', label: 'Noto Sans', stack: '"Noto Sans", system-ui, sans-serif', preview: '' },
	{ name: 'noto-serif', label: 'Noto Serif', stack: '"Noto Serif", Georgia, serif', preview: '' },
	{ name: 'droid-sans', label: 'Droid Sans', stack: '"Droid Sans", system-ui, sans-serif', preview: '' },
	{ name: 'droid-serif', label: 'Droid Serif', stack: '"Droid Serif", Georgia, serif', preview: '' },
	{ name: 'garamond', label: 'Garamond', stack: '"Garamond", Georgia, serif', preview: '' },
	{ name: 'georgia', label: 'Georgia', stack: 'Georgia, serif', preview: '' },
	{ name: 'times-new-roman', label: 'Times New Roman', stack: '"Times New Roman", serif', preview: '' },
	{ name: 'courier-new', label: 'Courier New', stack: '"Courier New", monospace', preview: '' },
	{ name: 'consolas', label: 'Consolas', stack: 'Consolas, monospace', preview: '' },
	{ name: 'monaco', label: 'Monaco', stack: 'Monaco, monospace', preview: '' },
	{ name: 'liberation-mono', label: 'Liberation Mono', stack: '"Liberation Mono", monospace', preview: '' },
	{ name: 'liberation-sans', label: 'Liberation Sans', stack: '"Liberation Sans", system-ui, sans-serif', preview: '' },
	{ name: 'liberation-serif', label: 'Liberation Serif', stack: '"Liberation Serif", Georgia, serif', preview: '' },
	{ name: 'dejavu-sans', label: 'DejaVu Sans', stack: '"DejaVu Sans", system-ui, sans-serif', preview: '' },
	{ name: 'dejavu-serif', label: 'DejaVu Serif', stack: '"DejaVu Serif", Georgia, serif', preview: '' },
	{ name: 'dejavu-mono', label: 'DejaVu Mono', stack: '"DejaVu Mono", monospace', preview: '' },
	{ name: 'cascadia-code', label: 'Cascadia Code', stack: '"Cascadia Code", monospace', preview: '' },
	{ name: 'cascadia-mono', label: 'Cascadia Mono', stack: '"Cascadia Mono", monospace', preview: '' },
	{ name: 'victor-mono', label: 'Victor Mono', stack: '"Victor Mono", monospace', preview: '' },
	{ name: 'input-mono', label: 'Input Mono', stack: '"Input Mono", monospace', preview: '' },
	{ name: 'input-sans', label: 'Input Sans', stack: '"Input Sans", system-ui, sans-serif', preview: '' },
	{ name: 'input-serif', label: 'Input Serif', stack: '"Input Serif", Georgia, serif', preview: '' },
	{ name: 'space-mono', label: 'Space Mono', stack: '"Space Mono", monospace', preview: '' },
	{ name: 'space-grotesk', label: 'Space Grotesk', stack: '"Space Grotesk", system-ui, sans-serif', preview: '' },
	{ name: 'lexend', label: 'Lexend', stack: '"Lexend", system-ui, sans-serif', preview: '' },
	{ name: 'plus-jakarta-sans', label: 'Plus Jakarta Sans', stack: '"Plus Jakarta Sans", system-ui, sans-serif', preview: '' },
	{ name: 'alexandria', label: 'Alexandria', stack: '"Alexandria", system-ui, sans-serif', preview: '' },
	{ name: 'abril-fatface', label: 'Abril Fatface', stack: '"Abril Fatface", Georgia, serif', preview: '' },
	{ name: 'beautiful-stories', label: 'Beautiful Stories', stack: '"Beautiful Stories", Georgia, serif', preview: '' },
	{ name: 'bodoni-moda', label: 'Bodoni Moda', stack: '"Bodoni Moda", Georgia, serif', preview: '' },
	{ name: 'cormorant-garamond', label: 'Cormorant Garamond', stack: '"Cormorant Garamond", Georgia, serif', preview: '' },
	{ name: 'dm-serif-display', label: 'DM Serif Display', stack: '"DM Serif Display", Georgia, serif', preview: '' },
	{ name: 'ebgaramond', label: 'EB Garamond', stack: '"EB Garamond", Georgia, serif', preview: '' },
	{ name: 'epilogue', label: 'Epilogue', stack: '"Epilogue", system-ui, sans-serif', preview: '' },
	{ name: 'gara-mono', label: 'IBM Plex Sans Devanagari', stack: '"IBM Plex Sans Devanagari", system-ui, sans-serif', preview: '' },
	{ name: 'grotesk', label: 'Grotesk', stack: '"Grotesk", system-ui, sans-serif', preview: '' },
	{ name: 'instrument-sans', label: 'Instrument Sans', stack: '"Instrument Sans", system-ui, sans-serif', preview: '' },
	{ name: 'instrument-serif', label: 'Instrument Serif', stack: '"Instrument Serif", Georgia, serif', preview: '' },
	{ name: 'jost', label: 'Jost', stack: '"Jost", system-ui, sans-serif', preview: '' },
	{ name: 'josefin-sans', label: 'Josefin Sans', stack: '"Josefin Sans", system-ui, sans-serif', preview: '' },
	{ name: 'karla', label: 'Karla', stack: '"Karla", system-ui, sans-serif', preview: '' },
	{ name: 'lato', label: 'Lato', stack: '"Lato", system-ui, sans-serif', preview: '' },
	{ name: 'libre-baskerville', label: 'Libre Baskerville', stack: '"Libre Baskerville", Georgia, serif', preview: '' },
	{ name: 'libre-franklin', label: 'Libre Franklin', stack: '"Libre Franklin", system-ui, sans-serif', preview: '' },
	{ name: 'mulish', label: 'Mulish', stack: '"Mulish", system-ui, sans-serif', preview: '' },
	{ name: 'noto-sans-display', label: 'Noto Sans Display', stack: '"Noto Sans Display", system-ui, sans-serif', preview: '' },
	{ name: 'outfit', label: 'Outfit', stack: '"Outfit", system-ui, sans-serif', preview: '' },
	{ name: 'oxygen', label: 'Oxygen', stack: '"Oxygen", system-ui, sans-serif', preview: '' },
	{ name: 'playfair-display-sc', label: 'Playfair Display SC', stack: '"Playfair Display SC", Georgia, serif', preview: '' },
	{ name: 'recoleta', label: 'Recoleta', stack: '"Recoleta", Georgia, serif', preview: '' },
	{ name: 'red-hat-display', label: 'Red Hat Display', stack: '"Red Hat Display", system-ui, sans-serif', preview: '' },
	{ name: 'red-hat-mono', label: 'Red Hat Mono', stack: '"Red Hat Mono", monospace', preview: '' },
	{ name: 'red-hat-text', label: 'Red Hat Text', stack: '"Red Hat Text", system-ui, sans-serif', preview: '' },
	{ name: 'sahitya', label: 'Sahitya', stack: '"Sahitya", Georgia, serif', preview: '' },
	{ name: 'signika', label: 'Signika', stack: '"Signika", system-ui, sans-serif', preview: '' },
	{ name: 'sorting-hat', label: 'Sorting Hat', stack: '"Sorting Hat", Georgia, serif', preview: '' },
	{ name: 'syne', label: 'Syne', stack: '"Syne", system-ui, sans-serif', preview: '' },
	{ name: 'taviraj', label: 'Taviraj', stack: '"Taviraj", Georgia, serif', preview: '' },
	{ name: 'texturina', label: 'Texturina', stack: '"Texturina", Georgia, serif', preview: '' },
	{ name: 'tiempos-headline', label: 'Tiempos Headline', stack: '"Tiempos Headline", Georgia, serif', preview: '' },
	{ name: 'twilio-sans', label: 'Twilio Sans', stack: '"Twilio Sans", system-ui, sans-serif', preview: '' },
	{ name: 'varela-round', label: 'Varela Round', stack: '"Varela Round", system-ui, sans-serif', preview: '' },
	{ name: 'vina-sans', label: 'Vina Sans', stack: '"Vina Sans", system-ui, sans-serif', preview: '' },
	{ name: 'wix-madefor-display', label: 'Wix Madefor Display', stack: '"Wix Madefor Display", system-ui, sans-serif', preview: '' },
	{ name: 'work-sans', label: 'Work Sans', stack: '"Work Sans", system-ui, sans-serif', preview: '' },
];

const accentOptions: AccentOption[] = [
	{ name: 'Cyan', value: '#22d3ee' },
	{ name: 'Violet', value: '#a78bfa' },
	{ name: 'Amber', value: '#f59e0b' },
	{ name: 'Emerald', value: '#34d399' },
	{ name: 'Rose', value: '#fb7185' },
	{ name: 'Blue', value: '#60a5fa' },
];

const initialMarkdown = `# Build a consistent design language

Use this editor to write the core rules for your design system.

## Principles

- Clear hierarchy
- Strong contrast
- Reusable components

> A useful interface explains its hierarchy without asking permission.

## Tokens

- Accent color
- Surface color
- Typography scale

\`\`\`ts
export const tokens = {
  accent: 'cyan',
  mode: 'dark',
};
\`\`\`
`;

const projectLabelMap: Record<ProjectType, { title: string; summary: string; stat: string }> = {
	docs: { title: 'Documentation system', summary: 'A layout focused on order and maintainability.', stat: 'Docs ready' },
	product: { title: 'Product story', summary: 'More emphasis on benefits and conversion blocks.', stat: 'Conversion focus' },
	blog: { title: 'Editorial blog', summary: 'Reading first, with controlled rhythm.', stat: 'Editorial mode' },
	changelog: { title: 'Changelog', summary: 'Short updates and quick-scanning states.', stat: 'Release notes' },
};

const formatLabelMap: Record<FormatType, string> = {
	markdown: 'Markdown core',
	mdx: 'Component friendly',
	documentation: 'Technical docs',
	landing: 'Narrative landing',
};

function hexToRgba(hex: string, alpha: number) {
	const normalizedHex = hex.replace('#', '');
	const value = normalizedHex.length === 3 ? normalizedHex.split('').map((character) => character + character).join('') : normalizedHex;
	const parsed = Number.parseInt(value, 16);
	const red = (parsed >> 16) & 255;
	const green = (parsed >> 8) & 255;
	const blue = parsed & 255;
	return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}

function escapeHtml(value: string) {
	return value
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;')
		.replaceAll("'", '&#39;');
}

function renderInline(value: string) {
	let html = escapeHtml(value);
	html = html.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noreferrer" class="underline decoration-current decoration-1 underline-offset-2">$1</a>');
	html = html.replace(/`([^`]+)`/g, '<code class="rounded bg-black/10 px-1.5 py-0.5 font-mono text-[0.92em]">$1</code>');
	html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
	html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');
	return html;
}

function markdownToHtml(markdown: string) {
	const lines = markdown.replaceAll('\r\n', '\n').split('\n');
	const blocks: string[] = [];
	let index = 0;

	const isBlockStart = (line: string | undefined) => Boolean(line && /^(#{1,6}\s+|>\s?|[-*+]\s+|```|---$)/.test(line));

	while (index < lines.length) {
		const line = lines[index];

		if (!line.trim()) {
			index += 1;
			continue;
		}

		const headingMatch = line.match(/^(#{1,6})\s+(.*)$/);
		if (headingMatch) {
			const level = headingMatch[1].length;
			blocks.push(`<h${level}>${renderInline(headingMatch[2])}</h${level}>`);
			index += 1;
			continue;
		}

		if (line.startsWith('```')) {
			const codeLines: string[] = [];
			index += 1;
			while (index < lines.length && !lines[index].startsWith('```')) {
				codeLines.push(lines[index]);
				index += 1;
			}
			index += 1;
			blocks.push(`<pre><code>${escapeHtml(codeLines.join('\n'))}</code></pre>`);
			continue;
		}

		if (/^>\s?/.test(line)) {
			const quoteLines: string[] = [];
			while (index < lines.length && /^>\s?/.test(lines[index])) {
				quoteLines.push(lines[index].replace(/^>\s?/, ''));
				index += 1;
			}
			blocks.push(`<blockquote><p>${renderInline(quoteLines.join(' '))}</p></blockquote>`);
			continue;
		}

		if (/^[-*+]\s+/.test(line)) {
			const items: string[] = [];
			while (index < lines.length && /^[-*+]\s+/.test(lines[index])) {
				items.push(`<li>${renderInline(lines[index].replace(/^[-*+]\s+/, ''))}</li>`);
				index += 1;
			}
			blocks.push(`<ul>${items.join('')}</ul>`);
			continue;
		}

		if (/^---$/.test(line.trim())) {
			blocks.push('<hr />');
			index += 1;
			continue;
		}

		const paragraphLines: string[] = [line.trim()];
		index += 1;
		while (index < lines.length && lines[index].trim() && !isBlockStart(lines[index])) {
			paragraphLines.push(lines[index].trim());
			index += 1;
		}
		blocks.push(`<p>${renderInline(paragraphLines.join(' '))}</p>`);
	}

	return blocks.join('');
}

export default function MarkdownWorkbench() {
	const [selectedTheme, setSelectedTheme] = useState<ThemeType>('dark');
	const [selectedPalette, setSelectedPalette] = useState<PaletteType>('aurora');
	const [selectedAccent, setSelectedAccent] = useState(colorPalettes.aurora.accent);
	const [selectedFont, setSelectedFont] = useState(defaultFonts[0]);
	const [selectedProjectType, setSelectedProjectType] = useState<ProjectType>('docs');
	const [selectedFormat, setSelectedFormat] = useState<FormatType>('markdown');
	const [selectedMarkdown, setSelectedMarkdown] = useState(initialMarkdown);
	const [copied, setCopied] = useState(false);
	const [fontDropdownOpen, setFontDropdownOpen] = useState(false);

	const projectMeta = projectLabelMap[selectedProjectType];
	const themeLabel = themeModes.find((item) => item.value === selectedTheme) ?? themeModes[0];
	const accentLabel = accentOptions.find((option) => option.value.toLowerCase() === selectedAccent.toLowerCase()) ?? accentOptions[0];
	const selectedAccentSoft = selectedTheme === 'dark' ? hexToRgba(selectedAccent, 0.18) : hexToRgba(selectedAccent, 0.12);
	
	// Generate complete DESIGN.md file
	const generatedDesignMD = useMemo(() => {
		const palette = colorPalettes[selectedPalette];
		return `---
version: alpha
name: ${projectMeta.title} Design System
description: |
  A modern design system built for ${selectedProjectType} with ${themeModes.find(t => t.value === selectedTheme)?.label} mode support.
  Features a ${palette.name} color palette with customizable typography and component tokens.

colors:
  primary: "${palette.primary}"
  accent: "${palette.accent}"
  surface-dark: "#020617"
  surface-light: "#f8fafc"
  text-dark: "#f8fafc"
  text-light: "#0f172a"
  text-secondary: "#cbd5e1"
  text-muted: "#64748b"
  error: "#ef4444"
  warning: "#f59e0b"
  success: "#34d399"

typography:
  sans:
    fontFamily: "${selectedFont.label}"
    weights: [400, 500, 600, 700]
  mono:
    fontFamily: "IBM Plex Mono"
    weights: [400, 500, 600]
  
  display-xl:
    fontFamily: ${selectedFont.label}
    fontSize: 48px
    fontWeight: 700
    lineHeight: 1.25
    
  heading-xl:
    fontFamily: ${selectedFont.label}
    fontSize: 28px
    fontWeight: 700
    lineHeight: 1.3
    
  heading-md:
    fontFamily: ${selectedFont.label}
    fontSize: 20px
    fontWeight: 600
    lineHeight: 1.4
    
  body-md:
    fontFamily: ${selectedFont.label}
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.6
    
  body-sm:
    fontFamily: ${selectedFont.label}
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.6
    
  code-md:
    fontFamily: "IBM Plex Mono"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.6

rounded:
  none: 0px
  xs: 1px
  sm: 2px
  md: 4px
  lg: 8px
  xl: 12px
  full: 9999px

spacing:
  xxs: 2px
  xs: 4px
  sm: 8px
  md: 12px
  lg: 16px
  xl: 24px
  xxl: 32px
  section: 64px

components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.text-dark}"
    rounded: "{rounded.lg}"
    padding: 12px 24px
    height: 44px
    
  button-secondary:
    backgroundColor: "{colors.surface-soft}"
    textColor: "{colors.text-light}"
    rounded: "{rounded.lg}"
    padding: 12px 24px
    
  card-default:
    backgroundColor: "{colors.surface-dark}"
    border: "1px solid rgba(148, 163, 184, 0.18)"
    borderRadius: "{rounded.xl}"
    padding: "{spacing.lg}"

---

## Overview

This design system is tailored for **${projectMeta.title}** with a focus on **${selectedFormat}** format. It emphasizes clarity, consistency, and flexibility across all visual elements.

The system is built around:
- **Color Palette:** ${palette.name} theme with primary accent at \`${palette.primary}\`
- **Typography:** ${selectedFont.label} as the primary typeface
- **Format:** ${formatLabelMap[selectedFormat]}
- **Theme Mode:** ${themeModes.find(t => t.value === selectedTheme)?.label} mode

## Colors

### Primary Palette

| Token | Value | Use |
|---|---|---|
| \`primary\` | \`${palette.primary}\` | Primary CTA, active states, brand indicator |
| \`accent\` | \`${palette.accent}\` | Highlight and secondary affordance |
| \`surface-dark\` | \`#020617\` | Main canvas, card backgrounds |
| \`surface-light\` | \`#f8fafc\` | Light mode surfaces |
| \`text-dark\` | \`#f8fafc\` | Primary text on dark |
| \`text-light\` | \`#0f172a\` | Primary text on light |

### Semantic Colors

| Token | Value | Use |
|---|---|---|
| \`error\` | \`#ef4444\` | Error states, validation |
| \`warning\` | \`#f59e0b\` | Warnings and cautions |
| \`success\` | \`#34d399\` | Success confirmations |

## Typography

### Font Family

**${selectedFont.label}** is the primary typeface. Weights: 400–700.

### Type Scale

| Token | Size | Weight | Use |
|---|---|---|---|
| \`display-xl\` | 48px | 700 | Hero headline |
| \`heading-xl\` | 28px | 700 | Section heading |
| \`heading-md\` | 20px | 600 | Card title |
| \`body-md\` | 16px | 400 | Default paragraph |
| \`body-sm\` | 14px | 400 | Secondary text |
| \`code-md\` | 14px | 400 | Code blocks |

## Layout

### Spacing System

- **Base unit:** 8px
- **Tokens:** 2px · 4px · 8px · 12px · 16px · 24px · 32px · 64px

All spacing values snap to the 8px grid.

### Border Radius

| Token | Value | Use |
|---|---|---|
| \`none\` | 0px | Full-bleed edges |
| \`sm\` | 2px | Technical feel |
| \`lg\` | 8px | Buttons, inputs |
| \`xl\` | 12px | Cards, modals |
| \`full\` | 9999px | Avatars, pills |

## Components

### Buttons

**\`button-primary\`** — Primary CTA
- Background \`{colors.primary}\`, text \`{colors.text-dark}\`
- Padding: 12px 24px, height: 44px

**\`button-secondary\`** — Secondary action
- Background \`{colors.surface-soft}\`, text \`{colors.text-light}\`
- Padding: 12px 24px, height: 44px

### Cards

**\`card-default\`**
- Background \`{colors.surface-dark}\` with border
- Border-radius: 12px, padding: 16px

## Do's and Don'ts

### Do
- ✅ Use the **8px spacing grid** for all margins and padding
- ✅ Pair typography tokens correctly by purpose
- ✅ Maintain 44px minimum height for touch targets
- ✅ Test all components in both light and dark modes

### Don't
- ❌ Introduce custom spacing outside the 8px grid
- ❌ Mix multiple fonts arbitrarily in single heading
- ❌ Use button heights less than 44px for touch targets
- ❌ Ignore contrast ratios in color selection

## Responsive Behavior

### Breakpoints

| Breakpoint | Width | Changes |
|---|---|---|
| Desktop | 1280px+ | 2-column grid, full sidebar |
| Tablet | 768px–1279px | 1-column stacked layout |
| Mobile | < 768px | Full single-column, compact spacing |

### Touch Targets

All interactive elements maintain **44px minimum height** for proper touch usability.

## Known Gaps

- Advanced animation patterns TBD
- Accessibility labels (ARIA) in separate spec
- Print styles not yet documented

---

**Generated for:** ${selectedProjectType} • **Format:** ${formatLabelMap[selectedFormat]} • **Theme:** ${themeModes.find(t => t.value === selectedTheme)?.label} • **Palette:** ${palette.name}
`;
	}, [projectMeta.title, selectedProjectType, selectedTheme, selectedFormat, selectedFont.label, selectedPalette, selectedMarkdown]);
	
	const generatedDocument = generatedDesignMD;

	const previewHtml = useMemo(() => markdownToHtml(selectedMarkdown), [selectedMarkdown]);

	const themeStyles: CSSProperties = {
		background: selectedTheme === 'dark' ? '#020617' : '#f8fafc',
		color: selectedTheme === 'dark' ? '#f8fafc' : '#0f172a',
		borderColor: selectedTheme === 'dark' ? 'rgba(148, 163, 184, 0.18)' : 'rgba(15, 23, 42, 0.12)',
		'--accent': selectedAccent,
		'--accent-soft': selectedAccentSoft,
	} as CSSProperties;

	// Load selected font dynamically from Google Fonts
	useEffect(() => {
		if (selectedFont.name.includes('http') || selectedFont.name.match(/^(georgia|serif|sans-serif|monospace)/)) {
			return; // Skip system fonts
		}
		
		// Format font name for Google Fonts URL
		const fontName = selectedFont.label.replace(/\s+/g, '+');
		const fontUrl = `https://fonts.googleapis.com/css2?family=${fontName}:wght@400;500;600;700&display=swap`;
		
		// Check if this font is already loaded
		const existing = document.querySelector(`link[href="${fontUrl}"]`);
		if (!existing && selectedFont.label.length > 0 && !selectedFont.stack.includes('system-ui')) {
			const link = document.createElement('link');
			link.href = fontUrl;
			link.rel = 'stylesheet';
			document.head.appendChild(link);
		}
	}, [selectedFont]);

	// Close dropdown when clicking outside
	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			const target = e.target as HTMLElement;
			if (fontDropdownOpen && !target.closest('[data-font-dropdown]')) {
				setFontDropdownOpen(false);
			}
		};
		document.addEventListener('click', handleClickOutside);
		return () => document.removeEventListener('click', handleClickOutside);
	}, [fontDropdownOpen]);

	const handleDownload = () => {
		const file = new Blob([generatedDocument], { type: 'text/markdown;charset=utf-8' });
		const url = URL.createObjectURL(file);
		const link = document.createElement('a');
		link.href = url;
		link.download = 'design.md';
		link.click();
		URL.revokeObjectURL(url);
	};

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(generatedDocument);
			setCopied(true);
			window.setTimeout(() => setCopied(false), 1500);
		} catch {
			setCopied(false);
		}
	};

	return (
		<section
			className="rounded-[2rem] border p-6 shadow-2xl shadow-slate-950/30 backdrop-blur-xl sm:p-8"
			style={themeStyles}
		>
			<div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
				<div className="max-w-3xl space-y-2">
				<p className="text-xs font-semibold uppercase tracking-[0.35em] text-[color:var(--accent)]">Design system generator</p>
				<h2 className="text-3xl font-black tracking-tight sm:text-4xl">Create a custom DESIGN.md for your project</h2>
				<p className="max-w-2xl text-sm leading-6" style={{ color: selectedTheme === 'dark' ? '#cbd5e1' : '#475569' }}>
					Personalize your design system: choose colors, typography, spacing, and components. Download a ready-to-use DESIGN.md file with everything you selected.
				</p>
			</div>
			<div className="flex flex-wrap gap-2">
				{themeModes.map((themeMode) => {
				const active = selectedTheme === themeMode.value;
				return (
					<button
						key={themeMode.value}
						type="button"
						onClick={() => setSelectedTheme(themeMode.value)}
						className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${active ? `border-[color:var(--accent)] bg-[color:var(--accent-soft)] ${selectedTheme === 'dark' ? 'text-white' : 'text-slate-950'}` : 'border-current/15 bg-transparent'}`}
					>
						{themeMode.label}
					</button>
				);
			})}
		</div>
	</div>
		<div className="mt-6 grid gap-4 rounded-[1.5rem] border border-current/10 bg-current/5 p-4 lg:grid-cols-[1fr_1fr] lg:items-start">
			<div>					<p className="text-xs uppercase tracking-[0.3em] text-slate-400">Color palette</p>
					<p className="text-sm font-semibold">Select a pre-built palette or customize colors.</p>
					<div className="mt-3 flex flex-wrap gap-2">
						{(Object.entries(colorPalettes) as [PaletteType, ColorPalette][]).map(([key, palette]) => {
							const active = selectedPalette === key;
							return (
								<button
									key={key}
									type="button"
									onClick={() => {
										setSelectedPalette(key);
										setSelectedAccent(palette.accent);
									}}
									className={`flex items-center gap-2 rounded-full border px-3 py-2 text-sm font-semibold transition ${active ? `border-[color:var(--accent)] bg-[color:var(--accent-soft)] ${selectedTheme === 'dark' ? 'text-white' : 'text-slate-950'}` : 'border-current/15 bg-transparent'}`}
								>
									<span className="h-3 w-3 rounded-full" style={{ background: palette.primary }}></span>
									{palette.name}
								</button>
							);
						})}
					</div>
				</div>

				<div>
					<p className="text-xs uppercase tracking-[0.3em] text-slate-400">Accent color</p>
					<p className="text-sm font-semibold">Fine-tune the accent shade.</p>
					<div className="mt-3 flex items-center gap-3">
						<label className="flex h-14 w-14 cursor-pointer items-center justify-center rounded-2xl border border-current/10 bg-current/5 shadow-sm transition hover:border-[color:var(--accent)]">
							<span className="sr-only">Choose accent color</span>
							<input
								type="color"
								value={selectedAccent}
								onChange={(event) => setSelectedAccent(event.target.value)}
								className="h-11 w-11 cursor-pointer rounded-lg border-0 bg-transparent p-0"
							/>
						</label>
						<input
							type="text"
							value={selectedAccent}
							onChange={(event) => setSelectedAccent(event.target.value)}
							className="h-14 flex-1 rounded-2xl border border-current/10 bg-transparent px-4 font-mono text-sm uppercase tracking-[0.18em] outline-none transition focus:border-[color:var(--accent)]"
						/>
					</div>
				</div>
			</div>

			<div className="mt-6 grid gap-4 rounded-[1.5rem] border border-current/10 bg-current/5 p-4 lg:grid-cols-[1fr] lg:items-start">
				<div>
					<p className="text-xs uppercase tracking-[0.3em] text-slate-400">Google Fonts</p>
					<p className="text-sm font-semibold">Choose your primary typeface from 100+ fonts.</p>
					<div className="relative mt-3" data-font-dropdown>
						<button
							onClick={() => setFontDropdownOpen(!fontDropdownOpen)}
							className="w-full rounded-2xl border border-current/10 bg-current/5 px-4 py-3 text-left font-semibold outline-none transition hover:border-[color:var(--accent)] focus:border-[color:var(--accent)]"
							style={{ color: selectedTheme === 'dark' ? '#f8fafc' : '#0f172a' }}
						>
							<div className="flex items-center justify-between">
								<span>{selectedFont.label}</span>
								<span className={`text-xs transition ${fontDropdownOpen ? 'rotate-180' : ''}`}>▼</span>
							</div>
						</button>
						
						{fontDropdownOpen && (
							<div 
								className="absolute top-full left-0 right-0 z-50 mt-2 rounded-2xl border border-current/10 shadow-xl max-h-64 overflow-y-auto"
								style={{
									background: selectedTheme === 'dark' ? '#020617' : '#f8fafc',
									borderColor: selectedTheme === 'dark' ? 'rgba(148, 163, 184, 0.18)' : 'rgba(15, 23, 42, 0.12)',
								}}
							>
								{defaultFonts.map((font) => (
									<button
										key={font.name}
										onClick={() => {
											setSelectedFont(font);
											setFontDropdownOpen(false);
										}}
										className={`w-full px-4 py-3 text-left transition hover:bg-current/10 ${selectedFont.name === font.name ? 'border-l-4 border-[color:var(--accent)]' : 'border-l-4 border-transparent'}`}
										style={{ color: selectedTheme === 'dark' ? '#f8fafc' : '#0f172a' }}
									>
										{font.label}
									</button>
								))}
							</div>
						)}
					</div>
				</div>
			</div>

			<div className="mt-6 grid gap-5 xl:grid-cols-[1fr_1.05fr]">
				<div className="space-y-5 rounded-[1.75rem] border border-current/10 bg-current/5 p-5">
					<div>
						<p className="text-xs uppercase tracking-[0.3em] text-slate-400">Project type</p>
						<div className="mt-3 flex flex-wrap gap-3">
							{projectTypes.map((projectType) => {
								const active = selectedProjectType === projectType.value;
								return (
									<button
										key={projectType.value}
										type="button"
										onClick={() => setSelectedProjectType(projectType.value)}
									className={`flex min-h-[84px] flex-1 items-center gap-3 rounded-2xl border p-4 text-left transition sm:min-w-[200px] ${active ? `border-[color:var(--accent)] bg-[color:var(--accent-soft)] ${selectedTheme === 'dark' ? 'text-white' : 'text-slate-950'}` : 'border-current/10 bg-transparent'}`}
									>
										<span className={`h-10 w-10 shrink-0 rounded-2xl bg-gradient-to-br ${projectType.accent}`}></span>
										<div className="min-w-0 flex-1">
											<p className="text-sm font-semibold">{projectType.label}</p>
											<p className="mt-1 text-sm leading-5 opacity-80">{projectType.description}</p>
										</div>
									</button>
								);
							})}
						</div>
					</div>

					<div>
						<p className="text-xs uppercase tracking-[0.3em] text-slate-400">Format</p>
						<div className="mt-3 flex flex-wrap gap-3">
							{formatTypes.map((formatType) => {
								const active = selectedFormat === formatType.value;
								return (
									<button
										key={formatType.value}
										type="button"
										onClick={() => setSelectedFormat(formatType.value)}
										className={`min-h-[78px] flex-1 rounded-2xl border px-4 py-3 text-left transition sm:min-w-[180px] ${active ? `border-[color:var(--accent)] bg-[color:var(--accent-soft)] ${selectedTheme === 'dark' ? 'text-white' : 'text-slate-950'}` : 'border-current/10 bg-transparent'}`}
									>
										<p className="text-sm font-semibold">{formatType.label}</p>
										<p className="mt-1 text-xs uppercase tracking-[0.18em] opacity-75">{formatType.description}</p>
									</button>
								);
							})}
						</div>
					</div>

					<div className="rounded-[1.5rem] border border-current/10 bg-current/5 p-4">
						<div className="flex items-center justify-between gap-3">
							<div>
								<p className="text-xs uppercase tracking-[0.3em] text-slate-400">Project definition</p>
								<p className="mt-2 text-lg font-bold">{projectMeta.title}</p>
							</div>
							<span className="rounded-full border border-current/10 px-3 py-1 text-xs font-semibold">{projectMeta.stat}</span>
						</div>
						<p className="mt-3 text-sm leading-6" style={{ color: selectedTheme === 'dark' ? '#cbd5e1' : '#475569' }}>
							{projectMeta.summary}
						</p>
						<div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.18em]">
							<span className="rounded-full border border-current/10 bg-current/5 px-3 py-1">{themeLabel.label}</span>
							<span className="rounded-full border border-current/10 bg-current/5 px-3 py-1">{formatLabelMap[selectedFormat]}</span>
							<span className="rounded-full border border-current/10 bg-current/5 px-3 py-1">{selectedFont.label}</span>
						</div>
					</div>

					<div>
						<p className="text-xs uppercase tracking-[0.3em] text-slate-400">Markdown editor</p>
						<textarea
							value={selectedMarkdown}
							onChange={(event) => setSelectedMarkdown(event.target.value)}
							className="mt-3 min-h-[360px] w-full rounded-[1.5rem] border border-current/10 bg-current/5 p-5 font-mono text-sm leading-6 outline-none transition focus:border-[color:var(--accent)]"
							style={{ color: selectedTheme === 'dark' ? '#e2e8f0' : '#0f172a' }}
						/>
						<div className="mt-4 flex flex-wrap gap-3">
							<button
								type="button"
								onClick={handleDownload}
								className="rounded-full bg-[color:var(--accent)] px-5 py-3 text-sm font-semibold text-slate-950 transition hover:opacity-90"
							>
								Generate and download design.md
							</button>
							<button
								type="button"
								onClick={handleCopy}
								className="rounded-full border border-current/15 bg-transparent px-5 py-3 text-sm font-semibold transition hover:border-[color:var(--accent)]"
							>
								{copied ? 'Copied' : 'Copy generated markdown'}
							</button>
						</div>
					</div>
				</div>

				<div className="rounded-[1.75rem] border border-current/10 bg-current/5 p-5">
					<div className="flex items-center justify-between gap-4">
						<div>
							<p className="text-xs uppercase tracking-[0.35em] text-[color:var(--accent)]">Live preview</p>
							<h3 className="mt-2 text-2xl font-black sm:text-3xl">{projectMeta.title}</h3>
						</div>
						<div className="rounded-full border border-current/10 px-3 py-1 text-xs font-semibold">{formatLabelMap[selectedFormat]}</div>
					</div>

					<div className="mt-4 grid gap-3 sm:grid-cols-4">
						<div className="rounded-2xl border border-current/10 bg-current/5 p-4">
							<p className="text-xs uppercase tracking-[0.28em] text-slate-400">Theme</p>
							<p className="mt-2 text-sm font-semibold">{themeLabel.label}</p>
						</div>
						<div className="rounded-2xl border border-current/10 bg-current/5 p-4">
							<p className="text-xs uppercase tracking-[0.28em] text-slate-400">Accent</p>
							<p className="mt-2 text-sm font-semibold">{selectedAccent.toUpperCase()}</p>
						</div>
						<div className="rounded-2xl border border-current/10 bg-current/5 p-4">
							<p className="text-xs uppercase tracking-[0.28em] text-slate-400">Font</p>
							<p className="mt-2 text-sm font-semibold">{selectedFont.label}</p>
						</div>
						<div className="rounded-2xl border border-current/10 bg-current/5 p-4">
							<p className="text-xs uppercase tracking-[0.28em] text-slate-400">Project</p>
							<p className="mt-2 text-sm font-semibold">{selectedProjectType}</p>
						</div>
					</div>

					<article
						className="mt-5 max-w-none rounded-[1.5rem] border border-current/10 bg-current/5 p-6"
						style={{
							fontFamily: selectedFont.stack,
							'--accent-color': selectedAccent,
							'--accent-soft': selectedAccentSoft,
						} as CSSProperties}
					>
						<div
							className="[&_h1]:mb-4 [&_h1]:text-4xl [&_h1]:font-black [&_h1]:tracking-tight [&_h1]:text-current [&_h2]:mb-3 [&_h2]:mt-8 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-current [&_h3]:mb-2 [&_h3]:mt-6 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-current [&_p]:mb-4 [&_p]:text-base [&_p]:leading-7 [&_p]:text-current/85 [&_ul]:mb-4 [&_ul]:ml-6 [&_ul]:list-disc [&_li]:mb-2 [&_blockquote]:my-6 [&_blockquote]:border-l-4 [&_blockquote]:border-[color:var(--accent-color)] [&_blockquote]:bg-[color:var(--accent-soft)] [&_blockquote]:px-4 [&_blockquote]:py-3 [&_blockquote]:text-current [&_pre]:my-6 [&_pre]:overflow-x-auto [&_pre]:rounded-2xl [&_pre]:border [&_pre]:border-current/10 [&_pre]:bg-black/10 [&_pre]:p-4 [&_pre]:font-mono [&_pre]:text-sm [&_code]:rounded [&_code]:bg-black/10 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_a]:font-semibold [&_a]:text-[color:var(--accent-color)] [&_hr]:my-8 [&_hr]:border-current/10"
							dangerouslySetInnerHTML={{ __html: previewHtml }}
						/>
					</article>

					<div className="mt-4 rounded-[1.25rem] border border-current/10 bg-current/5 p-4 font-mono text-xs leading-6">
						<p className="mb-2 uppercase tracking-[0.28em] text-slate-400">Generated file</p>
						<pre className="overflow-x-auto whitespace-pre-wrap">{generatedDocument}</pre>
					</div>
				</div>
			</div>
		</section>
	);
}
