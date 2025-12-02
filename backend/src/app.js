const express = require('express');
const helmet = require('helmet');
const rateLimiter = require("./modules/auth/middlewares/rateLimiter");
const apiCors = require("./modules/auth/middlewares/cors");
const errorHandler = require("./modules/auth/middlewares/errorHandler");
const authRoutes = require("./modules/auth/routes/auth.routes");
const intakeRoutes = require("./modules/intake/routes/intake.routes");
const creditScoreRoutes = require("./modules/credit-score/routes/creditScore.routes");
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./config/swagger.config');

const app = express();
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(apiCors);
app.use(helmet());
app.use(rateLimiter);

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/intake", intakeRoutes);
app.use("/api/v1/credit-score", creditScoreRoutes);

// API Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));


app.use((req, res) => {
  return res.status(404).json({
    success: false,
    message: "Route not found",
  });
});
app.use(errorHandler);

module.exports = app;