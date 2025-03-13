import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const PORT = 4000;

const todos = [];

app.use(bodyParser.json());
app.use(cors());

app.get("/todos", (req, res) => {
  res.json(todos);
});

app.post("/todos", (req, res) => {
  const data = req.body;
  todos.push(data);

  console.log("In todos array: ", todos);

  res.send("Posts received");
});

app.listen(PORT, () => {
  console.log("Started on port: " + PORT);
});
