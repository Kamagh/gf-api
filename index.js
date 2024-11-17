// index.js
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const dotenv = require('dotenv');
const OpenAI = require('openai');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Make sure your API key is set
});


// Routes
app.post('/api/idea-analysis', async (req, res) => {
  const { idea } = req.body;

  try {
    const prompt = `Given the following business idea:\n"${idea}"\n\nIdentify the industry or field this idea belongs to. Then, provide a competitor analysis including a list of existing companies operating in this space, their key features, market share, funding, and any other relevant details. Summarize the findings in a clear and concise manner.`;

    const completion = await openai.completions.create({
      model: 'gpt-3.5-turbo-instruct',
      prompt: prompt,
      max_tokens: 1500,
      temperature: 0.7,
    });

    const analysis = completion.choices[0].text.trim();

    res.status(200).json({ analysis });
  } catch (error) {
    console.error('Error generating analysis:', error);
    res.status(500).json({ error: 'Failed to generate analysis' });
  }
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
