// Example: Fetching Suggestions in Suggestions.js
import axios from 'axios';

const fetchSuggestions = async () => {
  try {
    const response = await axios.get(
      'http://localhost:5000/api/suggestions',
      { params: { input: companyInput } }
    );
    setSuggestions(response.data.suggestions);
  } catch (error) {
    console.error(error);
  }
};
