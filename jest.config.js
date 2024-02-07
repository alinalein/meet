module.exports = {
    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.js'], // Specify the path to your source files
    coverageReporters: ['json', 'lcov', 'text', 'clover'], // Add desired reporters
};
