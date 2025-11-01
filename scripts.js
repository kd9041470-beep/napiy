// scripts/copy-404.js
const fs = require("fs");
const path = require("path");

const src = path.join(__dirname, "..", "dist", "index.html");
const dst = path.join(__dirname, "..", "dist", "404.html");

fs.copyFile(src, dst, (err) => {
  if (err) {
    console.error("Failed to copy 404.html:", err);
    process.exit(1);
  } else {
    console.log("404.html created successfully.");
  }
});
