import { useMemo, useState, useEffect, type CSSProperties } from 'react';
import WorkbenchAppearancePanel from './MarkdownWorkbench/WorkbenchAppearancePanel';
import WorkbenchContentPanel from './MarkdownWorkbench/WorkbenchContentPanel';
import WorkbenchHeader from './MarkdownWorkbench/WorkbenchHeader';
import WorkbenchPreviewPanel from './MarkdownWorkbench/WorkbenchPreviewPanel';
import {
	colorPalettes,
	fontOptions,
	formatLabelMap,
	formatTypes,
	projectLabelMap,
	projectTypes,
	themeModes,
	type FontOption,
	type FormatType,
	type ComponentTokens,
	type RadiusTokens,
	type SpacingTokens,
	type PaletteType,
	type ProjectType,
	type ThemeType,
} from './MarkdownWorkbench/data';

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
	const [selectedThemeColor, setSelectedThemeColor] = useState(colorPalettes.aurora.surface);
	const [themeColorCustomized, setThemeColorCustomized] = useState(false);
	const [selectedFont, setSelectedFont] = useState(fontOptions[0]);
	const [selectedProjectType, setSelectedProjectType] = useState<ProjectType>('docs');
	const [selectedFormat, setSelectedFormat] = useState<FormatType>('markdown');
	const [documentName, setDocumentName] = useState('Cosmic MD Design System');
	const [documentSummary, setDocumentSummary] = useState('A customizable design system spec for markdown-first projects.');
	const [implementationNotes, setImplementationNotes] = useState(
		'- Keep interactive targets at 44px minimum\n- Prefer reusable tokens over one-off values\n- Document the final components states',
	);
	const [spacingTokens, setSpacingTokens] = useState<SpacingTokens>({
		xxs: '2px',
		xs: '4px',
		sm: '8px',
		md: '12px',
		lg: '16px',
		xl: '24px',
		xxl: '32px',
		section: '64px',
	});
	const [radiusTokens, setRadiusTokens] = useState<RadiusTokens>({
		none: '0px',
		xs: '1px',
		sm: '2px',
		md: '4px',
		lg: '8px',
		xl: '12px',
		full: '9999px',
	});
	const [componentTokens, setComponentTokens] = useState<ComponentTokens>({
		buttonPrimary: {
			backgroundColor: '#22d3ee',
			textColor: '#020617',
			rounded: '{rounded.lg}',
			padding: '12px 24px',
			height: '44px',
		},
		buttonSecondary: {
			backgroundColor: '#1f2937',
			textColor: '#f8fafc',
			rounded: '{rounded.lg}',
			padding: '12px 24px',
			height: '44px',
		},
		cardDefault: {
			backgroundColor: '{colors.surface-dark}',
			border: '1px solid rgba(148, 163, 184, 0.18)',
			borderRadius: '{rounded.xl}',
			padding: '{spacing.lg}',
		},
	});
	const [selectedMarkdown, setSelectedMarkdown] = useState(initialMarkdown);
	const [copied, setCopied] = useState(false);
	const [fontDropdownOpen, setFontDropdownOpen] = useState(false);

	const projectMeta = projectLabelMap[selectedProjectType];
	const themeLabel = themeModes.find((item) => item.value === selectedTheme) ?? themeModes[0];
	const selectedAccentSoft = selectedTheme === 'dark' ? hexToRgba(selectedAccent, 0.18) : hexToRgba(selectedAccent, 0.12);

	const normalizeHexColor = (value: string, fallback: string) => /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(value) ? value : fallback;

	const getReadableTextColor = (hex: string) => {
		const normalizedHex = hex.replace('#', '');
		const expandedHex = normalizedHex.length === 3
			? normalizedHex.split('').map((character) => character + character).join('')
			: normalizedHex;
		const parsed = Number.parseInt(expandedHex, 16);
		const red = (parsed >> 16) & 255;
		const green = (parsed >> 8) & 255;
		const blue = parsed & 255;
		const luminance = (0.299 * red + 0.587 * green + 0.114 * blue) / 255;
		return luminance > 0.62 ? '#0f172a' : '#f8fafc';
	};

	const selectedThemeTextColor = getReadableTextColor(selectedThemeColor);

	useEffect(() => {
		if (themeColorCustomized) {
			return;
		}

		// Use a slightly darker default background for dark mode to improve depth
		setSelectedThemeColor(selectedTheme === 'dark' ? '#020617' : '#f8fafc');
	}, [selectedTheme, selectedPalette, themeColorCustomized]);

	// If the user switches between dark/light mode, reset any custom theme color
	// so the canvas uses the appropriate default surface for the selected mode.
	useEffect(() => {
		if (themeColorCustomized) {
			setThemeColorCustomized(false);
			setSelectedThemeColor(selectedTheme === 'dark' ? '#020617' : '#f8fafc');
		}
	}, [selectedTheme]);
	
	// Generate complete DESIGN.md file
	const generatedDesignMD = useMemo(() => {
		const palette = colorPalettes[selectedPalette];
		const notesBlock = implementationNotes
			.split('\n')
			.map((line) => line.trim())
			.filter(Boolean)
			.map((line) => `- ${line}`)
			.join('\n');
		const spacingBlock = Object.entries(spacingTokens)
			.map(([key, value]) => `  ${key}: ${value}`)
			.join('\n');
		const radiusBlock = Object.entries(radiusTokens)
			.map(([key, value]) => `  ${key}: ${value}`)
			.join('\n');
		const componentBlock = Object.entries(componentTokens)
			.map(([sectionKey, values]) => {
				const entries = Object.entries(values)
					.map(([propertyKey, value]) => `  ${propertyKey}: ${value}`)
					.join('\n');
				return `${sectionKey}:\n${entries}`;
			})
			.join('\n\n');
		return `---
version: alpha
name: ${documentName}
description: |
  ${documentSummary}
  Built for ${selectedProjectType} with ${themeModes.find(t => t.value === selectedTheme)?.label} mode support.
  Features a ${palette.name} color palette with customizable typography and component tokens.

colors:
  primary: "${palette.primary}"
  accent: "${palette.accent}"
	theme-surface: "${selectedThemeColor}"
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
${radiusBlock}

spacing:
${spacingBlock}

components:
${componentBlock}

---

## Overview

This design system is tailored for **${projectMeta.title}** with a focus on **${selectedFormat}** format. It emphasizes clarity, consistency, and flexibility across all visual elements.

The system is built around:
- **Color Palette:** ${palette.name} theme with primary accent at \`${palette.primary}\`
- **Theme Surface:** \`${selectedThemeColor}\` as the editable workbench background
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

## Implementation Notes

${notesBlock || '- No additional notes yet'}

---

**Generated for:** ${selectedProjectType} • **Format:** ${formatLabelMap[selectedFormat]} • **Theme:** ${themeModes.find(t => t.value === selectedTheme)?.label} • **Palette:** ${palette.name}
`;
	}, [documentName, documentSummary, implementationNotes, selectedProjectType, selectedTheme, selectedFormat, selectedFont.label, selectedPalette, selectedThemeColor, spacingTokens, radiusTokens, componentTokens]);
	
	const generatedDocument = generatedDesignMD;

	const previewHtml = useMemo(() => markdownToHtml(selectedMarkdown), [selectedMarkdown]);

	const themeStyles: CSSProperties = {
		background: selectedThemeColor,
		color: selectedThemeTextColor,
		borderColor: selectedTheme === 'light' ? 'rgba(15, 23, 42, 0.12)' : 'rgba(148, 163, 184, 0.22)',
		'--muted-text': selectedTheme === 'light' ? '#334155' : '#94a3b8',
		'--border-subtle': selectedTheme === 'light' ? 'rgba(15, 23, 42, 0.12)' : 'rgba(148, 163, 184, 0.22)',
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
			className="rounded-4xl border p-6 shadow-2xl shadow-slate-950/30 backdrop-blur-xl sm:p-8"
			style={themeStyles}
		>
			<WorkbenchHeader selectedTheme={selectedTheme} themeModes={themeModes} onSelectTheme={setSelectedTheme} />

			<WorkbenchAppearancePanel
				selectedTheme={selectedTheme}
				selectedPalette={selectedPalette}
				selectedThemeColor={normalizeHexColor(selectedThemeColor, colorPalettes[selectedPalette].surface)}
				selectedAccent={selectedAccent}
				selectedFont={selectedFont}
				fontDropdownOpen={fontDropdownOpen}
				colorPalettes={colorPalettes}
				fontOptions={fontOptions}
				onSelectPalette={(paletteKey) => {
					setSelectedPalette(paletteKey);
					setSelectedAccent(colorPalettes[paletteKey].accent);
					setThemeColorCustomized(false);
					setSelectedThemeColor(selectedTheme === 'dark' ? colorPalettes[paletteKey].surface : '#f8fafc');
				}}
				onSelectThemeColor={(color) => {
					setThemeColorCustomized(true);
					setSelectedThemeColor(normalizeHexColor(color, colorPalettes[selectedPalette].surface));
				}}
				onSelectAccent={setSelectedAccent}
				onToggleFontDropdown={() => setFontDropdownOpen(!fontDropdownOpen)}
				onSelectFont={(font) => {
					setSelectedFont(font);
					setFontDropdownOpen(false);
				}}
			/>

			<div className="mt-6 grid gap-5 xl:grid-cols-[1fr_1.05fr]">
				<WorkbenchContentPanel
					selectedTheme={selectedTheme}
					selectedProjectType={selectedProjectType}
					selectedFormat={selectedFormat}
					selectedFont={selectedFont}
					documentName={documentName}
					documentSummary={documentSummary}
					implementationNotes={implementationNotes}
					spacingTokens={spacingTokens}
					radiusTokens={radiusTokens}
					componentTokens={componentTokens}
					selectedMarkdown={selectedMarkdown}
					projectMeta={projectMeta}
					projectTypes={projectTypes}
					formatTypes={formatTypes}
					themeLabel={themeLabel}
					copied={copied}
					onSelectProjectType={setSelectedProjectType}
					onSelectFormat={setSelectedFormat}
					onChangeDocumentName={setDocumentName}
					onChangeDocumentSummary={setDocumentSummary}
					onChangeImplementationNotes={setImplementationNotes}
					onChangeSpacingToken={(key, value) => setSpacingTokens((current) => ({ ...current, [key]: value }))}
					onChangeRadiusToken={(key, value) => setRadiusTokens((current) => ({ ...current, [key]: value }))}
					onChangeComponentToken={(section, key, value) =>
						setComponentTokens((current) => ({
							...current,
							[section]: {
								...current[section],
								[key]: value,
							},
						}))
					}
					onChangeMarkdown={setSelectedMarkdown}
					onDownload={handleDownload}
					onCopy={handleCopy}
				/>

				<WorkbenchPreviewPanel
					selectedAccent={selectedAccent}
					selectedThemeColor={selectedThemeColor}
					selectedFont={selectedFont}
					selectedProjectType={selectedProjectType}
					selectedFormat={selectedFormat}
					themeLabel={themeLabel}
					projectMeta={projectMeta}
					previewHtml={previewHtml}
					generatedDocument={generatedDocument}
					selectedAccentSoft={selectedAccentSoft}
				/>
			</div>
		</section>
	);
}
