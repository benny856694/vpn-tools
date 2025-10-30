import { mutation } from './_generated/server'
import { v } from 'convex/values'

export const addFirmware = mutation({
  args: {
    path: v.string(),
    md5: v.string(),
    size: v.string()
  },
  handler: async (ctx, args) => {
    await ctx.db.insert('firmwares', {
      path: args.path,
      md5: args.md5,
      size: args.size
    })
  }
})
