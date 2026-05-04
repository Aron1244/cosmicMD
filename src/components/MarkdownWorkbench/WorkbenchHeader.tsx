import type { ThemeType } from './data';

type WorkbenchHeaderProps = {
	selectedTheme: ThemeType;
	themeModes: Array<{ value: ThemeType; label: string; description: string }>;
	onSelectTheme: (theme: ThemeType) => void;
};

export default function WorkbenchHeader({ selectedTheme, themeModes, onSelectTheme }: WorkbenchHeaderProps) {
	return (
		<div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
			<div className="max-w-3xl space-y-2">
				<p className="text-xs font-semibold uppercase tracking-[0.35em]" style={{ color: 'var(--accent)' }}>
					Design system generator
				</p>
				<h2 className="text-3xl font-black tracking-tight sm:text-4xl">Create a custom DESIGN.md for your project</h2>
				<p className="max-w-2xl text-sm leading-6" style={{ color: 'var(--muted-text)' }}>
					Personalize your design system: choose colors, typography, spacing, and components. Download a ready-to-use DESIGN.md file with everything you selected.
				</p>
			</div>
			<div className="flex flex-wrap gap-2">
				{themeModes.map((themeMode) => {
					const active = selectedTheme === themeMode.value;
					const activeStyles = active
						? {
							borderColor: 'var(--accent)',
							backgroundColor: 'var(--accent-soft)',
							color: selectedTheme === 'dark' ? '#ffffff' : '#0f172a',
						}
						: undefined;
					return (
						<button
							key={themeMode.value}
							type="button"
							onClick={() => onSelectTheme(themeMode.value)}
							className="rounded-full border px-4 py-2 text-sm font-semibold transition"
							style={activeStyles}
						>
							{themeMode.label}
						</button>
					);
				})}
			</div>
		</div>
	);
}