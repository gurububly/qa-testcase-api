const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

const DATA_FILE = "submissions.json";

// Helper to read/write submissions
function readSubmissions() {
  if (!fs.existsSync(DATA_FILE)) return [];
  return JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
}
function writeSubmissions(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

// POST /submit
app.post("/submit", (req, res) => {
  const submission = req.body;
  const submissions = readSubmissions();
  submissions.push(submission);
  writeSubmissions(submissions);
  res.json({ success: true });
});

// GET /results
app.get("/results", (req, res) => {
  const submissions = readSubmissions();
  res.json(submissions);
});

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});