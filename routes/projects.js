const express = require('express');
const { getProjects } = require('../filter/filterProject');

const router = express.Router();

// Route to get all projects from GitHub and sort by language
router.get('/', getProjects);

module.exports = router;
