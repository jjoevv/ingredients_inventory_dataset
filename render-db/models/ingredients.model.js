const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image_url: { type: [String], default: [] }, // tối đa 4 url
  current_stock: { type: Number, default: 0 },
  unit: { type: String, required: true },
  threshold: { type: Number, default: 0 },
  status: { type: String, enum: ["available", "near-ending", "need-to-buy"], default: "available" },
  last_updated: { type: Date, default: Date.now },
  updated_by: { type: String, default: "system" }
});

module.exports = mongoose.model('Ingredient', ingredientSchema);
    