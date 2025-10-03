# Our Anniversary Photo Album - AI Copilot Instructions

## Project Overview
Anniversary photo album web app built with React 19, TypeScript, and Vite. **Key architectural decision**: This project migrates from Stitch design files (`.stitch` in `designs/` folder) to React components, preserving exact styling and layout.

## Essential Architecture Patterns

### Stitch Migration Workflow
- **Source**: `.stitch` files in `designs/` contain HTML/CSS/JS prototypes
- **Target**: React TSX components in `src/`
- **Critical Rule**: Preserve Tailwind classes exactly as-is during migration
- **Process**: Extract HTML structure → Convert to JSX → Maintain styling fidelity

### Color System & Theming
Custom color tokens in `tailwind.config.js` support light/dark modes:
```js
colors: {
  "primary": "#ee2b8c",           // Pink accent
  "background-light": "#f8f6f7",  // Light mode bg
  "background-dark": "#221019",   // Dark mode bg
  "content-light": "#221019",     // Light mode text
  "content-dark": "#f8f6f7",      // Dark mode text
  "subtle-light": "#e4dbe0",      // Light borders/subtle
  "subtle-dark": "#3c2933"        // Dark borders/subtle
}
```

### Mobile-First UI Patterns
- **Photo Cards**: `aspect-[9/16]` ratio with `bg-cover` backgrounds
- **Horizontal Scrolling**: `snap-x snap-mandatory` with `overflow-x-auto`
- **Sticky Navigation**: `sticky top-0` with backdrop blur effects
- **Viewport Units**: Use `85vw` for card widths, `100dvh` for full height

## Development Workflow

### Build Commands
- `npm run dev` - Start Vite dev server (auto-reload enabled)
- `npm run build` - TypeScript compilation + Vite build
- `npm run preview` - Preview production build
- **Important**: Never run `npm install` unless `package.json` changes

### File Structure Conventions
```
src/
├── main.tsx              # React Router setup, single route
├── AnniversaryPhotoAlbum.tsx  # Main component (migrated from Stitch)
├── HomePage.tsx          # Placeholder (remove after migration)
├── components/
│   └── ImportFromStitchPlaceholder.tsx  # Temporary component
└── index.css             # Minimal Tailwind imports
```

### Component Patterns
- **Naming**: PascalCase for components (`AnniversaryPhotoAlbum.tsx`)
- **Exports**: Default exports for all components
- **Props**: Use TypeScript interfaces, prefer `React.FC` typing
- **Data**: Inline arrays acceptable for small datasets (see `photos` array)

## External Dependencies

### Font Integration
Add Google Fonts directly to `index.html` (not via CSS imports):
```html
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;700;800&display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet"/>
```

### Router Configuration
- Single route pattern in `main.tsx`: `<Route path="/" element={<Component />} />`
- Expand routes when migrating multi-screen Stitch designs
- Use `BrowserRouter` for client-side routing

## Critical Migration Guidelines

### From Stitch to React
1. **Preserve Styling**: Copy Tailwind classes exactly, including responsive variants
2. **Extract Data**: Convert hardcoded content to data arrays/objects
3. **Maintain Layout**: Keep mobile-first responsive behavior
4. **Icons**: Use Material Symbols with exact class names from Stitch

### Component Refactoring
- Replace `ImportFromStitchPlaceholder` after successful migration
- Remove `HomePage.tsx` when no longer needed
- Maintain component file structure under `src/components/`

## TypeScript Configuration
- **Strict Mode**: Enabled with comprehensive linting rules
- **Bundler Resolution**: Modern module resolution for Vite
- **JSX**: React 17+ automatic runtime (`react-jsx`)
- **File Extensions**: Import TypeScript files with `.tsx` extension

This project prioritizes design fidelity and rapid prototyping over complex state management or testing infrastructure.