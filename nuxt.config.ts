// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  modules: [
    '@nuxthq/studio',
    '@nuxt/content',
    '@nuxt/ui',
    '@nuxt/image',
    '@nuxtjs/fontaine',
    '@nuxtjs/google-fonts',
    // 'nuxt-og-image',
    '@pinia/nuxt',
    'nuxt-tiptap-editor',
    '@samk-dev/nuxt-vcalendar'
  ],
  // Fonts
  fontMetrics: {
    fonts: ['DM Sans']
  },
  googleFonts: {
    display: 'swap',
    download: true,
    families: {
      'DM+Sans': [400, 500, 600, 700]
    }
  },
  tiptap: {
    prefix: 'Tiptap',
  },
  // Devtools / Typescript
  devtools: { enabled: true },
  typescript: { strict: false },
})
