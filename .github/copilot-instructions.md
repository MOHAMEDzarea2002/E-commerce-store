# AI Coding Guidelines for my-app

## Architecture Overview
This is a React application built with Vite, featuring a single-page e-commerce style site. Key components include:
- **Header**: Split into `TopHeader` (search, logo, icons) and `BtmHeader` (navigation, categories)
- **Pages**: `Home` (hero slider) and `Accessories` (product grid)
- **Data Flow**: Fetches product data from https://dummyjson.com API in components like `TopHeader` and `Accessories`

Routing is set up with React Router DOM but currently disabled in favor of direct component rendering.

## Development Workflow
- **Start dev server**: `npm run dev` (Vite with HMR)
- **Build**: `npm run build` (outputs to `dist/`)
- **Lint**: `npm run lint` (ESLint with React hooks and refresh rules)
- **Preview build**: `npm run preview`

## Code Conventions
- **Styling**: Use TailwindCSS classes directly in JSX (e.g., `className="bg-blue-500 p-2 rounded-lg"`)
- **Icons**: Import from `react-icons` (e.g., `import { CiSearch } from "react-icons/ci"`)
- **Components**: Place in `src/component/` with subdirs like `header/`, pages in `src/page/`
- **Imports**: Relative paths, e.g., `import Logo from "../../img/logo.png"`
- **State**: Local `useState` hooks; fetch data in `useEffect` (see `TopHeader.jsx` for search filtering example)
- **API Calls**: Direct `fetch` to dummyjson.com endpoints (products, categories)
- **ESLint**: Ignores unused vars starting with uppercase (for components)

## Key Patterns
- **Search Functionality**: Filter products client-side in `TopHeader` using `filter()` and `includes()` on lowercase strings
- **Dropdowns**: Absolute positioned lists with Tailwind (e.g., categories in `BtmHeader`)
- **Sliders**: Swiper component with autoplay and pagination (see `HeroSlider.jsx`)
- **Product Display**: Map over API data to render cards with image, title, description, price

## Dependencies
- React 19 with hooks
- TailwindCSS 4 (via Vite plugin)
- React Router DOM (for future routing)
- Swiper for carousels
- React Icons for UI elements

Reference `package.json` for full deps, `vite.config.js` for build config, and `eslint.config.js` for linting rules.</content>
<parameter name="filePath">c:\Users\ZAREA\Desktop\my-app\.github\copilot-instructions.md