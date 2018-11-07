module.exports = {
  testRegex: "/__tests__/.*\\.(jsx?|tsx?)$",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js"],
  globals: {
    "ts-jest": {
      tsConfig: "tsconfig.json",
    },
  },
  setupTestFrameworkScriptFile: require.resolve("./test/setup-test-env.ts"),
  watchPlugins: ["jest-watch-typeahead/filename", "jest-watch-typeahead/testname"],
};
