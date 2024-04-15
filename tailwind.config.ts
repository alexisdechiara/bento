import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

export default <Partial<Config>>{
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', 'DM Sans fallback', ...defaultTheme.fontFamily.sans]
      },
      aspectRatio: {
        auto: 'auto',
        square: '1 / 1',
        video: '16 / 9'
      }
    },
    safelist: [
      { pattern: /object-(cover|fill|contain|scale-down)/ },
      { pattern: /^(col|row)-span-(1[0-2]|[1-9])$/ },
      { pattern: /bg-(blue|red|green|emerald|yellow|amber|orange|violet|red)-(700|500|200)$/,
        variants: ['hover', 'focus', 'active', 'peer-hover', 'peer-focus', 'peer-active', 'peer-checked' ]
      }
  ],
  },
  plugins: [
    require('@tailwindcss/container-queries'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
