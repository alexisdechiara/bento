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
      'scale-[0.1]',
      'scale-[0.2]',
      'scale-[0.3]',
      'scale-[0.4]',
      'scale-[0.5]',
      'scale-[0.6]',
      'scale-[0.7]',
      'scale-[0.8]',
      'scale-[0.9]',
      'scale-[1]',
      'scale-[1.1]',
      'scale-[1.2]',
      'scale-[1.3]',
      'scale-[1.4]',
      'scale-[1.5]',
      'scale-[1.6]',
      'scale-[1.7]',
      'scale-[1.8]',
      'scale-[1.9]',
      'scale-[2]',
      {
      pattern: /object-(cover|fill|contain|scale-down)/,
    },
  ],
  }
}
