
import { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  CartesianGrid, ResponsiveContainer
} from "recharts";
import "./App.css";

type Row = Record<string, string | number>;

type Result = {
  success: boolean;
  intent?: string;
  answer?: string;
  data?: Row[];
  error?: string;
};

const suggestions = [
  "Show monthly applications",
  "Which branch has the highest rejection rate?",
  "Compare Retail and SME applications",
  "Show top customers by transaction value"
];

function App() {
  const [question, setQuestion] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function askQuestion(value = question) {
    if (!value.trim()) return;

    setLoading(true);
    setError("");
    setResult(null);
    setQuestion(value);

    try {
      const response = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: value })
      });

      const data: Result = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to process question");
      }

      setResult(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  }

  function copyResults() {
    if (result?.data) {
      navigator.clipboard.writeText(
        JSON.stringify(result.data, null, 2)
      );
    }
  }

  const rows = result?.data ?? [];
  const columns = rows.length ? Object.keys(rows[0]) : [];

  const xKey = columns[0];

  const chartKey =
    result?.intent === "BRANCH_REJECTIONS"
      ? "rejection_rate"
      : result?.intent === "TOP_CUSTOMERS"
      ? "total_transaction_value"
      : "total_applications";

  return (
    <div className="app">
      <header className="header">
        <div>
          <h1>Banking Data Analyst</h1>
          <p>Conversational Business Intelligence Assistant</p>
        </div>
        <span className="status">● Analytics Ready</span>
      </header>

      <main className="container">
        <section className="welcome">
          <h2>Ask your banking data anything.</h2>
          <p>
            Explore applications, branch performance,
            customer segments and transaction trends.
          </p>
        </section>

        <section className="suggestions">
          <h3>Try these questions</h3>
          <div className="suggestion-list">
            {suggestions.map((item) => (
              <button
                key={item}
                className="suggestion"
                onClick={() => askQuestion(item)}
                disabled={loading}
              >
                {item}
              </button>
            ))}
          </div>
        </section>

        <section className="chat-box">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              askQuestion();
            }}
          >
            <input
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask a banking analytics question..."
              maxLength={500}
            />
            <button type="submit" disabled={loading}>
              {loading ? "Analyzing..." : "Ask"}
            </button>
          </form>
        </section>

        {loading && (
          <p className="loading">Analyzing your banking data...</p>
        )}

        {error && (
          <div className="error">
            <strong>Unable to process:</strong> {error}
          </div>
        )}

        {result && (
          <section className="results">
            <div className="result-heading">
              <div>
                <h2>Analysis Results</h2>
                <p>{result.answer}</p>
                <small>Intent: {result.intent}</small>
              </div>

              <button onClick={copyResults} className="copy-button">
                Copy Results
              </button>
            </div>

            {rows.length > 0 ? (
              <>
                <div className="table-container">
                  <h3>Data Table</h3>
                  <table>
                    <thead>
                      <tr>
                        {columns.map((column) => (
                          <th key={column}>{column.replaceAll("_", " ")}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {rows.map((row, index) => (
                        <tr key={index}>
                          {columns.map((column) => (
                            <td key={column}>{row[column]}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {rows.some(
                  (row) => typeof row[chartKey] === "number" ||
                    (row[chartKey] !== undefined &&
                     !Number.isNaN(Number(row[chartKey])))
                ) && (
                  <div className="chart-container">
                    <h3>Visual Analysis</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={rows}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey={xKey} />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey={chartKey} fill="#4169e1" />
                      </BarChart>
                    </ResponsiveContainer>
                    <small>Metric: {chartKey.replaceAll("_", " ")}</small>
                  </div>
                )}
              </>
            ) : (
              <p>No records found.</p>
            )}
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
