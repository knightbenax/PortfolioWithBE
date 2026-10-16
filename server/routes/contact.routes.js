const router = require('express').Router();
const contacts = require('../controllers/contact.controller');

// Retrieve all contacts
router.get('/', contacts.findAll);

// Retrieve a single contact with id
router.get('/:id', contacts.findOne);

// Create a new contact
router.post('/', contacts.create);

// Update a contact with id
router.put('/:id', contacts.update);

// Delete a contact with id
router.delete('/:id', contacts.delete);

// Delete all contacts
router.delete('/', contacts.deleteAll);

module.exports = router;