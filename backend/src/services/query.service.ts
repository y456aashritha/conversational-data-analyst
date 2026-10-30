
import pool from "../config/database";
import { Intent } from "./intent.service";

export async function executeIntent(intent: Intent): Promise<unknown> {
  let sql: string;

  switch (intent) {

    case "MONTHLY_APPLICATIONS":
      sql = `
        SELECT
          DATE_FORMAT(application_date, '%Y-%m') AS month,
          COUNT(*) AS total_applications
        FROM applications
        GROUP BY month
        ORDER BY month;
      `;
      break;

    case "BRANCH_REJECTIONS":
      sql = `
        SELECT
          b.branch_name,
          COUNT(*) AS total_applications,
          SUM(CASE WHEN a.status = 'Rejected' THEN 1 ELSE 0 END)
            AS rejected_applications,
          ROUND(
            SUM(CASE WHEN a.status = 'Rejected' THEN 1 ELSE 0 END)
            * 100.0 / COUNT(*), 2
          ) AS rejection_rate
        FROM applications a
        JOIN branches b ON a.branch_id = b.id
        GROUP BY b.id, b.branch_name
        ORDER BY rejection_rate DESC;
      `;
      break;

    case "SEGMENT_COMPARISON":
      sql = `
        SELECT
          c.segment,
          COUNT(*) AS total_applications
        FROM applications a
        JOIN customers c ON a.customer_id = c.id
        GROUP BY c.segment
        ORDER BY total_applications DESC;
      `;
      break;

    case "TOP_CUSTOMERS":
      sql = `
        SELECT
          c.customer_name,
          SUM(t.amount) AS total_transaction_value
        FROM transactions t
        JOIN customers c ON t.customer_id = c.id
        GROUP BY c.id, c.customer_name
        ORDER BY total_transaction_value DESC
        LIMIT 5;
      `;
      break;

    default:
      throw new Error("Unsupported analytics intent");
  }

  const [rows] = await pool.query(sql);
  return rows;
}
