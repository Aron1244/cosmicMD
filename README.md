**Overview**
- **Cosmic MD**: a small Design System workbench that helps you design and export a DESIGN.md for markdown-first projects.
- Built with Astro + React (islands), TypeScript and Tailwind CSS. Live-edit tokens (colors, spacing, radii, components) and export a ready-to-use DESIGN.md.

**Key Features**
- Interactive token editors (spacing, radius, components)
- Live preview of components and theme
- Exportable DESIGN.md with your chosen tokens and metadata
- Google Fonts selection and accent/theme color controls

**Quick Start**
Prerequisites: Node.js 18+ and npm.

Install and run the dev server:

```bash
npm install
npm run dev
```

Open http://localhost:4321 and use the workbench to edit tokens and generate your DESIGN.md.

**Development**
- Edit the workbench component: [src/components/MarkdownWorkbench.tsx](src/components/MarkdownWorkbench.tsx)
- Shared token definitions: [src/components/MarkdownWorkbench/data.ts](src/components/MarkdownWorkbench/data.ts)
- Page entry: [src/pages/index.astro](src/pages/index.astro)

Build for production:

```bash
npm run build
npm run preview
```

**Exporting**
- Inside the workbench use the Download button to save `DESIGN.md`.
- Use Copy to clipboard for quick copying into your repo.

**Style & Lint**
- Tailwind utilities are used across the app. If you change Tailwind config, re-run the dev server to re-optimize dependencies.

**Contributing**
- Fork, create a feature branch, and open a pull request.
- Keep changes focused and add small commits. If you modify tokens or styles, include screenshots when possible.

**Troubleshooting**
- If the dev server does not start, delete `node_modules` and `package-lock.json` and re-run `npm install`.
- If build fails after Tailwind edits, ensure arbitrary properties follow Tailwind syntax (e.g. `text-(--muted-text)`).

**License**
- See the `LICENSE` file in the repository for license details.

---

If you want, I can also commit this README update and push it to the remote. Tell me if you want a specific commit message.
