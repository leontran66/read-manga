module.exports = {
  globals: {
      "ts-jest": {
          tsconfig: "tsconfig.json"
      }
  },
  moduleFileExtensions: [
      "ts",
      "js"
  ],
  modulePathIgnorePatterns: [
    "dist"
  ],
  transform: {
      "^.+\\.(ts|tsx)$": "ts-jest"
  },
  testMatch: [
      "**/test/**/*.test.(ts|js)"
  ],
  testEnvironment: "node"
};
