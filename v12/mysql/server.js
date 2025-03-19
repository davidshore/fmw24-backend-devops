import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mysql from "mysql2/promise";

const app = express();

app.use(bodyParser.json());
app.use(cors());

const port = 3003;

const pool = mysql.createPool({
  user: "root",
  password: "root",
  host: "localhost",
  database: "bank",
  port: 8889,
});

// help function to make code look nicer
async function query(sql, params) {
  const [results] = await pool.execute(sql, params);
  return results;
}

app.post("/users", async (req, res) => {
  console.log("req.body", req.body);
  const { username, password } = req.body;

  try {
    const sql = "INSERT INTO users (username, password) VALUES (?, ?)";
    const params = [username, password];
    const result = await query(sql, params);
    console.log("result", result);
    res.send("User created");
  } catch (error) {
    res.status(500).send("Error creating user", error);
  }
});

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Starta servern
app.listen(port, () => {
  console.log(`Bankens backend körs på http://localhost:${port}`);
});
