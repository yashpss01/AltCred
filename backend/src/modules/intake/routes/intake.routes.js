const express = require("express")
const router = express.Router()
const { authGaurd } = require("../../auth/middlewares/auth.guard")
const intakeValidator = require("../validators/intake.validator")
const { saveAnswers } = require("../controllers/intake.controller")

router.post("/submit", authGaurd, intakeValidator, saveAnswers)

module.exports = router
