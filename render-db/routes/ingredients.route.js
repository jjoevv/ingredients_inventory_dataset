// routes/ingredientRoutes.js
const express = require("express");
const router = express.Router();
const controller = require("../controllers/ingredients.controller");

router.get("/", controller.getIngredients);   // ?name=apple&minStock=5&maxStock=20
router.post("/", controller.createIngredient);
router.put("/:id", controller.updateIngredient);
router.delete("/:id", controller.deleteIngredient);
router.post("/bulk_new", controller.addnewIngredients); // Thêm nhiều nguyên liệu
module.exports = router;
