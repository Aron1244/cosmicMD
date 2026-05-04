import type { FontOption, ThemeType } from './data';

type FontDropdownProps = {
	selectedFont: FontOption;
	fontDropdownOpen: boolean;
	fontOptions: FontOption[];
	theme: ThemeType;
	onToggle: () => void;
	onSelect: (font: FontOption) => void;
};

export default function FontDropdown({ selectedFont, fontDropdownOpen, fontOptions, theme, onToggle, onSelect }: FontDropdownProps) {
	return (
		<div className="relative mt-3" data-font-dropdown>
			<button
				type="button"
				onClick={onToggle}
				className="w-full rounded-2xl border border-(--border-subtle) bg-current/5 px-4 py-3 text-left font-semibold outline-none transition"
				style={{ color: theme === 'dark' ? '#f8fafc' : '#0f172a' }}
			>
				<div className="flex items-center justify-between">
					<span>{selectedFont.label}</span>
					<span className={`text-xs transition ${fontDropdownOpen ? 'rotate-180' : ''}`}>▼</span>
				</div>
			</button>

			{fontDropdownOpen && (
				<div
					className="absolute left-0 right-0 top-full z-50 mt-2 max-h-64 overflow-y-auto rounded-2xl border border-(--border-subtle) shadow-xl"
					style={{
						background: theme === 'dark' ? '#020617' : '#f8fafc',
						borderColor: theme === 'dark' ? 'rgba(148, 163, 184, 0.18)' : 'rgba(15, 23, 42, 0.12)',
					}}
				>
					{fontOptions.map((font) => (
						<button
							key={font.name}
							type="button"
							onClick={() => onSelect(font)}
							className="w-full border-l-4 px-4 py-3 text-left transition hover:bg-current/10"
							style={{
								borderLeftColor: selectedFont.name === font.name ? 'var(--accent)' : 'transparent',
								color: theme === 'dark' ? '#f8fafc' : '#0f172a',
							}}
						>
							{font.label}
						</button>
					))}
				</div>
			)}
		</div>
	);
}