module.exports = {
    verbose: true,
    transform: {
        '^.+\\.ts$': 'ts-jest'
    },
    moduleFileExtensions:[
        'js',
        'ts'
    ],
    testMatch: [
        '**/test/**/*.test.ts'
    ],
    testEnvironment: 'node'
}
