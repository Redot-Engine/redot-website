# Agent Guidelines for Redot Engine Website

## Commands

- **Build**: `npm run build`
- **Lint**: `npm run lint` (use `npm run lint:fix` to auto-fix)
- **Format**: `npm run format` (use `npm run format:fix` to auto-fix)
- **Dev**: `npm run dev` (uses Turbopack)
- **Test**: No test framework configured - check for test files before adding

## Code Style

- **TypeScript**: Strict mode enabled, use `@/*` path aliases
- **Imports**: Use absolute imports with `@/` prefix (e.g., `@/components/ui/button`)
- **Formatting**: Prettier with double quotes, semicolons, trailing commas (ES5)
- **Components**: Use shadcn/ui components from `@/components/ui`
- **Styling**: Tailwind CSS with custom design tokens
- **Error Handling**: `@typescript-eslint/no-explicit-any` warns - prefer proper typing
- **Commit Messages**: Use conventional commits (feat, fix, docs, etc.)

## Architecture

- Next.js 15 with App Router
- Sanity CMS for content
- Internationalization with next-intl
- Deploy on Cloudflare with OpenNext
