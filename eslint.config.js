import js from '@eslint/js';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import prettier from 'eslint-config-prettier';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  // design/ – design-tool exports kept as delivered (design/README.md)
  globalIgnores(['.next/**', 'out/**', 'node_modules/**', 'next-env.d.ts', 'design/**']),
  js.configs.recommended,
  ...nextVitals,
  ...nextTs,
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/consistent-type-imports': 'error',
    },
  },
  // Node scripts (scripts/) – the globals of Node
  {
    files: ['scripts/**/*.mjs'],
    languageOptions: { globals: { process: 'readonly', console: 'readonly', Buffer: 'readonly' } },
  },
  // Must stay last – disables rules that conflict with Prettier
  prettier,
]);
