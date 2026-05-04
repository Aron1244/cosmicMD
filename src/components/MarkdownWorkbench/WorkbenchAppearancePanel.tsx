import FontDropdown from './FontDropdown';
import type { ColorPalette, FontOption, PaletteType, ThemeType } from './data';

type WorkbenchAppearancePanelProps = {
	selectedTheme: ThemeType;
	selectedPalette: PaletteType;
	selectedAccent: string;
	selectedFont: FontOption;
	fontDropdownOpen: boolean;
	colorPalettes: Record<PaletteType, ColorPalette>;
	fontOptions: FontOption[];
	onSelectPalette: (paletteKey: PaletteType) => void;
	onSelectAccent: (accent: string) => void;
	onToggleFontDropdown: () => void;
	onSelectFont: (font: FontOption) => void;
};

export default function WorkbenchAppearancePanel({
	selectedTheme,
	selectedPalette,
	selectedAccent,
	selectedFont,
	fontDropdownOpen,
	colorPalettes,
	fontOptions,
	onSelectPalette,
	onSelectAccent,
	onToggleFontDropdown,
	onSelectFont,
}: WorkbenchAppearancePanelProps) {
	return (
		<div className="mt-6 grid gap-4 rounded-3xl border border-current/10 bg-current/5 p-4 lg:grid-cols-[1fr_1fr] lg:items-start">
			<div>
				<p className="text-xs uppercase tracking-[0.3em] text-slate-400">Color palette</p>
				<p className="text-sm font-semibold">Select a pre-built palette or customize colors.</p>
				<div className="mt-3 flex flex-wrap gap-2">
					{(Object.entries(colorPalettes) as [PaletteType, ColorPalette][]).map(([key, palette]) => {
						const active = selectedPalette === key;
						const activeStyles = active
							? {
								borderColor: 'var(--accent)',
								backgroundColor: 'var(--accent-soft)',
								color: selectedTheme === 'dark' ? '#ffffff' : '#0f172a',
							}
							: undefined;
						return (
							<button
								key={key}
								type="button"
								onClick={() => {
									onSelectPalette(key);
								}}
								className="flex items-center gap-2 rounded-full border px-3 py-2 text-sm font-semibold transition"
								style={activeStyles}
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
						<label className="flex h-14 w-14 cursor-pointer items-center justify-center rounded-2xl border border-current/10 bg-current/5 shadow-sm transition">
						<span className="sr-only">Choose accent color</span>
						<input
							type="color"
							value={selectedAccent}
							onChange={(event) => onSelectAccent(event.target.value)}
							className="h-11 w-11 cursor-pointer rounded-lg border-0 bg-transparent p-0"
						/>
					</label>
					<input
						type="text"
						value={selectedAccent}
						onChange={(event) => onSelectAccent(event.target.value)}
							className="h-14 flex-1 rounded-2xl border border-current/10 bg-transparent px-4 font-mono text-sm uppercase tracking-[0.18em] outline-none transition"
					/>
				</div>
			</div>

			<div className="lg:col-span-2">
				<p className="text-xs uppercase tracking-[0.3em] text-slate-400">Google Fonts</p>
				<p className="text-sm font-semibold">Choose your primary typeface from 100+ fonts.</p>
				<FontDropdown
					selectedFont={selectedFont}
					fontDropdownOpen={fontDropdownOpen}
					fontOptions={fontOptions}
					theme={selectedTheme}
					onToggle={onToggleFontDropdown}
					onSelect={onSelectFont}
				/>
			</div>
		</div>
	);
}