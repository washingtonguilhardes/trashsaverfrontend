module.exports = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  moduleNameMapper: {
    '@src/(.*)': '<rootDir>/src/$1',
    '\\.(scss|sass|css)$': 'identity-obj-proxy',
    preset: 'ts-jest',
  },
  testEnvironment: 'jsdom',
  verbose: true,
};
