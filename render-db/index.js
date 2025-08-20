const dotenv = require('dotenv'); // Import dotenv to manage environment variables
dotenv.config(); // Load environment variables from .env file   
const express = require('express');
const mongoose = require('mongoose');
const { Ingredient, ChangeLog, ProductMapping } = require('./models');

const app = express();
app.use(express.json());

// Debug MONGODB_URI
if (!process.env.MONGODB_URI) {
  console.error("MONGODB_URI is not defined!");
  process.exit(1);
}
else {
  console.log("MONGODB_URI is defined.");}

// Kết nối MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Demo API
app.get('/ingredients', async (req, res) => {
  const data = await Ingredient.find();
  res.json(data);
});

app.get('/changelogs', async (req, res) => {
  const data = await ChangeLog.find();
  res.json(data);
});

app.get('/productmappings', async (req, res) => {
  const data = await ProductMapping.find();
  res.json(data);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} `));
