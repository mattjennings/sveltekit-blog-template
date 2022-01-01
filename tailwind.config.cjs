module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{html,js,svelte,ts,md,svx}'],
  theme: {
    extend: {
      typography: ({ theme }) => {
        return {
          DEFAULT: {
            css: {
              maxWidth: 'none',
              pre: {
                code: {
                  padding: '0 !important',
                  fontSize: theme('fontSize.base')[0]
                }
              },
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
                fontSize: theme('fontSize.2xl')[0]
              },
              h2: {
                fontSize: theme('fontSize.xl')[0]
              },
              h3: {
                fontSize: theme('fontSize.base')[0]
              },
              h4: {
                fontSize: theme('fontSize.base')[0]
              },
              h5: {
                fontSize: theme('fontSize.base')[0]
              },
              h6: {
                fontSize: theme('fontSize.base')[0]
              }
            }
          },
          sm: {
            css: {
              pre: {
                code: {
                  fontSize: theme('fontSize.xs')[0]
                }
              },
              h1: {
                fontSize: theme('fontSize.xl')[0]
              },
              h2: {
                fontSize: theme('fontSize.lg')[0]
              },
              h3: {
                fontSize: theme('fontSize.base')[0]
              },
              h4: {
                fontSize: theme('fontSize.base')[0]
              },
              h5: {
                fontSize: theme('fontSize.base')[0]
              },
              h6: {
                fontSize: theme('fontSize.base')[0]
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
                fontSize: theme('fontSize.3xl')[0]
              },
              h2: {
                fontSize: theme('fontSize.2xl')[0]
              },
              h3: {
                fontSize: theme('fontSize.xl')[0]
              },
              h4: {
                fontSize: theme('fontSize.lg')[0]
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
