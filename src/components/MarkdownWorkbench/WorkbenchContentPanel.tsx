import { useState } from 'react';
import type { ComponentTokens, FontOption, FormatType, ProjectType, RadiusTokens, SpacingTokens, ThemeType } from './data';

type WorkbenchContentPanelProps = {
	selectedTheme: ThemeType;
	selectedProjectType: ProjectType;
	selectedFormat: FormatType;
	selectedFont: FontOption;
	documentName: string;
	documentSummary: string;
	implementationNotes: string;
	spacingTokens: SpacingTokens;
	radiusTokens: RadiusTokens;
	componentTokens: ComponentTokens;
	selectedMarkdown: string;
	projectMeta: { title: string; summary: string; stat: string };
	projectTypes: Array<{ value: ProjectType; label: string; description: string; accent: string }>;
	formatTypes: Array<{ value: FormatType; label: string; description: string }>;
	themeLabel: { label: string };
	copied: boolean;
	onSelectProjectType: (projectType: ProjectType) => void;
	onSelectFormat: (format: FormatType) => void;
	onChangeDocumentName: (value: string) => void;
	onChangeDocumentSummary: (value: string) => void;
	onChangeImplementationNotes: (value: string) => void;
	onChangeSpacingToken: (key: keyof SpacingTokens, value: string) => void;
	onChangeRadiusToken: (key: keyof RadiusTokens, value: string) => void;
	onChangeComponentToken: (section: keyof ComponentTokens, key: string, value: string) => void;
	onChangeMarkdown: (markdown: string) => void;
	onDownload: () => void;
	onCopy: () => void;
};

