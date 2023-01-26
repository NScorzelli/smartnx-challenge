module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                targets: {
                    node: 'current',
                },
            },
        ],
        '@babel/preset-typescript',
    ],
    plugins: [
        [
            'module-resolver',
            {
                alias: {
                    '@config': './src/modules',
                    '@models': './src/config',
                    '@controllers': './src/shared',
                    '@views': './src/infra',
                },
            },
        ],
    ],
    ignore: ['**/*.spec.ts'],
};