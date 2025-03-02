export const Theme = {
  light: 'light',
  dark: 'dark',
} as const;

export type AppTheme = (typeof Theme)[keyof typeof Theme];
