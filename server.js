import express from "express";
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/", (req, res) => {
  res.json({ message: "Received", data: req.bod });
});

app.listen(5100, () => {
  console.log("Server is running...");
});
