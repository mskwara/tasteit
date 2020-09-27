const express = require("express");
const path = require("path");
const cors = require("cors");
const recipeRouter = require("./routes/recipeRouter");
const userRouter = require("./routes/userRouter");
const reviewRouter = require("./routes/reviewRouter");
const cookieParser = require("cookie-parser");
const globalErrorHandler = require("./controllers/errorController");
const app = express();

app.use(cors());
// Access-Control-Allow-Origin *
// api.natours.com, front-end natours.com
// app.use(cors({
//   origin: 'https://www.natours.com'
// }))

app.options("*", cors());

// app.use(
//     cors({
//         origin: "http://localhost:3000",
//         credentials: true,
//     })
// );

app.use(express.json({ limit: "10kb" }));

app.use(cookieParser());

// Serve static files
app.use(express.static(path.join(__dirname, "../frontend/dist")));

// ROUTES
app.use("/api/v1/recipes", recipeRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/reviews", reviewRouter);

app.use(globalErrorHandler);

module.exports = app;
