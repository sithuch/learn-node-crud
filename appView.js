const express = require("express");
const path = require("path");

const app = express();

// Set EJS as the view engine
app.set("view engine", "ejs");

// Define the views directory
app.set("views", path.join(__dirname, "views"));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// Route to render the "index" view
app.get("/", (req, res) => {
  res.render("index");
});

// Start the server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
