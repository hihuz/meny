const fs = require("fs");

const keys = [
  "FIREBASE_API_KEY",
  "FIREBASE_AUTH_DOMAIN",
  "FIREBASE_DB_URL",
  "FIREBASE_PROJECT_ID",
  "FIREBASE_STORAGE_BUCKET",
  "FIREBASE_MESSAGING_ID"
];

const content = keys.map(key => `${key}=${process.env[key]}\n`).join("");

fs.writeFileSync("./.env", content);
