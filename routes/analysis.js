app.get('/api/company-info', async (req, res) => {
    const companyName = req.query.name;
    try {
      const response = await axios.get(
        `https://api.opencorporates.com/v0.4/companies/search?q=${companyName}`
      );
      res.json(response.data);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error fetching company data');
    }
  });
  