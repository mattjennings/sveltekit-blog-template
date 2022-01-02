module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{html,js,svelte,ts,md,svx}'],
  theme: {
    extend: {
      typography: ({ theme }) => {
        return {
          DEFAULT: {
            css: {
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
                color: theme('colors.slate.900'),
                backgroundColor: theme('colors.slate.300')
              },
              'code::before': {
                content: '""'
              },
              'code::after': {
                content: '""'
              },
              hr: {
                borderColor: theme('colors.slate.300')
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
                  textDecoration: 'none'
                }
              }
            }
          },
          sm: {
            css: {
              pre: {
                code: {
                  fontSize: theme('fontSize.xs')[0]
                }
              }
            }
          },
          lg: {
            css: {
              h1: {
                fontSize: theme('fontSize.4xl')[0]
              }
            }
          },

          invert: {
            css: {
              hr: {
                borderColor: theme('colors.slate.700')
              },
              code: {
                color: theme('colors.slate.300'),
                backgroundColor: theme('colors.slate.700')
              },

              'a code': {
                color: theme('colors.white')
              },
              'pre, pre code': {
                color: theme('colors.slate.200'),
                backgroundColor: theme('colors.slate.800')
              }
            }
          }
        }
      }
    }
  },
  plugins: [require('@tailwindcss/typography')]
}
