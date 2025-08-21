// controllers/ingredientController.js
const Ingredient = require("../models/ingredients.model");
// Lấy danh sách + Query filter
exports.getIngredients = async (req, res) => {
  try {
    const { name, status, minStock, maxStock } = req.query;
    let filter = {};

    if (name) filter.name = new RegExp(name, "i"); // tìm gần đúng
    if (status) filter.status = status;
    if (minStock && minStock > 0) filter.current_stock = { $gte: minStock };
    if (maxStock && maxStock > 0) {
      filter.current_stock = {
        ...(filter.current_stock || {}),
        $lte: maxStock,
      };
    }
    const ingredients = await Ingredient.find(filter);
    res.json(ingredients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Tạo mới
exports.createIngredient = async (req, res) => {
  try {
    const ingredient = new Ingredient(req.body);
    await ingredient.save();
    res.status(201).json(ingredient);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Cập nhật
exports.updateIngredient = async (req, res) => {
  try {
    const { id } = req.params;
    const ingredient = await Ingredient.findByIdAndUpdate(id, req.body, { new: true });
    res.json(ingredient);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Xoá
exports.deleteIngredient = async (req, res) => {
  try {
    await Ingredient.findByIdAndDelete(req.params.id);
    res.json({ message: "Ingredient deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addnewIngredients = async (req, res) => {
    try {
        const ingredients = req.body; // Dữ liệu gửi từ client
        if (!Array.isArray(ingredients) || ingredients.length === 0) {
            return res.status(400).json({ error: "Invalid data format" });
        }

        const newIngredients = await Ingredient.insertMany(ingredients);
        res.status(201).json(newIngredients);
    } catch (err) {
        console.error("Error adding new ingredients:", err);
        res.status(500).json({ error: "Failed to add new ingredients" });
    }
}