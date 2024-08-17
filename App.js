const express = require('express');
const dotenv = require('dotenv');
const projectsRouter = require('./routes/projects');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Projects Route
app.use('/api/projects', projectsRouter);

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
