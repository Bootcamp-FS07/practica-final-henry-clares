export const variants = {
  success: 'success',
  info: 'info',
  warning: 'warning',
  error: 'error',
} as const;

export type VarianteType = (typeof variants)[keyof typeof variants];
