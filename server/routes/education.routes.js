const router = require('express').Router();
const educations = require('../controllers/education.controller');
const auth = require('../controllers/auth.controller');

// Retrieve all education records
router.get('/', educations.findAll);

// Retrieve a single education record with id
router.get('/:id', educations.findOne);

// Create a new education record
router.post('/', auth.requireSignin, auth.requireAdmin, educations.create);

// Update an education record with id
router.put('/:id', auth.requireSignin, auth.requireAdmin, educations.update);

// Delete an education record with id
router.delete('/:id', auth.requireSignin, auth.requireAdmin, educations.delete);

// Delete all education records
router.delete('/', auth.requireSignin, auth.requireAdmin, educations.deleteAll);

module.exports = router;
