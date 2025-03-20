import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mysql from "mysql2/promise";
import { getUser } from "./models/users.js";

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
export async function query(sql, params) {
  const [results] = await pool.execute(sql, params);
  return results;
}

// Skapa användare - Create - Insert med sql
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
    res.status(500).send("Error creating user");
  }
});

// Logga in - Read - Select med sql
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await getUser(username, password);

    console.log("result", result);

    res.json(result);
  } catch (error) {
    res.status(500).send("Error login");
  }
});

// Uppdatera lösenord - Update
app.put("/new-password", async (req, res) => {
  const { userId, newPassword } = req.body;

  try {
    const sql = "UPDATE users SET password = ? WHERE id = ?";
    const params = [newPassword, userId];

    const result = await query(sql, params);

    res.json(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.delete("/users", async (req, res) => {
  const { userId } = req.body;

  try {
    const sql = "DELETE FROM users WHERE id = ?";
    const params = [userId];

    const result = await query(sql, params);

    res.json(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Starta servern
app.listen(port, () => {
  console.log(`Bankens backend körs på http://localhost:${port}`);
});
