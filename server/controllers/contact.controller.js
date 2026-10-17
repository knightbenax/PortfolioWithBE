const Contact = require('../models/contact.model');

// Get all contacts
exports.findAll = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Some error occurred while retrieving contacts.' });
  }
};

// Get a single contact by ID
exports.findOne = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: `Contact not found with id ${req.params.id}` });
    }
    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ message: `Error retrieving contact with id=${req.params.id}` });
  }
};

// Create a new contact
exports.create = async (req, res) => {
  try {
    console.log(req.body);
    console.log(req);

    if (!req.body.firstname || !req.body.lastname || !req.body.email) {
      return res.status(400).json({ message: 'First name, last name, and email cannot be empty!' });
    }

    const contact = new Contact({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email
    });

    const data = await contact.save();
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Some error occurred while creating the contact.' });
  }
};

// Update a contact by ID
exports.update = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ message: 'Data to update can not be empty!' });
    }

    const id = req.params.id;
    const data = await Contact.findByIdAndUpdate(id, req.body, { useFindAndModify: false, new: true });
    
    if (!data) {
      return res.status(404).json({ message: `Cannot update contact with id=${id}. Contact was not found!` });
    }
    res.status(200).json({ message: 'Contact was updated successfully.', data });
  } catch (error) {
    res.status(500).json({ message: `Error updating contact with id=${req.params.id}` });
  }
};

// Delete a contact by ID
exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Contact.findByIdAndDelete(id);
    
    if (!data) {
      return res.status(404).json({ message: `Cannot delete contact with id=${id}. Contact was not found!` });
    }
    res.status(200).json({ message: 'Contact was deleted successfully!' });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: `Could not delete contact with id=${req.params.id}` });
  }
};

// Delete all contacts
exports.deleteAll = async (req, res) => {
  try {
    const data = await Contact.deleteMany({});
    res.status(200).json({ message: `${data.deletedCount} Contacts were deleted successfully!` });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Some error occurred while removing all contacts.' });
  }
};