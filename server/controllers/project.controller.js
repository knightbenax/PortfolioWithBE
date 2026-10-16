const Project = require('../models/project.model');

// Get all projects
exports.findAll = async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Some error occurred while retrieving projects.' });
  }
};

// Get a single project by ID
exports.findOne = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: `Project not found with id ${req.params.id}` });
    }
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: `Error retrieving project with id=${req.params.id}` });
  }
};

// Create a new project
exports.create = async (req, res) => {
  try {
    const { title, firstname, lastname, email, completion, description } = req.body;
    if (!title || !firstname || !lastname || !email || !completion || !description) {
      return res.status(400).json({ message: 'All project fields are required!' });
    }

    const project = new Project({ title, firstname, lastname, email, completion, description });
    const data = await project.save();
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Some error occurred while creating the project.' });
  }
};

// Update a project by ID
exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Project.findByIdAndUpdate(id, req.body, { useFindAndModify: false, new: true });
    
    if (!data) {
      return res.status(404).json({ message: `Cannot update project with id=${id}. Project was not found!` });
    }
    res.status(200).json({ message: 'Project was updated successfully.', data });
  } catch (error) {
    res.status(500).json({ message: `Error updating project with id=${req.params.id}` });
  }
};

// Delete a project by ID
exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Project.findByIdAndRemove(id);
    
    if (!data) {
      return res.status(404).json({ message: `Cannot delete project with id=${id}. Project was not found!` });
    }
    res.status(200).json({ message: 'Project was deleted successfully!' });
  } catch (error) {
    res.status(500).json({ message: `Could not delete project with id=${req.params.id}` });
  }
};

// Delete all projects
exports.deleteAll = async (req, res) => {
  try {
    const data = await Project.deleteMany({});
    res.status(200).json({ message: `${data.deletedCount} Projects were deleted successfully!` });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Some error occurred while removing all projects.' });
  }
};