const cors = require("cors")

const allowedOrigins = [
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "http://localhost:4000",
  "http://localhost:5000",
  "http://localhost:3001",
  "https://alt-cred-1adk.vercel.app",
  "https://altcred-backend.onrender.com"
]

const corsOptions = cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true)

    const isVercel = origin.endsWith(".vercel.app");
    const isAllowed = allowedOrigins.indexOf(origin) !== -1;

    if (isAllowed || isVercel) {
      return callback(null, true);
    } else {
      const msg = "The CORS policy for this site does not allow access from this origin.";
      return callback(new Error(msg), false);
    }
  },
  credentials: true
})

module.exports = corsOptions;
