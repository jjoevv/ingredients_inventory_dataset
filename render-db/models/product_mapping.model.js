const mongoose = require("mongoose");

const productMappingSchema = new mongoose.Schema({
  product_name: { type: String, required: true },
  ingredient_id: { type: mongoose.Schema.Types.ObjectId, ref: "Ingredient", required: true },
  quantity_per_product: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model("ProductMapping", productMappingSchema);
