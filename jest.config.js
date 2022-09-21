module.exports = {
    testEnvironment: 'jest-environment-jsdom',
    testPathIgnorePatterns: ['/node_modules/'],
    collectCoverage: true,
    collectCoverageFrom: ['src/**/__tests__/*.ts(x)'],
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js']
}