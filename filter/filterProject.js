const axios = require('axios');

const GITHUB_API_URL = 'https://api.github.com';

const getProjects = async (req, res) => {
  try {
    const { data } = await axios.get(`${GITHUB_API_URL}/search/repositories`, {
      params: {
        q: 'stars:>100', // Query for popular open-source projects
        sort: 'stars', // Sort by stars
        order: 'desc',
        per_page: 100, // Number of repositories to fetch
      },
      headers: {
        Authorization: `token ${process.env.GITHUB_TOKEN}`,
      },
    });

    // Extract and sort projects by language
    const sortedProjects = data.items.sort((a, b) => {
      const langA = a.language || '';
      const langB = b.language || '';
      return langA.localeCompare(langB);
    });

    res.json(sortedProjects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { getProjects };
