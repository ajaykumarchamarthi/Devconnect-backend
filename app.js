const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const app = express();

const AppError = require("./utils/AppError");
const globalErrorHandler = require("./controller/errorController");

// Global Middlewares

// Set Security HTTP headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Importing Routes
const userRouter = require("./routes/userRoutes");
const questionRouter = require("./routes/questionRoutes");
const answerRouter = require("./routes/answerRoutes");
const jobRouter = require("./routes/jobRoutes");

// CORS // Access-Control-Allow-Origin * (all users)

app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Origin",
    "https://devconnect-app.netlify.app"
  );
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Methods",
    "GET,PUT,PATCH,POST,DELETE,OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,content-type,application/json"
  );
  next();
});

app.use(
  cors({
    origin: "https://devconnect-app.netlify.app",
    credentials: true,
  })
);

app.options(
  "*",
  cors({
    origin: "https://devconnect-app.netlify.app",
    credentials: true,
  })
);

// Limit requests from same API
const limiter = rateLimit({
  max: 500,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!",
});

// Middlewares
app.use("/api", limiter);

// Data sanitization NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Body parser, reading data from from body into req.body
app.use(express.json({ limit: "10kb" }));

//Mounting Routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/questions", questionRouter);
app.use("/api/v1/answers", answerRouter);
app.use("/api/v1/jobs", jobRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