export default function WorkbenchContentPanel({
	selectedTheme,
	selectedProjectType,
	selectedFormat,
	selectedFont,
	documentName,
	documentSummary,
	implementationNotes,
	spacingTokens,
	radiusTokens,
	componentTokens,
	selectedMarkdown,
	projectMeta,
	projectTypes,
	formatTypes,
	themeLabel,
	copied,
	onSelectProjectType,
	onSelectFormat,
	onChangeDocumentName,
	onChangeDocumentSummary,
	onChangeImplementationNotes,
	onChangeSpacingToken,
	onChangeRadiusToken,
	onChangeComponentToken,
	onChangeMarkdown,
	onDownload,
	onCopy,
}: WorkbenchContentPanelProps) {
	const [openRoundedMenu, setOpenRoundedMenu] = useState<'buttonPrimary' | 'buttonSecondary' | null>(null);

	const buttonPaddingOptions = [
		'8px 16px',
		'10px 20px',
		'12px 24px',
		'14px 28px',
		'16px 32px',
		'18px 36px',
		'20px 40px',
	] as const;

	const roundedOptions = [
		{ label: 'None', value: '{rounded.none}' },
		{ label: 'XS', value: '{rounded.xs}' },
		{ label: 'SM', value: '{rounded.sm}' },
		{ label: 'MD', value: '{rounded.md}' },
		{ label: 'LG', value: '{rounded.lg}' },
		{ label: 'XL', value: '{rounded.xl}' },
		{ label: 'Full', value: '{rounded.full}' },
	] as const;

	const spacingFields = [
		['xxs', 'xxs', 0, 16],
		['xs', 'xs', 0, 24],
		['sm', 'sm', 0, 32],
		['md', 'md', 0, 48],
		['lg', 'lg', 0, 64],
		['xl', 'xl', 0, 96],
		['xxl', 'xxl', 0, 128],
		['section', 'section', 16, 192],
	] as const;

	const radiusFields = [
		['none', 'none', 0, 0],
		['xs', 'xs', 0, 12],
		['sm', 'sm', 0, 16],
		['md', 'md', 0, 24],
		['lg', 'lg', 0, 36],
		['xl', 'xl', 0, 48],
		['full', 'full', 0, 72],
	] as const;

	const readPxValue = (value: string) => {
		const parsed = Number.parseFloat(value.replace('px', '').trim());
		return Number.isFinite(parsed) ? parsed : 0;
	};

	const normalizePxValue = (value: number) => `${Math.max(0, Math.round(value))}px`;

	const parseColorValue = (value: string, fallback: string) => /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(value) ? value : fallback;

	const getPaddingOptionIndex = (value: string) => {
		const index = buttonPaddingOptions.indexOf(value as (typeof buttonPaddingOptions)[number]);
		return index >= 0 ? index : 2;
	};

	const getRoundedOptionValue = (value: string) => {
		const option = roundedOptions.find((item) => item.value === value);
		return option?.value ?? '{rounded.lg}';
	};

	const getRoundedOptionLabel = (value: string) => {
		const option = roundedOptions.find((item) => item.value === getRoundedOptionValue(value));
		return option?.label ?? 'LG';
	};

	const resolveRoundedToken = (value: string) => {
		const match = value.match(/^\{rounded\.(.+)\}$/);
		if (!match) {
			return value;
		}

		const tokenKey = match[1] as keyof RadiusTokens;
		return radiusTokens[tokenKey] ?? value;
	};

	const resolveSpacingToken = (value: string) => {
		const match = value.match(/^\{spacing\.(.+)\}$/);
		if (!match) {
			return value;
		}

		const tokenKey = match[1] as keyof SpacingTokens;
		return spacingTokens[tokenKey] ?? value;
	};

	const getButtonPreviewStyles = (sectionKey: 'buttonPrimary' | 'buttonSecondary') => {
		const section = componentTokens[sectionKey];
		const isPrimary = sectionKey === 'buttonPrimary';
		const padding = section.padding;
		const borderRadius = resolveRoundedToken(section.rounded);
		return {
			minHeight: section.height,
			padding,
			borderRadius,
			backgroundColor: parseColorValue(section.backgroundColor, isPrimary ? 'var(--accent)' : 'rgba(255, 255, 255, 0.05)'),
			color: parseColorValue(section.textColor, isPrimary ? '#020617' : '#f8fafc'),
			border: isPrimary ? '1px solid transparent' : '1px solid rgba(148, 163, 184, 0.22)',
		};
	};

	const getCardPreviewStyles = () => {
		const section = componentTokens.cardDefault;
		return {
			backgroundColor: parseColorValue(section.backgroundColor, 'rgba(255, 255, 255, 0.04)'),
			borderRadius: resolveRoundedToken(section.borderRadius),
			padding: resolveSpacingToken(section.padding),
			border: section.border,
		};
	};

	return (
		<div className="space-y-5 rounded-4xl border border-current/10 bg-current/5 p-5">
			<div className="rounded-3xl border border-current/10 bg-current/5 p-4">
				<p className="text-xs uppercase tracking-[0.3em] text-slate-400">Document details</p>
				<div className="mt-3 grid gap-3">
					<input
						type="text"
						value={documentName}
						onChange={(event) => onChangeDocumentName(event.target.value)}
						className="h-12 w-full rounded-2xl border border-current/10 bg-transparent px-4 text-sm font-semibold outline-none transition"
						style={{ color: selectedTheme === 'dark' ? '#f8fafc' : '#0f172a' }}
					/>
					<textarea
						value={documentSummary}
						onChange={(event) => onChangeDocumentSummary(event.target.value)}
						className="min-h-24 w-full rounded-2xl border border-current/10 bg-transparent px-4 py-3 text-sm outline-none transition"
						style={{ color: selectedTheme === 'dark' ? '#f8fafc' : '#0f172a' }}
					/>
					<textarea
						value={implementationNotes}
						onChange={(event) => onChangeImplementationNotes(event.target.value)}
						className="min-h-28 w-full rounded-2xl border border-current/10 bg-transparent px-4 py-3 text-sm outline-none transition"
						style={{ color: selectedTheme === 'dark' ? '#f8fafc' : '#0f172a' }}
					/>
				</div>
			</div>

			<div className="rounded-3xl border border-current/10 bg-current/5 p-4">
				<p className="text-xs uppercase tracking-[0.3em] text-slate-400">Token blocks</p>
				<div className="mt-4 space-y-4">
					<div>
						<p className="mb-2 text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-slate-400">Spacing</p>
						<div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
							{spacingFields.map(([key, label, min, max]) => {
								const value = readPxValue(spacingTokens[key]);
								const percent = max === min ? 0 : ((value - min) / (max - min)) * 100;
								return (
									<div key={key} className="overflow-hidden rounded-2xl border border-current/10 bg-black/5 p-3">
										<div className="flex items-center justify-between gap-3">
											<span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">{label}</span>
											<span className="rounded-full border border-current/10 bg-current/5 px-2 py-1 font-mono text-[11px]">{spacingTokens[key]}</span>
										</div>
										<div className="mt-3 space-y-3">
											<input
												type="range"
												min={String(min)}
												max={String(max)}
												value={String(value)}
												onChange={(event) => onChangeSpacingToken(key, normalizePxValue(Number(event.target.value)))}
												className="h-2 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-(--accent)"
											/>
											<div className="space-y-2 rounded-xl border border-current/10 bg-current/5 p-3">
												<div className="text-[11px] uppercase tracking-[0.2em] text-slate-400">Preview</div>
													<div className="flex items-center gap-3 overflow-hidden rounded-xl border border-dashed border-current/10 p-3">
														<div className="h-3 w-3 rounded-full" style={{ backgroundColor: 'var(--accent)' }}></div>
														<div className="rounded-full" style={{ width: `${Math.max(12, value)}px`, height: '10px', backgroundColor: 'var(--accent)' }}></div>
													<div className="text-xs text-slate-400">{percent > 0 ? `${Math.round(percent)}%` : '0%'}</div>
												</div>
											</div>
											<label className="grid gap-1">
												<span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Value</span>
												<input
													type="text"
													value={spacingTokens[key]}
													onChange={(event) => onChangeSpacingToken(key, event.target.value)}
													className="block h-11 w-full min-w-0 box-border rounded-2xl border border-current/10 bg-transparent px-4 font-mono text-sm outline-none transition"
													style={{ color: selectedTheme === 'dark' ? '#f8fafc' : '#0f172a' }}
												/>
											</label>
										</div>
									</div>
								);
							})}
						</div>
					</div>

					<div>
						<p className="mb-2 text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-slate-400">Radius</p>
						<div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
							{radiusFields.map(([key, label, min, max]) => {
								const value = readPxValue(radiusTokens[key]);
								const previewRadius = key === 'full' ? '9999px' : `${Math.max(0, Math.min(max, value))}px`;
								return (
									<div key={key} className="overflow-hidden rounded-2xl border border-current/10 bg-black/5 p-3">
										<div className="flex items-center justify-between gap-3">
											<span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">{label}</span>
											<span className="rounded-full border border-current/10 bg-current/5 px-2 py-1 font-mono text-[11px]">{radiusTokens[key]}</span>
										</div>
										<div className="mt-3 space-y-3">
											<input
												type="range"
												min={String(min)}
												max={String(max)}
												value={String(value)}
												onChange={(event) => onChangeRadiusToken(key, normalizePxValue(Number(event.target.value)))}
												className="h-2 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-(--accent)"
											/>
											<div className="space-y-2 rounded-xl border border-current/10 bg-current/5 p-3">
												<div className="text-[11px] uppercase tracking-[0.2em] text-slate-400">Preview</div>
													<div className="flex items-center justify-center rounded-xl border border-dashed border-current/10 p-4">
														<div className="h-14 w-14" style={{ borderRadius: previewRadius, backgroundColor: 'var(--accent)' }}></div>
												</div>
											</div>
											<label className="grid gap-1">
												<span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Value</span>
												<input
													type="text"
													value={radiusTokens[key]}
													onChange={(event) => onChangeRadiusToken(key, event.target.value)}
													className="block h-11 w-full min-w-0 box-border rounded-2xl border border-current/10 bg-transparent px-4 font-mono text-sm outline-none transition"
													style={{ color: selectedTheme === 'dark' ? '#f8fafc' : '#0f172a' }}
												/>
											</label>
										</div>
									</div>
								);
							})}
						</div>
					</div>

					<div>
						<p className="mb-2 text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-slate-400">Components</p>
						<div className="space-y-4">
							{(
								[
									['buttonPrimary', 'Button Primary'],
									['buttonSecondary', 'Button Secondary'],
									['cardDefault', 'Card Default'],
								] as const
							).map(([sectionKey, sectionLabel]) => {
								const section = componentTokens[sectionKey];
								const isButtonSection = sectionKey === 'buttonPrimary' || sectionKey === 'buttonSecondary';
								const isCardSection = sectionKey === 'cardDefault';
								return (
									<div key={sectionKey} className="rounded-2xl border border-current/10 bg-black/5 p-4">
										<p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">{sectionLabel}</p>
										{isButtonSection ? (
											<div className="space-y-4">
												<div className="grid gap-3 sm:grid-cols-2">
													<label className="grid gap-2">
														<span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">backgroundColor</span>
														<div className="flex items-center gap-3 rounded-2xl border border-current/10 bg-current/5 px-3 py-2">
															<input
																type="color"
																value={parseColorValue(section.backgroundColor, sectionKey === 'buttonPrimary' ? '#22d3ee' : '#1f2937')}
																onChange={(event) => onChangeComponentToken(sectionKey, 'backgroundColor', event.target.value)}
																className="h-10 w-12 cursor-pointer rounded-xl border border-current/10 bg-transparent p-1"
															/>
															<span className="min-w-0 flex-1 font-mono text-sm">{section.backgroundColor}</span>
														</div>
													</label>
													<label className="grid gap-2">
														<span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">textColor</span>
														<div className="flex items-center gap-3 rounded-2xl border border-current/10 bg-current/5 px-3 py-2">
															<input
																type="color"
																value={parseColorValue(section.textColor, sectionKey === 'buttonPrimary' ? '#020617' : '#f8fafc')}
																onChange={(event) => onChangeComponentToken(sectionKey, 'textColor', event.target.value)}
																className="h-10 w-12 cursor-pointer rounded-xl border border-current/10 bg-transparent p-1"
															/>
															<span className="min-w-0 flex-1 font-mono text-sm">{section.textColor}</span>
														</div>
													</label>
												</div>

												<div className="grid gap-3 sm:grid-cols-2">
													<label className="grid gap-2">
														<span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">rounded</span>
														<div className="relative">
															<button
																type="button"
																onClick={() => setOpenRoundedMenu((current) => (current === sectionKey ? null : sectionKey))}
																className="flex h-11 w-full items-center justify-between gap-3 rounded-2xl border border-current/10 bg-current/5 px-4 text-sm transition hover:bg-current/10"
																style={{ color: selectedTheme === 'dark' ? '#f8fafc' : '#0f172a' }}
															>
																<span>{getRoundedOptionLabel(section.rounded)}</span>
																<span className="text-xs uppercase tracking-[0.2em] text-slate-400">Menu</span>
															</button>
															{openRoundedMenu === sectionKey ? (
																<div className="absolute left-0 right-0 top-[calc(100%+0.5rem)] z-20 overflow-hidden rounded-2xl border border-current/10 bg-[#0b1120] shadow-2xl shadow-slate-950/40">
																	{roundedOptions.map((option) => {
																		const active = option.value === getRoundedOptionValue(section.rounded);
																		return (
																			<button
																				key={option.value}
																				type="button"
																				onClick={() => {
																					onChangeComponentToken(sectionKey, 'rounded', option.value);
																					setOpenRoundedMenu(null);
																				}}
																				className="flex w-full items-center justify-between px-4 py-3 text-left text-sm transition hover:bg-white/8"
																				style={{ color: active ? 'var(--accent)' : '#e2e8f0' }}
																			>
																				<span>{option.label}</span>
																				<span className="font-mono text-[11px] opacity-75">{option.value}</span>
																			</button>
																		);
																	})}
															</div>
														) : null}
														</div>
													</label>
													<label className="grid gap-2">
														<span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">height</span>
														<div className="rounded-2xl border border-current/10 bg-current/5 p-3">
															<div className="mb-2 flex items-center justify-between gap-3">
																<span className="font-mono text-[11px] text-slate-400">{section.height ?? '44px'}</span>
																<span className="text-[11px] uppercase tracking-[0.2em] text-slate-400">Preview height</span>
															</div>
															<input
																type="range"
																min="36"
																max="60"
																step="1"
																value={readPxValue(section.height ?? '44px')}
																onChange={(event) => onChangeComponentToken(sectionKey, 'height', normalizePxValue(Number(event.target.value)))}
																className="h-2 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-(--accent)"
															/>
														</div>
													</label>
												</div>

												<div className="rounded-2xl border border-current/10 bg-current/5 p-3">
													<div className="mb-2 text-[11px] uppercase tracking-[0.2em] text-slate-400">Padding</div>
													<div className="space-y-3 rounded-xl border border-dashed border-current/10 p-3">
														<input
															type="range"
															min="0"
															max={String(buttonPaddingOptions.length - 1)}
															step="1"
															value={String(getPaddingOptionIndex(section.padding))}
															onChange={(event) => onChangeComponentToken(sectionKey, 'padding', buttonPaddingOptions[Number(event.target.value)])}
															className="h-2 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-(--accent)"
														/>
														<div className="flex items-center justify-between gap-3 text-[11px] text-slate-400">
															<span>{section.padding}</span>
															<span>{buttonPaddingOptions[getPaddingOptionIndex(section.padding)]}</span>
														</div>
													</div>
												</div>

												<div className="mt-4 space-y-2 rounded-2xl border border-current/10 bg-current/5 p-3">
													<div className="text-[11px] uppercase tracking-[0.2em] text-slate-400">Preview</div>
													<div className="flex flex-col gap-3 sm:flex-row">
														<button type="button" className="flex items-center justify-center gap-2 font-semibold transition" style={getButtonPreviewStyles(sectionKey)}>
															<span>{sectionKey === 'buttonPrimary' ? 'Primary action' : 'Secondary action'}</span>
														</button>
														<div className="flex min-w-0 flex-1 items-center rounded-2xl border border-dashed border-current/10 px-4 py-3 text-xs text-slate-400">
															{sectionKey === 'buttonPrimary'
																? 'Accent-driven CTA with the configured padding, height and radius.'
																: 'Neutral button with the same geometry to compare contrast and weight.'}
														</div>
													</div>
												</div>
											</div>
										) : isCardSection ? (
											<div className="space-y-4">
												<div className="grid gap-3 sm:grid-cols-2">
													<label className="grid gap-2">
														<span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">backgroundColor</span>
														<div className="flex items-center gap-3 rounded-2xl border border-current/10 bg-current/5 px-3 py-2">
															<input
																type="color"
																value={parseColorValue(section.backgroundColor, '#111827')}
																onChange={(event) => onChangeComponentToken(sectionKey, 'backgroundColor', event.target.value)}
																className="h-10 w-12 cursor-pointer rounded-xl border border-current/10 bg-transparent p-1"
															/>
															<span className="min-w-0 flex-1 font-mono text-sm">{section.backgroundColor}</span>
														</div>
													</label>
													<label className="grid gap-2">
														<span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">border</span>
														<input
															type="text"
															value={section.border}
															onChange={(event) => onChangeComponentToken(sectionKey, 'border', event.target.value)}
															className="h-11 rounded-2xl border border-current/10 bg-transparent px-4 font-mono text-sm outline-none transition"
															style={{ color: selectedTheme === 'dark' ? '#f8fafc' : '#0f172a' }}
														/>
													</label>
												</div>

												<div className="grid gap-3 sm:grid-cols-2">
													<label className="grid gap-2">
														<span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">borderRadius</span>
														<div className="relative">
															<button
																type="button"
																onClick={() => setOpenRoundedMenu((current) => (current === sectionKey ? null : sectionKey))}
																className="flex h-11 w-full items-center justify-between gap-3 rounded-2xl border border-current/10 bg-current/5 px-4 text-sm transition hover:bg-current/10"
																style={{ color: selectedTheme === 'dark' ? '#f8fafc' : '#0f172a' }}
															>
																<span>{getRoundedOptionLabel(section.borderRadius)}</span>
																<span className="text-xs uppercase tracking-[0.2em] text-slate-400">Menu</span>
															</button>
															{openRoundedMenu === sectionKey ? (
																<div className="absolute left-0 right-0 top-[calc(100%+0.5rem)] z-20 overflow-hidden rounded-2xl border border-current/10 bg-[#0b1120] shadow-2xl shadow-slate-950/40">
																	{roundedOptions.map((option) => {
																		const active = option.value === getRoundedOptionValue(section.borderRadius);
																		return (
																			<button
																				key={option.value}
																				type="button"
																				onClick={() => {
																					onChangeComponentToken(sectionKey, 'borderRadius', option.value);
																					setOpenRoundedMenu(null);
																				}}
																				className="flex w-full items-center justify-between px-4 py-3 text-left text-sm transition hover:bg-white/8"
																				style={{ color: active ? 'var(--accent)' : '#e2e8f0' }}
																			>
																				<span>{option.label}</span>
																				<span className="font-mono text-[11px] opacity-75">{option.value}</span>
																			</button>
																		);
																	})}
															</div>
														) : null}
														</div>
													</label>
													<label className="grid gap-2">
														<span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">padding</span>
														<div className="rounded-2xl border border-current/10 bg-current/5 p-3">
															<div className="mb-2 flex items-center justify-between gap-3">
																<span className="font-mono text-[11px] text-slate-400">{section.padding}</span>
																<span className="text-[11px] uppercase tracking-[0.2em] text-slate-400">Scale</span>
															</div>
															<input
																type="range"
																min="0"
																max={String(buttonPaddingOptions.length - 1)}
																step="1"
																value={String(getPaddingOptionIndex(section.padding))}
																onChange={(event) => onChangeComponentToken(sectionKey, 'padding', buttonPaddingOptions[Number(event.target.value)])}
																className="h-2 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-(--accent)"
															/>
														</div>
													</label>
												</div>

												<div className="mt-4 space-y-2 rounded-2xl border border-current/10 bg-current/5 p-3">
													<div className="text-[11px] uppercase tracking-[0.2em] text-slate-400">Preview</div>
													<div className="rounded-2xl border border-dashed border-current/10 p-4">
														<div className="space-y-3" style={getCardPreviewStyles()}>
															<div className="flex items-start justify-between gap-3">
																<div>
																	<p className="text-sm font-semibold text-white">Card title</p>
																	<p className="mt-1 text-xs leading-5 text-slate-300">This preview reflects the card token settings.</p>
																</div>
																<span className="rounded-full px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ backgroundColor: 'var(--accent-soft)', color: 'var(--accent)' }}>Live</span>
															</div>
															<div className="flex flex-wrap gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-300">
																<span className="rounded-full border border-current/10 bg-white/5 px-3 py-1">Padding {resolveSpacingToken(section.padding)}</span>
																<span className="rounded-full border border-current/10 bg-white/5 px-3 py-1">Radius {getRoundedOptionLabel(section.borderRadius)}</span>
															</div>
														</div>
													</div>
												</div>
											</div>
										) : (
											<div className="grid gap-3 sm:grid-cols-2">
												{Object.entries(section).map(([propertyKey, value]) => (
													<label key={propertyKey} className="grid gap-1">
														<span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">{propertyKey}</span>
														<input
															type="text"
															value={value}
															onChange={(event) => onChangeComponentToken(sectionKey, propertyKey, event.target.value)}
															className="h-11 rounded-2xl border border-current/10 bg-transparent px-4 font-mono text-sm outline-none transition"
															style={{ color: selectedTheme === 'dark' ? '#f8fafc' : '#0f172a' }}
														/>
													</label>
												))}
											</div>
										)}
									</div>
								);
							})}
						</div>
					</div>
				</div>
			</div>

			<div>
				<p className="text-xs uppercase tracking-[0.3em] text-slate-400">Project type</p>
				<div className="mt-3 flex flex-wrap gap-3">
					{projectTypes.map((projectType) => {
						const active = selectedProjectType === projectType.value;
						const activeStyles = active
							? {
								borderColor: 'var(--accent)',
								backgroundColor: 'var(--accent-soft)',
								color: selectedTheme === 'dark' ? '#ffffff' : '#0f172a',
							}
							: undefined;
						return (
							<button
								key={projectType.value}
								type="button"
								onClick={() => onSelectProjectType(projectType.value)}
								className="flex flex-1 items-center gap-3 rounded-2xl border p-4 text-left transition"
								style={{ minHeight: '84px', minWidth: '200px', ...activeStyles }}
							>
								<span className="h-10 w-10 shrink-0 rounded-2xl bg-current/20" style={{ backgroundImage: 'linear-gradient(135deg, rgba(34, 211, 238, 0.95), rgba(14, 165, 233, 0.95))' }}></span>
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
						const activeStyles = active
							? {
								borderColor: 'var(--accent)',
								backgroundColor: 'var(--accent-soft)',
								color: selectedTheme === 'dark' ? '#ffffff' : '#0f172a',
							}
							: undefined;
						return (
							<button
								key={formatType.value}
								type="button"
								onClick={() => onSelectFormat(formatType.value)}
								className="flex-1 rounded-2xl border px-4 py-3 text-left transition"
								style={{ minHeight: '78px', minWidth: '180px', ...activeStyles }}
							>
								<p className="text-sm font-semibold">{formatType.label}</p>
								<p className="mt-1 text-xs uppercase tracking-[0.18em] opacity-75">{formatType.description}</p>
							</button>
						);
					})}
				</div>
			</div>

			<div className="rounded-3xl border border-current/10 bg-current/5 p-4">
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
					<span className="rounded-full border border-current/10 bg-current/5 px-3 py-1">{selectedFormat}</span>
					<span className="rounded-full border border-current/10 bg-current/5 px-3 py-1">{selectedFont.label}</span>
				</div>
			</div>

			<div>
				<p className="text-xs uppercase tracking-[0.3em] text-slate-400">Markdown editor</p>
				<textarea
					value={selectedMarkdown}
					onChange={(event) => onChangeMarkdown(event.target.value)}
					className="mt-3 w-full rounded-3xl border border-current/10 bg-current/5 p-5 font-mono text-sm leading-6 outline-none transition"
					style={{ minHeight: '360px', color: selectedTheme === 'dark' ? '#e2e8f0' : '#0f172a' }}
				/>
				<div className="mt-4 flex flex-wrap gap-3">
					<button type="button" onClick={onDownload} className="rounded-full px-5 py-3 text-sm font-semibold text-slate-950 transition hover:opacity-90" style={{ backgroundColor: 'var(--accent)' }}>
						Generate and download design.md
					</button>
					<button type="button" onClick={onCopy} className="rounded-full border border-current/15 bg-transparent px-5 py-3 text-sm font-semibold transition">
						{copied ? 'Copied' : 'Copy generated markdown'}
					</button>
				</div>
			</div>
		</div>
	);
}