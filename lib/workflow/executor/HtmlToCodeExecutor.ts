import { ExecutionEnvironment } from "@/types/executor";
import { HtmlToCodeTask } from "../task/HtmlToCode";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function HtmlToCodeExecutor(
  environment: ExecutionEnvironment<typeof HtmlToCodeTask>
): Promise<boolean> {
  try {
    const html = environment.getInput("Html");
    if (!html) {
      environment.log.error("HTML input not provided");
      return false;
    }

    const apiKey = process.env.GOOGLE_API_KEY!;
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Convert the following HTML into clean, production-ready React components using Tailwind CSS.
    Return ONLY the code without any markdown formatting or explanation.
    Ensure proper indentation and formatting in the code.`;

    const response = await model.generateContent([
      { text: prompt },
      { text: html },
    ]);

    // Access the response
    const result = response?.response?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!result) {
      environment.log.error("Empty response from Gemini");
      return false;
    }

    // Clean up the response
    let cleanedCode = result.trim();
    
    // If the response contains markdown code blocks, extract just the code
    if (cleanedCode.includes("```")) {
      const codeBlockMatch = cleanedCode.match(/```(?:jsx|js|react)?\n([\s\S]*?)```/);
      if (codeBlockMatch && codeBlockMatch[1]) {
        cleanedCode = codeBlockMatch[1].trim();
      } else {
        // Try to extract code between the first and last code block markers
        const startIndex = cleanedCode.indexOf("```") + 3;
        const endIndex = cleanedCode.lastIndexOf("```");
        
        if (startIndex > 3 && endIndex > startIndex) {
          // Skip any language identifier after the first ```
          const newlineAfterTicks = cleanedCode.indexOf("\n", startIndex - 3);
          if (newlineAfterTicks > startIndex - 3) {
            cleanedCode = cleanedCode.substring(newlineAfterTicks + 1, endIndex).trim();
          } else {
            cleanedCode = cleanedCode.substring(startIndex, endIndex).trim();
          }
        }
      }
    }
    environment.setOutput("Generated Code", cleanedCode);
    
    return true;
  } catch (error: any) {
    environment.log.error(error.message);
    return false;
  }
}
