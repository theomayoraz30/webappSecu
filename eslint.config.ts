import pluginVue from 'eslint-plugin-vue'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

// Si l'instance est en production / OS
const PRODUCTION = process.env.VITE_ENVIRONMENT === 'production';

export default defineConfigWithVueTs(
    {
        name: 'app/files-to-lint',
        files: ['**/*.{ts,mts,tsx,vue}'],
    },

    {
        name: 'app/files-to-ignore',
        ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
    },

    pluginVue.configs['flat/essential'],
    vueTsConfigs.recommended,
    skipFormatting,

    {
        rules: {
            // Custom
            'indent': ['error', 4, { 'SwitchCase': 1 }],                            // Indentation
            'quotes': 'off',                                                        // Textes
            'max-len': 'off',                                                       // Désactive la limite de charactère par ligne de code
            'no-param-reassign': 'off',                                             // Désactive le fait de ne pas pouvoir réassigner des paramètres
            'no-plusplus': 'off',                                                   // Désactive la règle comme quoi on doit utiliser +=1 à la place de ++
            '@typescript-eslint/no-inferrable-types': 'off',                        // Désactive le check de la redondance de typage
            'no-unreachable': PRODUCTION ? 'error' : 'off',                         // Désactive la règle de ne pas mettre de code pas atteignable (en mode dev)
            'spaced-comment': PRODUCTION ? 'error' : 'off',                         // Désactive la règle de ne pas mettre de code en commentaire (en mode dev)
            'vue/no-unused-components' : PRODUCTION ? 'error' : 'off',              // Désactive les components pas utilisés
            'import/prefer-default-export': 'off',                                  // Désactive la règle de préférer l'export par défaut sur un fichier avec un seul export
            'no-trailing-spaces': PRODUCTION
                ? ['error', { ignoreComments: true }]
                : ['error', { skipBlankLines: true, ignoreComments: true }],        // Formatage des espaces après les commentaires
            'no-multi-spaces': ['error', { ignoreEOLComments: true }],              // Désactive le système qui enlève les tabs avant les commentaires
            'consistent-return': 'off',                                             // Désactive le fait que les fonctions doivent retourner une valeure
            'object-curly-newline': ['error', {                                     // Désactive le fait qu'on doive mettre les imports sur plusieurs ligne si la ligne est trop grande
                'ImportDeclaration': { 'consistent': true },
                'ExportDeclaration': { 'consistent': true },
            }],
            'lines-between-class-members': 'off',                                   // Désactive l'espace entre les attributs
            'no-underscore-dangle': 'off',                                          // Désactive le fait qu'on ne peut pas mettre de _ devant une variable
            'new-cap': 'off',                                                       // Un constructeur ne peux pas commencer avec un lowercase
            '@typescript-eslint/no-explicit-any': 'off',                            // Pas de type 'any'
            'class-methods-use-this': 'off',                                        // Demande d'utiliser 'this' dans une fonction de classe
            'vuejs-accessibility/click-events-have-key-events': 'off',              // Handicap

            // Erreurs de l'export des enums en typescript
            'no-shadow': 'off',
            '@typescript-eslint/no-shadow': ['error'],

            // Default
            'no-console': PRODUCTION ? 'warn' : 'off',
            'no-debugger': PRODUCTION ? 'warn' : 'off',
        },
    },
)
