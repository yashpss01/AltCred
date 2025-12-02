const express = require("express");
const { register, login, refreshToken, getMe } = require("../controllers/auth.controller");
const { authGaurd } = require("../middlewares/auth.guard");
const validate = require("../../../middlewares/validate.middleware");
const { registerSchema, loginSchema, refreshTokenSchema } = require("../validators/auth.schema");

const router = express.Router();

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
router.post("/refresh-token", validate(refreshTokenSchema), refreshToken);
router.get("/me", authGaurd, getMe);

module.exports = router;
