<script setup lang="ts">
import type { FooterLink } from './components/UI/FooterLinks.vue'
import type { HeaderLink } from './components/UI/HeaderLinks.vue'

useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' }
  ],
  htmlAttrs: {
    lang: 'en'
  }
})

const headerLinks: HeaderLink[] = [{
  label: 'Homepage',
  to: '/',

}, {
  label: 'Playground',
  to: '/playground',
}]

const footerLinks: FooterLink[] = [{
  label: 'About',
  to: '/about'
},{
  label: 'Legal notice',
  to: 'legal-notice'
}, {
  label: 'Feature request',
  to: ''
}, {
  label: 'Blog',
  to: 'https://geekly.blog',
  target: '_blank'
}]

useSeoMeta({
  ogSiteName: 'Nuxt UI Pro - Landing template',
  twitterCard: 'summary_large_image'
})
</script>

<template>
  <Header :links="headerLinks">
    <template #logo>
      Bento Studio <UBadge label="Alpha" variant="subtle" class="mb-0.5" />
    </template>

    <template #right>
      <UButton label="Log in" color="white" variant="ghost" trailing-icon="i-heroicons-arrow-right-20-solid" class="hidden lg:flex" disabled :ui="{ rounded: 'rounded-full' }" />
    </template>

    <template #panel>
      <UIAsideLinks :links="headerLinks" />

      <UDivider class="my-6" />

      <UButton label="Sign in" color="white" block class="mb-3" disabled />
      <UButton label="Get started" block disabled />
    </template>
  </Header>

  <Main>
    <NuxtPage />
  </Main>

  <Footer :links="footerLinks">
    <template #left>
      Copyright © {{ new Date().getFullYear() }}
    </template>

    <template #right>
      <UButton icon="i-simple-icons-bluesky" color="gray" variant="ghost" to="https://bsky.app/profile/alexisdechiara.fr" target="_blank" />
      <UButton icon="i-simple-icons-github" color="gray" variant="ghost" to="https://github.com/alexisdechiara/bento" target="_blank" />
    </template>
  </Footer>
</template>

<style>
#__nuxt {
  @apply bg-gray-50 dark:bg-gray-950
}
</style>
