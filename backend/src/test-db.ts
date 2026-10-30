
import pool from "./config/database";

async function testConnection() {
  try {
    const [rows] = await pool.query("SELECT VERSION() AS mysql_version");

    console.log("MySQL connected successfully!");
    console.log(rows);
  } catch (error) {
    console.error("MySQL connection failed:", error);
  } finally {
    await pool.end();
  }
}

testConnection();
