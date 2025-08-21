// controllers/ingredientController.js
const Ingredient = require("../models/ingredients.model");
// Lấy danh sách + Query filter
exports.getIngredients = async (req, res) => {
  try {
    const { status, unit, updated_by, minStock, maxStock, startDate, endDate } = req.query;
    const query = {};

    // Lọc theo nhiều status
    if (status) {
      query.status = { $in: status.split(',') };
    }

    // Lọc theo nhiều updated_by
    if (updated_by) {
      query.updated_by = { $in: updated_by.split(',') };
    }

    // Lọc theo khoảng stock
    if (minStock || maxStock) {
      query.current_stock = {};
      if (minStock && Number(minStock) > 0) {
        query.current_stock.$gte = Number(minStock);
      }
      if (maxStock && Number(maxStock) > 0) {
        if (!query.current_stock.$gte || Number(maxStock) > Number(minStock)) {
          query.current_stock.$lte = Number(maxStock);
        }
      }
    }

    // Lọc theo khoảng thời gian last_updated
    if (startDate || endDate) {
      query.last_updated = {};
      if (startDate) {
        query.last_updated.$gte = new Date(startDate);
      }
      if (endDate) {
        query.last_updated.$lte = new Date(endDate);
      }
    }

    const data = await Ingredient.find(query);
    res.json(data);
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