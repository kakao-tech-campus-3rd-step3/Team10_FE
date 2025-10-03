export const theme = {
  colors: {
    primary: '#92AD47', // green
    secondary: '#769F43', // new green
    tertiary: '#F8CC39', // yellow
    text: '#000000', // black
    background: '#FFFFFF', // white
    inactive: '#fafafa', // inactive
    line: '#878181', // line gray
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
} as const;

export type AppTheme = typeof theme;
