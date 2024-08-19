import { Config } from '@jest/types';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.mockdev' });

const e2eConfig: Config.InitialOptions = {
  verbose: true,
  bail: 1,
  moduleFileExtensions: ['js', 'json', 'ts'],
  modulePathIgnorePatterns: ['./dist'],
  rootDir: '.',
  testEnvironment: 'allure-jest/node',
  testRegex: '.e2e-spec.ts$',
  testTimeout: 18000,
  collectCoverageFrom: ['**/*.(t|j)s', '!**/*.schema.(t|j)s', '!**/__mocks__/*.(t|j)s'],
  coveragePathIgnorePatterns: ['node_modules', '.module.ts', './src/main.ts', './src/tracing.ts', 'health'],
  coverageDirectory: './coverage-e2e',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  reporters: [
    'default',
    [
      'jest-sonar',
      {
        outputDirectory: './test-reports-e2e',
        outputName: 'sonar-report.xml',
        relativeRootDir: '.',
      },
    ],
    [
      'jest-junit',
      {
        outputDirectory: './test-reports-e2e',
        outputName: 'junit-report.xml',
        relativeRootDir: '.',
      },
    ],
    [
      'jest-html-reporter',
      {
        outputPath: './test-reports-e2e/test-report.html',
      },
    ],
  ],
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
    '^@common(.*)$': '<rootDir>/src/common/$1',
    '^@http-request(.*)$': '<rootDir>/src/modules/http-request/$1',
    '^@token(.*)$': '<rootDir>/src/modules/token/$1',
    '^@commerce-lab(.*)$': '<rootDir>/src/modules/commerce-lab/$1',
    '^@order(.*)$': '<rootDir>/src/modules/order/$1',
    '^@order-confirm(.*)$': '<rootDir>/src/modules/order/order-confirm/$1',
    '^@interceptor(.*)$': '<rootDir>/src/interceptors/$1',
    '^@logger(.*)$': '<rootDir>/src/modules/logger/$1',
  },
};

export default e2eConfig;