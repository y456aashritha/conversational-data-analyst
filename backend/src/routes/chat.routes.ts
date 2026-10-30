
import { Router, Request, Response } from "express";
import { z } from "zod";
import { detectIntent } from "../services/intent.service";
import { executeIntent } from "../services/query.service";

const router = Router();

// Validate the question received from React
const chatSchema = z.object({
  question: z.string().trim().min(3).max(500)
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const validation = chatSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        success: false,
        error: "Please enter a valid question (3–500 characters)."
      });
    }

    const question = validation.data.question;

    // Identify the user's intention
    const intent = detectIntent(question);

    if (intent === "UNKNOWN") {
      return res.status(400).json({
        success: false,
        error: "Sorry, I cannot understand this question. Try one of the suggested banking analytics questions."
      });
    }

    // Execute the approved SQL query
    const data = await executeIntent(intent);

    return res.status(200).json({
      success: true,
      intent,
      answer: `Here are the results for: ${question}`,
      data
    });

  } catch (error) {
    console.error("Chat API error:", error);

    return res.status(500).json({
      success: false,
      error: "Something went wrong while processing your question."
    });
  }
});

export default router;
