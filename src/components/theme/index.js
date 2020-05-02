const baseTheme = {
  fonts: {
    mono: '"SF Mono", "Roboto Mono", Menlo, monospace',
  },
};

const lightTheme = {
  ...baseTheme,
  colors: {
    background: '#eae7dc',
    heading: '#000',
    text: '#3B454E',
    preFormattedText: '#eae7dc',
    link: '#1000EE',
  },
};

const darkTheme = {
  ...baseTheme,
  colors: {
    background: '#1c1c1c',
    heading: '#fff',
    text: '#fff',
    preFormattedText: '#1c1c1c',
    link: '#1ED3C6',
  },
};

export { lightTheme, darkTheme };
