export const theme = {
  colors: {
    primary: '#92AD47', // green
    secondary: '#B47101', // brown
    tertiary: '#F8CC39', // yellow
    text: '#000000', // black
    background: '#FAF2E2', // beige
  },
  spacing: (factor: number) => `${4 * factor}px`,
  font: {
    bold: {
      fontFamily: 'pretendard',
      fontWeight: 700,
    },
    regular: {
      fontFamily: 'pretendard',
      fontWeight: 400,
    },
    light: {
      fontFamily: 'pretendard',
      fontWeight: 300,
    },
  },
} as const

export type AppTheme = typeof theme

