const router = require('express').Router();
const users = require('../controllers/user.controller');
const auth = require('../controllers/auth.controller');

// Public signup always creates a regular user; clients cannot self-assign admin.
router.post('/', users.create);
router.get('/', auth.requireSignin, auth.requireAdmin, users.findAll);
router.get('/:id', auth.requireSignin, users.findOne);
router.put('/:id', auth.requireSignin, users.update);
router.delete('/:id', auth.requireSignin, auth.requireAdmin, users.delete);

module.exports = router;
