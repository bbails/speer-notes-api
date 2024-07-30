/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  testEnvironment: "node",
  preset: "ts-jest",
  testMatch: ["**/**/*.test.ts"],
  verbose: true,
  forceExit: true,
  clearMocks: true,
  //transform: {
  //  "^.+.tsx?$": ["ts-jest",{}],
  //},
};