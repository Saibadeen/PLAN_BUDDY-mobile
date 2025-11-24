import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;


app.use(cors());
app.use(express.json());


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);


const validateRequest = (req, res, next) => {
  const { goal, horizon } = req.body;
  if (!goal || typeof goal !== 'string') {
    return res.status(400).json({ error: 'Goal is required and must be a string' });
  }
  if (!horizon || !['today', 'week'].includes(horizon)) {
    return res.status(400).json({ error: 'Horizon must be "today" or "week"' });
  }
  next();
};


app.post('/plan', validateRequest, async (req, res) => {
  try {
    const { goal, horizon } = req.body;

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash"
    });

    const prompt = `You are a helpful planning assistant. Generate a structured plan based on the user's goal and time horizon.

Goal: ${goal}
Time Horizon: ${horizon}

Generate a plan with 3-5 tasks. Return ONLY valid JSON in this exact format:
{
  "tasks": [
    {
      "id": "unique-id-1",
      "title": "Task title",
      "dueDate": "YYYY-MM-DD",
      "priority": "low" | "medium" | "high",
      "notes": "Helpful tip or detail",
      "emoji": "📝"
    }
  ]
}

Important:
- Use appropriate due dates based on the time horizon (today = same day, week = within 7 days)
- Include relevant emojis for each task
- Make tasks specific and actionable
- Return ONLY the JSON object, no additional text`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    let text = response.text();
    text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    const plan = JSON.parse(text);
    res.json(plan);

  } catch (error) {
    console.error('Error generating plan:', error);
    res.status(500).json({
      error: 'Failed to generate plan',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
