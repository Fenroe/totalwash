import { Schema, model } from "mongoose"
import { getUrlString } from "../utilities"

const ProductSchema = new Schema({
    name: { type: String, unique: true },
    categories: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
    subcategories: [{ type: Schema.Types.ObjectId, ref: 'Subcategory' }],
    fullPrice: { type: Number },
    currentPrice: { type: Number },
    description: [{ type: String }],
    features: [{ type: String }],
    whatsIncluded: [{ type: String }],
    isFeatured: { type: Boolean },
    isOnSale: { type: Boolean },
    slug: { type: String, slug: 'name', unique: true },
    photos: [{ type: String, unique: true }],
})

ProductSchema
.pre('validate', function(next) {
    if (this.name) {
      this.slug = getUrlString(this.name)
    }
    next()
  })

ProductSchema.index(
  {
    name: "text",
    description: "text",
    features: "text",
    whatsIncluded: "text",
  },
  {
    name: "Product Text Index",
    weights: {
      name: 10,
      description: 5,
      features: 5,
      whatsIncluded: 1,
    }
  }
)

export const Product = model('Product', ProductSchema)
