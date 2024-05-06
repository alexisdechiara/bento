<script setup lang="ts">
const { data: footerPage } = await useAsyncData('footer', () => queryContent('/footer').findOne())
const { data: headerPage } = await useAsyncData('header', () => queryContent('/header').findOne())


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

useSeoMeta({
  ogSiteName: 'Nuxt UI Pro - Landing template',
  twitterCard: 'summary_large_image'
})
</script>

<template>
  <Header :links="headerPage.links">
    <template #logo>
      Bento Studio <UBadge label="Alpha" variant="subtle" class="mb-0.5" />
    </template>

    <template #right>
      <UIColorModeButton class="hidden lg:flex" />
      <!-- <UButton label="Log in" color="white" variant="ghost" trailing-icon="i-heroicons-arrow-right-20-solid" class="hidden lg:flex" disabled :ui="{ rounded: 'rounded-full' }" /> -->
    </template>

    <template #panel>
      <UIAsideLinks :links="headerPage.links" />

      <UDivider class="my-6" />

      <UIColorModeSelect block size="md" class="mb-3" />
      <!-- <UButton label="Sign in" color="white" block class="mb-3" disabled />
      <UButton label="Get started" block disabled /> -->
    </template>
  </Header>

  <Main>
    <NuxtPage />
  </Main>
  <UNotifications />

  <Footer :links="footerPage.links">
    <template #left>
      Copyright © {{ new Date().getFullYear() }}
      <span v-if="footerPage.copyright.author">- {{ footerPage.copyright.author }} </span>
    </template>

    <template #right>
      <UButton v-for="social in footerPage.socials" :key="social.label" :icon="social.icon" color="gray" variant="ghost" :to="social.to" :target="social.target" />
    </template>
  </Footer>
</template>

<style>
#__nuxt {
  @apply bg-gray-50 dark:bg-gray-950
}
</style>
