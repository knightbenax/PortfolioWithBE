const router = require('express').Router();
const projects = require('../controllers/project.controller');
const auth = require('../controllers/auth.controller');

// Retrieve all projects
router.get('/', projects.findAll);

// Retrieve a single project with id
router.get('/:id', projects.findOne);

// Create a new project
router.post('/', auth.requireSignin, auth.requireAdmin, projects.create);

// Update a project with id
router.put('/:id', auth.requireSignin, auth.requireAdmin, projects.update);

// Delete a project with id
router.delete('/:id', auth.requireSignin, auth.requireAdmin, projects.delete);

// Delete all projects
router.delete('/', auth.requireSignin, auth.requireAdmin, projects.deleteAll);

module.exports = router;
