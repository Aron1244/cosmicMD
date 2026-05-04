import type { FontOption, FormatType, ProjectType, ThemeType } from './data';

type WorkbenchContentPanelProps = {
	selectedTheme: ThemeType;
	selectedProjectType: ProjectType;
	selectedFormat: FormatType;
	selectedFont: FontOption;
	selectedMarkdown: string;
	projectMeta: { title: string; summary: string; stat: string };
	projectTypes: Array<{ value: ProjectType; label: string; description: string; accent: string }>;
	formatTypes: Array<{ value: FormatType; label: string; description: string }>;
	themeLabel: { label: string };
	copied: boolean;
	onSelectProjectType: (projectType: ProjectType) => void;
	onSelectFormat: (format: FormatType) => void;
	onChangeMarkdown: (markdown: string) => void;
	onDownload: () => void;
	onCopy: () => void;
};

export default function WorkbenchContentPanel({
	selectedTheme,
	selectedProjectType,
	selectedFormat,
	selectedFont,
	selectedMarkdown,
	projectMeta,
	projectTypes,
	formatTypes,
	themeLabel,
	copied,
	onSelectProjectType,
	onSelectFormat,
	onChangeMarkdown,
	onDownload,
	onCopy,
}: WorkbenchContentPanelProps) {
	return (
		<div className="space-y-5 rounded-4xl border border-current/10 bg-current/5 p-5">
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