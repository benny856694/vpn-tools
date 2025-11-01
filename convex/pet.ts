import { mutation, query } from './_generated/server'
import { v } from 'convex/values'

export const addFirmware = mutation({
  args: {
    name: v.optional(v.string()),
    fileName: v.string(),
    md5: v.string(),
    size: v.string()
  },
  handler: async (ctx, args) => {
    await ctx.db.insert('firmwares', {
      name: args.name,
      fileName: args.fileName,
      md5: args.md5,
      size: args.size
    })
  }
})

export const getFirmwares = query({
  handler: async (ctx) => {
    return await ctx.db.query('firmwares').collect()
  }
})

export const getSources = query({
  handler: async (ctx) => {
    return await ctx.db.query('sources').collect()
  }
})
