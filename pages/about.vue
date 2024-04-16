<template>
  <div>
    <HomepageSection :title="page.hero.title" :description="page.hero.description" :headline="page.hero.headline" :features="page.hero.features" align="left">
      <NuxtImg :src="page.hero.image" class="w-96 object-fit mx-auto" fit="fit" />
    </HomepageSection>
    <HomepageSection :title="page.section.title" :description="page.section.description" :ui="{title: 'lg:text-3xl', container: 'sm:gap-y-12'}">
      <div class="flex justify-center items-center">
        <div v-for="person in page.team" :key="person.name" class="flex flex-col justify-center items-center gap-2 max-w-64">
          <UAvatar :src="person.image" :alt="person.name" size="3xl" />
          <div class="flex flex-col">
            <span class="text-base font-semibold text-center">{{ person.name }}</span>
            <span class="text-sm font-light text-center text-gray-500">{{ person.role }}</span>
          </div>
          <p class="text-sm text-center text-gray-700">
            {{ person.description }}
          </p>
          <div class="flex justify-center gap-4">
            <UButton v-for="social in person.socials" :key="social.name" variant="ghost" color="gray" :icon="social.icon" :to="social.to" :target="social.target" />
          </div>
        </div>
      </div>
    </HomepageSection>
  </div>
</template>

<script lang="ts" setup>
const { data: page } = await useAsyncData('about', () => queryContent('/about').findOne())
</script>
