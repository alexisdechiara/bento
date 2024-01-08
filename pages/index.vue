<script setup lang="ts">
const { data: page } = await useAsyncData('index', () => queryContent('/').findOne())

useSeoMeta({
  title: page.value.title,
  ogTitle: page.value.title,
  description: page.value.description,
  ogDescription: page.value.description
})

defineOgImage({
  component: 'Landing',
  title: page.value.title,
  description: page.value.description
})
</script>

<template>
  <div>
    <ULandingHero :title="page.hero.title" :description="page.hero.description" :links="page.hero.links">
      <Placeholder />
    </ULandingHero>

    <ULandingSection id="features" :title="page.features.title" :description="page.features.description" :headline="page.features.headline">
      <UPageGrid>
        <ULandingCard v-for="(item, index) in page.features.items" :key="index" v-bind="item" />
      </UPageGrid>
    </ULandingSection>

    <ULandingSection id="pricing" :title="page.pricing.title" :description="page.pricing.description" :headline="page.pricing.headline">
      <UPricingGrid compact>
        <UPricingCard v-for="(plan, index) in page.pricing.plans" :key="index" v-bind="plan" />
      </UPricingGrid>
    </ULandingSection>

    <ULandingSection id="faq" :title="page.faq.title" :description="page.faq.description">
      <ULandingFAQ
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
      />
    </ULandingSection>
  </div>
</template>
