<script setup lang="ts">
const links = [{
  label: 'Homepage',
  to: '/',
  icon: 'i-heroicons-home',
  exactHash: true
}, {
  label: 'Playground',
  to: '/playground',
  icon: 'i-heroicons-cube-transparent',
  exactHash: true,
}]
</script>

<template>
  <UHeader :links="links">
    <template #logo>
      Bento UI <UBadge label="Studio" variant="subtle" class="mb-0.5" />
    </template>

    <template #right>
      <UButton label="Log in" color="white" variant="ghost" trailing-icon="i-heroicons-arrow-right-20-solid" class="hidden lg:flex" />
    </template>

    <template #panel>
      <UAsideLinks :links="links" />

      <UDivider class="my-6" />

      <UButton label="Sign in" color="white" block class="mb-3" />
      <UButton label="Get started" block />
    </template>
  </UHeader>
</template>
