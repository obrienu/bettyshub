const User = require("../model/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

const secretKey = process.env.SECRET_KEY || config.get("secretkey");
const code = config.get("adminCode");

exports.registerUser = (req, res) => {
  const username = req.sanitize(req.body.username);
  const password = req.sanitize(req.body.password);
  const cpassword = req.sanitize(req.body.cpassword);
  const email = req.sanitize(req.body.email);
  const mobile = req.sanitize(req.body.mobile);
  const adminCode = req.sanitize(req.body.adminCode);

  if (!email || !username || !password || !cpassword || !adminCode || !mobile)
    return res.status(400).json("Please Enter All Fields");
  if (password !== cpassword)
    return res.status(400).json("Password and Cpassword must be the same");
  if (adminCode != code) return res.status(400).json("Invalid Admin Code");

  const newUser = new User({
    username,
    email,
    password,
    mobile
  });
  User.findOne({ email }, (err, email) => {
    if (err) return res.status(400).json("Server Error, Please Try Again");

    if (email) return res.status(400).json("Email Already Exists");

    bcrypt.genSalt(10, (err, salt) => {
      try {
        if (err) throw err;
        bcrypt
          .hash(newUser.password, salt)
          .then(hash => {
            newUser.password = hash;
            newUser.save().then(user => {
              jwt.sign(
                { id: user._id },
                secretKey,
                { expiresIn: 3600 },
                (err, token) => {
                  if (err)
                    return res.status(400).json("Cannot sign user token");

                  res.json({
                    token,
                    user: {
                      username: user.username,
                      id: user._id,
                      email: user.email
                    }
                  });
                }
              );
            });
          })
          .catch(err => res.status(400).json("error registering user"));
      } catch (err) {
        res.status(400).json("Server Error, Please Try Again");
      }
    });
  });
};

exports.login = (req, res) => {
  const email = req.sanitize(req.body.email);
  const password = req.sanitize(req.body.password);

  if (!email || !password)
    return res.status(400).json("Please Enter All Fields");

  User.findOne({ email }, (err, user) => {
    if (err) return res.status(400).json("Server Error Try Again");
    if (!user) return res.status(400).json("User Does Not Exist");

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) return res.status(400).json("Error matching password");
      if (!isMatch) return res.status(400).json("Invalid Credentials");

      jwt.sign(
        { id: user._id },
        secretKey,
        { expiresIn: 3600 },
        (err, token) => {
          if (err) {
            return res.status(400).json("Cannot sign user token");
          } else {
            res.json({
              token,
              user: {
                username: user.username,
                id: user._id,
                email: user.email,
                mobile: user.mobile
              }
            });
          }
        }
      );
    });
  });
};

exports.getUser = (req, res) => {
  User.findById(req.user.id)
    .select("-password -registeredAt")
    .then(user => {
      return res.json(user);
    })
    .catch(err => res.status(400).json("Cannot get user"));
};
