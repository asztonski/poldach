/** Colour theme of a section or panel – docs/design-system.md#motywy-sekcji. */
export type SectionTheme = 'yellow' | 'blue' | 'white' | 'grey';

const themeClasses: Record<SectionTheme, string> = {
  yellow: 'theme-yellow',
  blue: 'theme-blue',
  white: 'theme-white',
  grey: 'theme-grey',
};

/** Class that sets the theme's colour roles (globals.css). */
export function themeClass(theme: SectionTheme) {
  return themeClasses[theme];
}
