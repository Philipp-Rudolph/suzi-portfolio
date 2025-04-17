import { defineContentConfig, defineCollection } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: 'page',
      source: '**'
    }),
    about: defineCollection({
      type: 'page',
      source: 'about/*.md'
    }),
    projects: defineCollection({
      type: 'page',
      source: 'projects/*.md'
    })
  }
})
