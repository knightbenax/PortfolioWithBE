const router = require('express').Router();
const contacts = require('../controllers/contact.controller');
const auth = require('../controllers/auth.controller');

// Retrieve all contacts
router.get('/', contacts.findAll);

// Retrieve a single contact with id
router.get('/:id', contacts.findOne);

// Create a new contact
router.post('/', contacts.create);

// Update a contact with id
router.put('/:id', auth.requireSignin, auth.requireAdmin, contacts.update);

// Delete a contact with id
router.delete('/:id', auth.requireSignin, auth.requireAdmin, contacts.delete);

// Delete all contacts
router.delete('/', auth.requireSignin, auth.requireAdmin, contacts.deleteAll);

module.exports = router;
