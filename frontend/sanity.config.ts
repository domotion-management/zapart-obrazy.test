'use client'

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from '@/sanity/schema'

export default defineConfig({
  name: 'zapart-studio',
  title: 'Zapart — Panel CMS',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,

  basePath: '/studio',

  plugins: [
    structureTool(),
    visionTool({ defaultApiVersion: '2025-05-01' }),
  ],

  schema: {
    types: schemaTypes,
  },
})
