const mongoose = require("mongoose");

const changeLogSchema = new mongoose.Schema({
  ingredient_id: { type: mongoose.Schema.Types.ObjectId, ref: "Ingredient", required: true },
  changed_by: { type: String, required: true },
  change_type: { type: String, enum: ["manual update", "received", "sale deduction"], required: true },
  previous_quantity: { type: Number, required: true },
  new_quantity: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model("ChangeLog", changeLogSchema);
