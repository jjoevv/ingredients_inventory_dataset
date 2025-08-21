const dotenv = require('dotenv'); // Import dotenv to manage environment variables
dotenv.config(); // Load environment variables from .env file   
const express = require('express');
const mongoose = require('mongoose');
const ingredientRoutes = require('./routes/ingredients.route');

const app = express();
app.use(express.json());

// Debug MONGODB_URI
if (!process.env.MONGODB_URI) {
  console.error("MONGODB_URI is not defined!");
  process.exit(1);
}
else {
  console.log("MONGODB_URI is defined.");}

// 👉 Kết nối MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch(err => console.error("❌ MongoDB connection error:", err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} `));

app.use("/api/ingredients", ingredientRoutes);
