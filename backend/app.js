const express = require("express");
const cors = require("cors");
const recipeRouter = require("./routes/recipeRouter");
const globalErrorHandler = require("./controllers/errorController");
const app = express();

app.use(cors());
// Access-Control-Allow-Origin *
// api.natours.com, front-end natours.com
// app.use(cors({
//   origin: 'https://www.natours.com'
// }))

app.options("*", cors());

app.use(express.json({ limit: "10kb" }));

// ROUTES
app.use("/api/v1/recipes", recipeRouter);

app.use(globalErrorHandler);

module.exports = app;
