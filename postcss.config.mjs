// Tailwind CSS v4 is CSS-first: design tokens live in `@theme` inside the
// stylesheet, and FacilityPass deliberately creates no `tailwind.config.*` file.
// (v4 no longer auto-detects a JS config; a legacy one can still be loaded with
// `@config`, and we decline it.)
//
// The plugin key is the package name, not 'tailwindcss' as it was in v3.
const config = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};

export default config;
