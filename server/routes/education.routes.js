const router = require('express').Router();
const educations = require('../controllers/education.controller');

// Retrieve all education records
router.get('/', educations.findAll);

// Retrieve a single education record with id
router.get('/:id', educations.findOne);

// Create a new education record
router.post('/', educations.create);

// Update an education record with id
router.put('/:id', educations.update);

// Delete an education record with id
router.delete('/:id', educations.delete);

// Delete all education records
router.delete('/', educations.deleteAll);

module.exports = router;