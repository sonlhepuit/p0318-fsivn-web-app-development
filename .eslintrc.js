module.exports = {
    root: true,
    extends: [
        'prettier',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',
        'plugin:jest/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: './tsconfig.json',
    },
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['react', '@typescript-eslint', 'jest','import'],
    settings: {
        'import/resolver': {
            alias: {
                map: [['@', './src']],
                extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
            },
        },
    },
    rules: {
        indent: ['error', 4],
        'no-unused-vars': [
            'error',
            { vars: 'all', args: 'after-used', ignoreRestSiblings: false, argsIgnorePattern: '^_' },
        ],
        'arrow-body-style': ['error', 'as-needed'],
        'react/self-closing-comp': [
            'error',
            {
                component: true,
                html: true,
            },
        ],
        'max-lines': [1, 250],
        'react/no-multi-comp': [1],
        'max-len': [1, { code: 220 }],
        'react/no-unknown-property': [2, { ignore: ['tw'] }],
        'no-param-reassign': [
            2,
            { props: true, ignorePropertyModificationsForRegex: ['^draft', '^req', '^ctx'] },
        ],
        'sort-imports': [2, { ignoreCase: true, ignoreDeclarationSort: true }],
        'import/order': [
            1,
            {
                groups: [['external', 'builtin'], 'internal', ['sibling', 'parent'], 'index'],
                pathGroups: [
                    {
                        pattern: '@(react|react-native)',
                        group: 'external',
                        position: 'before',
                    },
                    {
                        pattern: '@src/**',
                        group: 'internal',
                    },
                ],
                pathGroupsExcludedImportTypes: ['internal', 'react'],
                'newlines-between': 'always',
                alphabetize: {
                    order: 'asc',
                    caseInsensitive: true,
                },
            },
        ],
    },
};
