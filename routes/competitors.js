const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.get('/api/suggestions', async (req, res) => {
  try {
    const userInput = req.query.input; // Get user input from query parameters
    const prompt = `List potential competitors for the following company: ${userInput}`;

    const response = await openai.createCompletion({
      model: 'gpt-3.5-turbo',
      prompt: prompt,
      max_tokens: 100,
    });

    const suggestions = response.data.choices[0].text.trim().split('\n');
    res.json({ suggestions });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error generating suggestions');
  }
});
