const User = require("../models/user");

const bcrypt = require("bcryptjs");
const { use } = require("../routes/user");

exports.postUserLogin = (req, res, next) => {
  const userEmail = req.body.user_email;
  const userPassword = req.body.user_password;

  User.findOne({
    userEmail: userEmail,
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send("User does not exist");
      }
      bcrypt
        .compare(userPassword, user.userPassword)
        .then((match) => {
          if (match) {
            console.log("Logged in successfully");
            req.session.loggedIn = true;
            req.session.user = user;
            return req.session.save((err) => {
              res.status(200).send("Logged in successfully");
            });
          } else {
            res.json({ message: "Invalid Password" });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => console.log(err));
};

exports.postUserRegister = (req, res, next) => {
  const userName = req.body.user_name;
  const userEmail = req.body.user_email;
  const userPhone = req.body.user_phone;
  const userPassword = req.body.user_password;
  const userImage = "";

  bcrypt
    .hash(userPassword, 12)
    .then((hashedPassword) => {
      const newUser = new User({
        userName: userName,
        userEmail: userEmail,
        userPhone: userPhone,
        userPassword: hashedPassword,
        userImage: userImage,
      });
      return newUser.save();
    })
    .then((result) => {
      console.log(result);
      res.status(200).send("Registered Successful");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postUserLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
  });
};
