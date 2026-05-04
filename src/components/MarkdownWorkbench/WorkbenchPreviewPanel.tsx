import type { CSSProperties } from 'react';
import type { FontOption, FormatType, ProjectType } from './data';

type WorkbenchPreviewPanelProps = {
	selectedAccent: string;
	selectedFont: FontOption;
	selectedProjectType: ProjectType;
	selectedFormat: FormatType;
	themeLabel: { label: string };
	projectMeta: { title: string };
	previewHtml: string;
	generatedDocument: string;
	selectedAccentSoft: string;
};

export default function WorkbenchPreviewPanel({
	selectedAccent,
	selectedFont,
	selectedProjectType,
	selectedFormat,
	themeLabel,
	projectMeta,
	previewHtml,
	generatedDocument,
	selectedAccentSoft,
}: WorkbenchPreviewPanelProps) {
	return (
		<div className="rounded-4xl border border-current/10 bg-current/5 p-5">
			<div className="flex items-center justify-between gap-4">
				<div>
					<p className="text-xs uppercase tracking-[0.35em] text-(--accent)">Live preview</p>
					<h3 className="mt-2 text-2xl font-black sm:text-3xl">{projectMeta.title}</h3>
				</div>
				<div className="rounded-full border border-current/10 px-3 py-1 text-xs font-semibold">{selectedFormat}</div>
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
				className="mt-5 max-w-none rounded-3xl border border-current/10 bg-current/5 p-6"
				style={{
					fontFamily: selectedFont.stack,
					'--accent-color': selectedAccent,
					'--accent-soft': selectedAccentSoft,
				} as CSSProperties}
			>
				<div
				className="[&_h1]:mb-4 [&_h1]:text-4xl [&_h1]:font-black [&_h1]:tracking-tight [&_h1]:text-current [&_h2]:mb-3 [&_h2]:mt-8 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-current [&_h3]:mb-2 [&_h3]:mt-6 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-current [&_p]:mb-4 [&_p]:text-base [&_p]:leading-7 [&_p]:text-current/85 [&_ul]:mb-4 [&_ul]:ml-6 [&_ul]:list-disc [&_li]:mb-2 [&_blockquote]:my-6 [&_blockquote]:border-l-4 [&_blockquote]:border-(--accent-color) [&_blockquote]:bg-(--accent-soft) [&_blockquote]:px-4 [&_blockquote]:py-3 [&_blockquote]:text-current [&_pre]:my-6 [&_pre]:overflow-x-auto [&_pre]:rounded-2xl [&_pre]:border [&_pre]:border-current/10 [&_pre]:bg-black/10 [&_pre]:p-4 [&_pre]:font-mono [&_pre]:text-sm [&_code]:rounded [&_code]:bg-black/10 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_a]:font-semibold [&_a]:text-(--accent-color) [&_hr]:my-8 [&_hr]:border-current/10"
					dangerouslySetInnerHTML={{ __html: previewHtml }}
				/>
			</article>

			<div className="mt-4 rounded-2xl border border-current/10 bg-current/5 p-4 font-mono text-xs leading-6">
				<p className="mb-2 uppercase tracking-[0.28em] text-slate-400">Generated file</p>
				<pre className="overflow-x-auto whitespace-pre-wrap">{generatedDocument}</pre>
			</div>
		</div>
	);
}