module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  coveragePathIgnorePatterns: [
    "node_modules/",
    "dist/.*",
    "coverage/",
  ],
  watchPathIgnorePatterns: [
    "node_modules/",
    "coverage/"
  ],
  testMatch: ["<rootDir>/test/**/*.spec.ts"],
  setupFiles: [
    "jest-plugin-context/setup"
  ],
};
