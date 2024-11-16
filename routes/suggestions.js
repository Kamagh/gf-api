app.get('/api/analysis', async (req, res) => {
    const selectedCompetitors = req.query.competitors; // Array of competitor names
    try {
      const prompt = `Provide a summary analysis for the following companies: ${selectedCompetitors.join(
        ', '
      )}. Include details such as investors, funding, revenue, market share, etc.`;
  
      const response = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: prompt,
        max_tokens: 500,
      });
  
      const analysis = response.data.choices[0].text.trim();
      res.json({ analysis });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error generating analysis');
    }
  });
  