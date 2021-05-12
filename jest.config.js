module.exports = {
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  testMatch: [
    '**/__tests__/**/*.+(ts|tsx|js)',
    '**/?(*.)+(spec|test).+(ts|tsx|js)',
  ],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  moduleFileExtensions: ['js', 'ts'],
  bail: false,
  verbose: true,
  collectCoverage: true,
  coveragePathIgnorePatterns: ['/node_modules/', '/dist/'],
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
};
