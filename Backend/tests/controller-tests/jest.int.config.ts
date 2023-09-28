export default {
  moduleDirectories: ["node_modules", "src"],
  // moduleNameMapper: {
  //     '@shared-modules/(.*)': ['<rootDir>/../node_modules/saas-platform-shared-modules/$1']
  // },
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/tests/controller-tests/**/*.test.ts?(x)"],
  testPathIgnorePatterns: ["/node_modules/"],
  coverageDirectory: "./coverage",
  globals: { "ts-jest": { diagnostics: false } },
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  reporters: [
    "default",
    [
      "jest-junit",
      {
        outputName: "./jest-report-unit-test.xml",
      },
    ],
  ],
  verbose: true,
  collectCoverage: true,
  coverageThreshold: {
    global: {
      lines: 70,
    },
  },
};
