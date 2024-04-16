<template>
  <HomepageSection :title="page.hero.title" :description="page.hero.description" :headline="page.hero.headline" align="center" class="mb-48">
    <div class="leading-7 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-3 lg:gap-x-8">
      <div v-for="information in page.hero.informations" :key="information.name" class="relative pl-8">
        <UIcon :name="information.icon || 'i-heroicons-check-circle'" class="absolute left-0 top-1 h-5 w-5 text-primary" />
        <span class="font-semibold text-gray-900 dark:text-white"> {{ information.name }} </span>
        <p class="text-gray-500 dark:text-gray-400">
          {{ information.description }}
          <ul class="">
            <li v-for="line in information.lines" :key="line">
              {{ line }}
            </li>
          </ul>
        </p>
      </div>
    </div>
  </HomepageSection>
</template>

<script lang="ts" setup>
const { data: page } = await useAsyncData('legal-notice', () => queryContent('/legal-notice').findOne())
</script>
