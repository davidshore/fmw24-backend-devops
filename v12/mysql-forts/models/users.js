import { query } from "../server.js";

export async function getUser(username, password) {
  const sql = "SELECT * FROM users WHERE username = ? and password = ?";
  const params = [username, password];
  return await query(sql, params);
}
