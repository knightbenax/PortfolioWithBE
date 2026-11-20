const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const { expressjwt } = require('express-jwt');
const config = require('../../config/config'); // Adjust path based on your structure

const signin = async (req, res) => {
  try {
    let user = await User.findOne({ "email": req.body.email });
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    if (!user.authenticate(req.body.password)) {
      return res.status(401).send({ error: "Email and password don't match." });
    }

    const token = jwt.sign({ _id: user._id, role: user.role }, config.jwtSecret, { expiresIn: '7d' });

    res.cookie('t', token, { httpOnly: true, sameSite: 'lax', secure: config.env === 'production', maxAge: 7 * 24 * 60 * 60 * 1000 });

    return res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    return res.status(401).json({ error: "Could not sign in" });
  }
};

const signout = (req, res) => {
  res.clearCookie("t");
  return res.status(200).json({ message: "signed out" });
};

// Middleware to verify JWT token
const requireSignin = expressjwt({
  secret: config.jwtSecret,
  algorithms: ["HS256"],
  userProperty: 'auth'
});

// Middleware to check if the user is authorized to modify/delete the profile
const hasAuthorization = (req, res, next) => {
  const authorized = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!authorized) {
    return res.status(403).json({ error: "User is not authorized" });
  }
  next();
};

const requireAdmin = (req, res, next) => {
  if (req.auth && req.auth.role === 'admin') return next();
  return res.status(403).json({ error: 'Admin access required.' });
};

module.exports = {
  signin,
  signout,
  requireSignin,
  hasAuthorization,
  requireAdmin
};
