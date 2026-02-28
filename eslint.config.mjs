import js from '@eslint/js';
import eslintPluginAstro from 'eslint-plugin-astro';
import tseslint from 'typescript-eslint';

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...eslintPluginAstro.configs.recommended,
  {
    ignores: ['node_modules/**', 'dist/**', '.astro/**'],
  },
  {
    rules: { 'astro/no-set-html-directive': 'error' },
  },
];
