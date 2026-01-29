module.exports = {
  roots: ['<rootDir>'],
  clearMocks: true,
  resetMocks: true,
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    'pages/**/*.{ts,tsx}',
    '!**/*.d.ts',
  ],
  coveragePathIgnorePatterns: [
    'node_modules',
    '<rootDir>/src/theme/',
    '<rootDir>/pages/_document.tsx',
    '<rootDir>/src/setupTests.ts',
  ],
  coverageDirectory: 'coverage',
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '.+\\.(ts|tsx)$': ['ts-jest', { tsconfig: { jsx: 'react-jsx' } }],
    '.+\\.(svg|css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$':
      'jest-transform-stub',
  },
  moduleNameMapper: {
    '^components/(.*)$': '<rootDir>/src/components/$1',
    '^modules/(.*)$': '<rootDir>/src/modules/$1',
    '^store$': '<rootDir>/src/store/index.ts',
    '^store/(.*)$': '<rootDir>/src/store/$1',
    '^theme/(.*)$': '<rootDir>/src/theme/$1',
  },
  modulePaths: ['<rootDir>'],
};
