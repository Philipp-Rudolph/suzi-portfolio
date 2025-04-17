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
    aboutSkills: defineCollection({
      type: 'page',
      source: 'about/*skill*.md'
    }),
    projects: defineCollection({
      type: 'page',
      source: 'projects/*.md'
    })
  }
})
