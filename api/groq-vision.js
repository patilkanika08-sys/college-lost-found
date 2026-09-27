import Groq from "groq-sdk";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { image } = req.body;

    const apiKey = process.env.GROQ_API_KEY?.trim();

    if (!apiKey) {
      return res.status(500).json({
        error: "GROQ_API_KEY is missing",
      });
    }

    const groq = new Groq({
      apiKey: apiKey,
    });

    const response = await groq.chat.completions.create({
      model: "qwen/qwen3.8-27b",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Describe this image and identify the object.",
            },
            {
              type: "image_url",
              image_url: {
                url: image,
              },
            },
          ],
        },
      ],
    });

    return res.status(200).json({
      result: response.choices[0].message.content,
    });
  } catch (error) {
    console.error("Groq Vision Error:", error);

    return res.status(500).json({
      error: error.message,
    });
  }
}