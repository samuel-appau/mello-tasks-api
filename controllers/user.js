const User = require("../models/user");
const bcrypt = require("bcryptjs");
const fs = require("fs");
const path = require("path");

const { use } = require("../routes/user");

exports.editUserProfile = (req, res, next) => {
  const userName = req.body.user_name;
  const userEmail = req.body.user_email;
  const userPhone = req.body.user_phone;
  var userImage = {
    data: fs.readFileSync(
      path.join(__dirname + "/uploads/" + req.file.filename)
    ),
    contentType: ["image/png", "image/jpeg"],
  };
  var user_id = req.session.user._id;

  User.findByIdAndUpdate(
    user_id,
    {
      userName: userName,
      userEmail: userEmail,
      userPhone: userPhone,
      userImage: userImage,
    },
    function (err, docs) {
      if (err) {
        res.json({ message: err });
      } else {
        res.json({ message: "Changes made successfully" });
      }
    }
  );
};

exports.postChangePassword = (req, res, next) => {
  const userPassword = req.body.user_password;
  const user_confirmPassword = req.body.user_confirm_password;
  var user_id = req.session.user._id;

  if (user_confirmPassword != userPassword) {
    return res.json({ message: "Password does not match" });
  } else {
    bcrypt.hash(userPassword, 12).then((hashedPassword) => {
      User.findByIdAndUpdate(
        user_id,
        {
          userPassword: hashedPassword,
        },
        function (err, docs) {
          if (err) {
            res.json({ message: err });
          } else {
            res.json({ message: "Password changed successfully" });
          }
        }
      );
    });
  }
};
