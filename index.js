const express = require("express");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to serve static files
app.use(express.static("public"));

// Route to fetch open-source projects from GitHub
app.get("/api/projects", async (req, res) => {
  const { language } = req.query; // Get the language query parameter
  let query = "stars:>10000+is:public";

  // If a language is provided, add it to the query
  if (language) {
    query += `+language:${language}`;
  }

  try {
    const response = await axios.get(
      "https://api.github.com/search/repositories?q=stars:>10000+is:public&sort=stars&order=desc"
    );
    const projects = response.data.items.map((project) => ({
      name: project.name,
      full_name: project.full_name,
      description: project.description,
      url: project.html_url,
      stars: project.stargazers_count,
      language: project.language,
    }));
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch projects from GitHub" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
