const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 5000;

app.get('/', async (req, res) => {
    try {
        const response = await axios.get('https://api.github.com/search/repositories?q=stars:%3E1&sort=stars&order=desc');
        const projects = response.data.items;

        // Render the projects on the screen
        res.send(projects.map(project => project.full_name).join('\n'));
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching projects');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});