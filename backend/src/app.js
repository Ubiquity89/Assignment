const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());

// routes
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/deals", require("./routes/deal.routes"));
app.use("/api/claims", require("./routes/claim.routes"));

module.exports = app;
