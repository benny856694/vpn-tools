import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
  firmwares: defineTable({
    md5: v.string(),
    size: v.string(),
    fileName: v.string()
  }),
  sources: defineTable({
    name: v.string(),
    baseUrl: v.string()
  })
})
