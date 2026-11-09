/** Colour theme of a section or panel – docs/design-system.md#motywy-sekcji. */
export type SectionTheme = 'yellow' | 'blue' | 'white' | 'cream';

const themeClasses: Record<SectionTheme, string> = {
  yellow: 'theme-yellow',
  blue: 'theme-blue',
  white: 'theme-white',
  cream: 'theme-cream',
};

/** Class that sets the theme's colour roles (globals.css). */
export function themeClass(theme: SectionTheme) {
  return themeClasses[theme];
}
