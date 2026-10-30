
export type Intent =
  | "MONTHLY_APPLICATIONS"
  | "BRANCH_REJECTIONS"
  | "SEGMENT_COMPARISON"
  | "TOP_CUSTOMERS"
  | "UNKNOWN";

export function detectIntent(question: string): Intent {
  const text = question.toLowerCase();

  if (
    text.includes("monthly") ||
    text.includes("per month") ||
    text.includes("each month")
  ) {
    return "MONTHLY_APPLICATIONS";
  }

  if (
    text.includes("rejection") ||
    text.includes("rejected") ||
    text.includes("branch")
  ) {
    return "BRANCH_REJECTIONS";
  }

  if (
    text.includes("retail") ||
    text.includes("sme") ||
    text.includes("segment")
  ) {
    return "SEGMENT_COMPARISON";
  }

  if (
    text.includes("top customers") ||
    text.includes("highest transaction") ||
    text.includes("transaction value")
  ) {
    return "TOP_CUSTOMERS";
  }

  return "UNKNOWN";
}
