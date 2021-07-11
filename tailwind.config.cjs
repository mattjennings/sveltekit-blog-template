module.exports = {
  mode: 'jit',
  darkMode: 'class',
  purge: ['./src/**/*.{html,js,svelte,ts,md,svx}'],
  theme: {
    extend: {
      typography: (theme) => {
        return {
          DEFAULT: {
            css: {
              maxWidth: 'none',
              code: {
                borderRadius: theme('borderRadius.md'),
                paddingTop: theme('spacing.1'),
                paddingBottom: theme('spacing.1'),
                paddingLeft: theme('spacing.1'),
                paddingRight: theme('spacing.1'),
                fontFamily: 'inherit !important',
                fontWeight: '500 !important',
                color: theme('colors.gray.900'),
                backgroundColor: theme('colors.gray.300')
              },
              'code::before': {
                content: '""'
              },
              'code::after': {
                content: '""'
              },
              hr: {
                borderColor: theme('colors.gray.300')
              },
              ul: {
                marginTop: '0 !important',
                marginBottom: '0 !important'
              },
              li: {
                marginTop: '0 !important',
                marginBottom: '0 !important'
              },
              img: {
                marginLeft: 'auto',
                marginRight: 'auto'
              },
              'h1,h2,h3,h4,h5,h6': {
                a: {
                  color: 'inherit',
                  fontWeight: 'inherit',
                  textDecoration: 'none'
                }
              },
              h1: {
                fontSize: theme('fontSize.2xl')
              },
              h2: {
                fontSize: theme('fontSize.xl')
              },
              h3: {
                fontSize: theme('fontSize.md')
              },
              h4: {
                fontSize: theme('fontSize.base')
              },
              h5: {
                fontSize: theme('fontSize.base')
              },
              h6: {
                fontSize: theme('fontSize.base')
              }
            }
          },
          sm: {
            css: {
              h1: {
                fontSize: theme('fontSize.xl')
              },
              h2: {
                fontSize: theme('fontSize.lg')
              },
              h3: {
                fontSize: theme('fontSize.base')
              },
              h4: {
                fontSize: theme('fontSize.base')
              },
              h5: {
                fontSize: theme('fontSize.base')
              },
              h6: {
                fontSize: theme('fontSize.base')
              }
            }
          },
          lg: {
            css: {
              code: {
                paddingLeft: theme('spacing.2'),
                paddingRight: theme('spacing.2')
              },
              h1: {
                fontSize: theme('fontSize.3xl')
              },
              h2: {
                fontSize: theme('fontSize.2xl')
              },
              h3: {
                fontSize: theme('fontSize.xl')
              },
              h4: {
                fontSize: theme('fontSize.lg')
              }
            }
          },

          dark: {
            css: {
              color: theme('colors.gray.400'),
              '[class~="lead"]': {
                color: theme('colors.gray.300')
              },
              a: {
                color: theme('colors.gray.200')
              },
              strong: {
                color: theme('colors.white')
              },
              'ol > li::before': {
                color: theme('colors.gray.400')
              },
              'ul > li::before': {
                backgroundColor: theme('colors.gray.600')
              },
              hr: {
                borderColor: theme('colors.gray.700')
              },
              blockquote: {
                color: theme('colors.gray.200'),
                borderLeftColor: theme('colors.gray.600')
              },
              h1: {
                color: theme('colors.gray.200')
              },
              h2: {
                color: theme('colors.gray.200')
              },
              h3: {
                color: theme('colors.gray.200')
              },
              h4: {
                color: theme('colors.gray.200')
              },
              'figure figcaption': {
                color: theme('colors.gray.400')
              },
              code: {
                color: theme('colors.gray.300'),
                backgroundColor: theme('colors.gray.800')
              },
              'a code': {
                color: theme('colors.white')
              },
              pre: {
                color: theme('colors.gray.200'),
                backgroundColor: theme('colors.gray.800')
              },
              thead: {
                color: theme('colors.white'),
                borderBottomColor: theme('colors.gray.400')
              },
              'tbody tr': {
                borderBottomColor: theme('colors.gray.600')
              }
            }
          }
        }
      }
    }
  },
  plugins: [require('@tailwindcss/typography')]
}
