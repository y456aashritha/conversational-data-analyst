
import pool from "./config/database";
import { detectIntent } from "./services/intent.service";
import { executeIntent } from "./services/query.service";

async function testQueries() {
  const questions = [
    "Show monthly applications",
    "Which branch has the highest rejection rate?",
    "Compare Retail and SME applications",
    "Show top customers by transaction value"
  ];

  try {
    for (const question of questions) {
      const intent = detectIntent(question);
      const result = await executeIntent(intent);

      console.log("\nQuestion:", question);
      console.log("Intent:", intent);
      console.log("Result:", result);
    }
  } catch (error) {
    console.error("Query test failed:", error);
  } finally {
    await pool.end();
  }
}

testQueries();
