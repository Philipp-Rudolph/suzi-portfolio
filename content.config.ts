import { defineContentConfig, defineCollection } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: 'page',
      source: '**'
    }),
    hero: defineCollection({
      type: 'page',
      source: 'index.md'
    }),
    about: defineCollection({
      type: 'page',
      source: 'about/*.md'
    }),
    aboutSkills: defineCollection({
      type: 'page',
      source: 'about/*skill*.md'
    }),
    projects: defineCollection({
      type: 'page',
      source: 'projects/*.md'
    }),
    contact: defineCollection({
      type: 'page',
      source: 'contact/*.md'
    }),
    faq: defineCollection({
      type: 'page',
      source: 'faq/*.md'
    })
  }
})
