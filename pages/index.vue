<script setup lang="ts">
const { data: page } = await useAsyncData('index', () => queryContent('/').findOne())

useSeoMeta({
  title: page.value.title,
  ogTitle: page.value.title,
  description: page.value.description,
  ogDescription: page.value.description
})

defineOgImage({
  component: 'Homepage',
  title: page.value.title,
  description: page.value.description
})
</script>

<template>
  <div>
    <HomepageHero :title="page.hero.title" :description="page.hero.description" :links="page.hero.links">
      <Placeholder />
    </HomepageHero>

    <HomepageSection id="features" :title="page.features.title" :description="page.features.description" :headline="page.features.headline">
      <HomepageGrid>
        <HomepageCard v-for="(item, index) in page.features.items" :key="index" v-bind="item" />
      </HomepageGrid>
    </HomepageSection>

    <HomepageSection id="pricing" :title="page.pricing.title" :description="page.pricing.description" :headline="page.pricing.headline">
      <HomepagePricingGrid>
        <HomepagePricingCard v-for="(plan, index) in page.pricing.plans" :key="index" v-bind="plan" />
      </HomepagePricingGrid>
    </HomepageSection>

    <ULandingSection id="faq" :title="page.faq.title" :description="page.faq.description">
      <!-- <ULandingFAQ
        multiple
        :items="page.faq.items"
        :ui="{
          button: {
            label: 'font-semibold',
            trailingIcon: {
              base: 'w-6 h-6'
            }
          }
        }"
        class="max-w-4xl mx-auto"
      /> -->
    </ULandingSection>
  </div>
</template>
