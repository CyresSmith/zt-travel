module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: [
        'next/core-web-vitals',
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:import/recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:prettier/recommended',
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs'],
    parser: '@typescript-eslint/parser',
    plugins: ['import', 'prettier'],
    rules: {
        '@typescript-eslint/consistent-type-imports': ['warn', { prefer: 'type-imports' }],
        'prettier/prettier': [
            'warn',
            {
                endOfLine: 'auto',
            },
        ],
        'import/no-unresolved': ['error'],
    },
    settings: {
        'import/resolver': {
            node: {
                paths: ['src'],
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
            },
            typescript: {
                alwaysTryTypes: true,
                project: './tsconfig.json',
            },
        },
    },
};
