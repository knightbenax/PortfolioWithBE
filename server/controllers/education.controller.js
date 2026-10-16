const Education = require('../models/education.model');

// Get all educations
exports.findAll = async (req, res) => {
  try {
    const educations = await Education.find();
    res.status(200).json(educations);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Some error occurred while retrieving educations.' });
  }
};

// Get a single education by ID
exports.findOne = async (req, res) => {
  try {
    const education = await Education.findById(req.params.id);
    if (!education) {
      return res.status(404).json({ message: `Education not found with id ${req.params.id}` });
    }
    res.status(200).json(education);
  } catch (error) {
    res.status(500).json({ message: `Error retrieving education with id=${req.params.id}` });
  }
};

// Create new education record
exports.create = async (req, res) => {
  try {
    const { title, firstname, lastname, email, completion, description } = req.body;
    if (!title || !firstname || !lastname || !email || !completion || !description) {
      return res.status(400).json({ message: 'All education fields are required!' });
    }

    const education = new Education({ title, firstname, lastname, email, completion, description });
    const data = await education.save();
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Some error occurred while creating the education record.' });
  }
};

// Update an education record by ID
exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Education.findByIdAndUpdate(id, req.body, { useFindAndModify: false, new: true });
    
    if (!data) {
      return res.status(404).json({ message: `Cannot update education with id=${id}. Record was not found!` });
    }
    res.status(200).json({ message: 'Education record was updated successfully.', data });
  } catch (error) {
    res.status(500).json({ message: `Error updating education with id=${req.params.id}` });
  }
};

// Delete an education record by ID
exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Education.findByIdAndRemove(id);
    
    if (!data) {
      return res.status(404).json({ message: `Cannot delete education with id=${id}. Record was not found!` });
    }
    res.status(200).json({ message: 'Education record was deleted successfully!' });
  } catch (error) {
    res.status(500).json({ message: `Could not delete education with id=${req.params.id}` });
  }
};

// Delete all education records
exports.deleteAll = async (req, res) => {
  try {
    const data = await Education.deleteMany({});
    res.status(200).json({ message: `${data.deletedCount} Education records were deleted successfully!` });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Some error occurred while removing all education records.' });
  }
};