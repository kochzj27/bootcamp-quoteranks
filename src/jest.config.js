// module.exports = {
//   setupTestFrameworkScriptFile: '<rootDir>/tools/testSetup.js',
//   transform: {
//       '^.+\\.(js|jsx|mjs)$': '<rootDir>/node_modules/babel-jest',
//       '^.+\\.(css|scss)$': '<rootDir>/tools/fileTransform.js',
//   },
//   moduleNameMapper: { '\\.(css|scss|sass|jpg|jpeg|gif|svg|png|ico)$': '<rootDir>/tools/fileTransform.js' },
//   collectCoverageFrom: [
//       'src/app/**/*.js',
//       '!src/app/tokens.js',
//       '!src/app/*-old.js',
//       '!src/app/*_old.js',
//       '!src/app/*.spec.js',
//       '!src/app/test/**',
//       '!src/app/server/**',
//       '!src/app/helpers/polyFill/**/*.js',
//       '!src/app/helpers/adalHelper.js',
//   ],
//   coverageThreshold: {
//       global: {
//           branches: 0,
//           functions: 0,
//           lines: 0,
//       },
//   },
//   testURL: 'http://localhost',
// };