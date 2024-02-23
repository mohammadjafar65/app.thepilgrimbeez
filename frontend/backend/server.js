const express = require('express');
const cors = require('cors'); // Import the cors module
const multer = require("multer");
const fs = require("fs");
const mysql = require("mysql");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const app = express(); // Initialize Express app
app.use(cors());

require('dotenv').config();

// Define the port
const port = process.env.PORT || 3007;

// Database connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

db.connect(err => {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to database.');
});

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
});

const upload = multer({ storage: storage });

// Ensure the uploads directory exists
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Serve static files from the uploads directory
app.use("/uploads", express.static("uploads"));
app.use("/static", express.static(path.join(__dirname, "public")));

// Routes for travel packages
require('./travelPackages')(app, db, upload, uuidv4);

// Routes for student
require('./users')(app, db);

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});