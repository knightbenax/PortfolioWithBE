const User = require('../models/user.model');

// Get all users
exports.findAll = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Some error occurred while retrieving users.' });
  }
};

// Get a single user by ID
exports.findOne = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: `User not found with id ${req.params.id}` });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: `Error retrieving user with id=${req.params.id}` });
  }
};

// Create a new user
exports.create = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password cannot be empty!' });
    }

    const user = new User({ name, email, password });
    const data = await user.save();
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Some error occurred while creating the user.' });
  }
};

// Update a user by ID
exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    req.body.updated = Date.now(); // Update timestamp manually if needed
    
    const data = await User.findByIdAndUpdate(id, req.body, { useFindAndModify: false, new: true });
    
    if (!data) {
      return res.status(404).json({ message: `Cannot update user with id=${id}. User was not found!` });
    }
    res.status(200).json({ message: 'User was updated successfully.', data });
  } catch (error) {
    res.status(500).json({ message: `Error updating user with id=${req.params.id}` });
  }
};

// Delete a user by ID
exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await User.findByIdAndRemove(id);
    
    if (!data) {
      return res.status(404).json({ message: `Cannot delete user with id=${id}. User was not found!` });
    }
    res.status(200).json({ message: 'User was deleted successfully!' });
  } catch (error) {
    res.status(500).json({ message: `Could not delete user with id=${req.params.id}` });
  }
};

// Delete all users
exports.deleteAll = async (req, res) => {
  try {
    const data = await User.deleteMany({});
    res.status(200).json({ message: `${data.deletedCount} Users were deleted successfully!` });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Some error occurred while removing all users.' });
  }
};