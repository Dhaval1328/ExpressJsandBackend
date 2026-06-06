const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = 3000;

// Import Model
const ProductModel = require("./models/Product");

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// MongoDB Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/mudb2")
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log("Error in DB Connection:", err));

// Home Route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// HTML Pages
app.get("/home", (req, res) => {
  res.sendFile(__dirname + "/home.html");
});

app.get("/contact", (req, res) => {
  res.sendFile(__dirname + "/contact.html");
});

app.get("/about", (req, res) => {
  res.sendFile(__dirname + "/about.html");
});

// Add Product
app.post("/addData", async (req, res) => {
  try {
    const product = await ProductModel.create(req.body);

    res.status(201).json({
      success: true,
      message: "Record Added Successfully",
      product,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// Save Sample Data
app.get("/saveData", async (req, res) => {
  try {
    const userdata = {
      pname: "iphone",
      pprice: 999,
      pdetails: "NicePhone",
    };

    const product = new ProductModel(userdata);

    await product.save();

    res.status(201).json({
      success: true,
      message: "Data Saved Successfully",
      product,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// Get All Data (Old Route)
app.get("/getdata", async (req, res) => {
  try {
    const data = await ProductModel.find();

    res.status(200).json({
      success: true,
      data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// New Route for React
app.get("/products", async (req, res) => {
  try {
    const products = await ProductModel.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// Start Server
app.listen(port, () => {
  console.log(`Server running at http://127.0.0.1:${port}`);
});