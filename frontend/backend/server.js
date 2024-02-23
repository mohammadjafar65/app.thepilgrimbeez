const express = require('express');
const cors = require('cors');
const multer = require("multer");
const fs = require("fs");
const mysql = require("mysql");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(cors({ origin: 'https://admin.thepilgrimbeez.com' }));
app.use(express.json()); // Add this line to parse JSON requests

require('dotenv').config();

const port = process.env.PORT || 3008;

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

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
});

const upload = multer({ storage: storage });

const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

app.use("/uploads", express.static("uploads"));
app.use("/static", express.static(path.join(__dirname, "public")));

// Middleware to handle errors globally
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

require('./travelPackages')(app, db, upload, uuidv4);
require('./users')(app, db);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
