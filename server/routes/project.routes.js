const router = require('express').Router();
const projects = require('../controllers/project.controller');

// Retrieve all projects
router.get('/', projects.findAll);

// Retrieve a single project with id
router.get('/:id', projects.findOne);

// Create a new project
router.post('/', projects.create);

// Update a project with id
router.put('/:id', projects.update);

// Delete a project with id
router.delete('/:id', projects.delete);

// Delete all projects
router.delete('/', projects.deleteAll);

module.exports = router;