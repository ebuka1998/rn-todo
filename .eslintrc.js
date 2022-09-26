module.exports = {
  root: true,
  extends: '@react-native-community',
  plugins: ['import', 'react', 'jsx-a11y', 'disable'],
  processor: 'disable/disable',
  overrides: [
    {
      files: ['tests/**/*.test.js'],
      settings: {
        'disable/plugins': ['import', 'jsx-a11y'],
      },
    },
    {
      files: ['lib/*.js'],
      settings: {
        'disable/plugins': ['react'],
      },
    },
  ],
};
