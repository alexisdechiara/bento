import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

export default <Partial<Config>>{
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', 'DM Sans fallback', ...defaultTheme.fontFamily.sans]
      }
    },
    safelist: [
      { pattern: /object-(cover|fill|contain|scale-down)/ },
      { pattern: /^(col|row)-span-(1[0-2]|[1-9])$/ },
  ],
  },
  plugins: [
    require('@tailwindcss/container-queries'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
