// https://facebook.github.io/jest/docs/en/configuration.html
module.exports = {
  automock: false,
  browser: false,
  bail: false,
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!**/node_modules/**',
    '!**/vendor/**',
  ],
  coverageDirectory: '<rootDir>/coverage',
  globals: {
    __DEV__: true,
  },
  moduleFileExtensions: ['js', 'json', 'jsx', 'node'],
  moduleNameMapper: {
    '\\.(css|less|styl|scss|sass|sss)$': 'identity-obj-proxy',
  },
  transform: {
    '\\.(js|jsx)$': '<rootDir>/node_modules/babel-jest',
    '^(?!.*\\.(js|jsx|json|css|less|styl|scss|sass|sss)$)':
      '<rootDir>/tools/lib/fileTransformer.js',
  },
  verbose: true,
};
