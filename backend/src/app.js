const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();

// CORS configuration - allow all origins for production
app.use(cors({ 
  origin: process.env.NODE_ENV === 'production' ? true : "http://localhost:3000", 
  credentials: true 
}));
app.use(express.json());

// API routes
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/deals", require("./routes/deal.routes"));
app.use("/api/claims", require("./routes/claim.routes"));

// Serve static files from frontend
app.use(express.static(path.join(__dirname, '../../frontend/out')));

// Handle all other routes - serve frontend index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/out/index.html'));
});

module.exports = app;
