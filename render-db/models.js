const mongoose = require('mongoose');

// ===== Ingredient =====
const ingredientSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  unit: { type: String, required: true },
  image_url: { type: String }
});
const Ingredient = mongoose.model('Ingredient', ingredientSchema, 'ingredients');

// ===== ChangeLog =====
const changeLogSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  ingredient_id: { type: String, required: true },
  changed_by: { type: String, required: true },
  change_type: { type: String, required: true },
  previous_quantity: { type: Number, required: true },
  new_quantity: { type: Number, required: true },
  timestamp: { type: String, required: true }
});
const ChangeLog = mongoose.model('ChangeLog', changeLogSchema, 'changelogs');

// ===== ProductMapping =====
const productMappingSchema = new mongoose.Schema({
  product_name: { type: String, required: true },
  ingredient_id: { type: String, required: true },
  quantity_per_product: { type: Number, required: true }
});
const ProductMapping = mongoose.model('ProductMapping', productMappingSchema, 'productmappings');

module.exports = { Ingredient, ChangeLog, ProductMapping };
