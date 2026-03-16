import express from "express";

const app = express();

app.get("/hello", (req, res) => {
  res.json({ message: "hello vibecoding" });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
