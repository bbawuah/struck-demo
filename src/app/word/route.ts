import OpenAI from "openai";
export const dynamic = "force-static";
import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";
import prisma from "../../lib/prisma";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const Word = z.object({
  word: z.string(),
  timestamp: z.coerce.date(),
  group: z.string(),
});

const Words = z.array(Word);

export async function GET(request: Request) {
  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: `
          Give me one random English word and group it into one of the following 10 categories: 
1. Nature, 
2. Technology, 
3. Emotions, 
4. Food, 
5. Animals, 
6. Objects, 
7. Professions, 
8. Places, 
9. Actions, 
10. Abstract concepts. 
Return it as a JSON object with the properties "word" and "group". The "group" value must match one of the 10 categories exactly. Do not add any explanation.
          `,
        },
      ],
      response_format: zodResponseFormat(Word, "word"),
      temperature: 1.0,
      max_tokens: 50,
    });

    console.log("OpenAI response:", completion.choices[0].message.content);

    if (!completion) {
      throw new Error("Failed to fetch random word");
    }

    if (!completion.choices || completion.choices.length === 0) {
      throw new Error("No choices returned from OpenAI");
    }

    if (!completion.choices[0]?.message?.content) {
      throw new Error("No content returned from OpenAI");
    }

    const word = completion.choices[0].message.content.trim();

    return Response.json({ word });
  } catch (error) {
    console.error("OpenAI error:", error);
    return Response.json({ error: "Failed to fetch random word" });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const parsed = Word.parse(JSON.parse(body.word));

    const created = await prisma.word.create({
      data: parsed,
    });

    return Response.json(created);
  } catch (err) {
    console.error("POST error:", err);
    return Response.json(
      { error: "Invalid input or failed to insert" },
      { status: 400 }
    );
  }
}
