const router = require("express").Router();
const userAuthController = require("../controllers/auth");
const taskController = require("../controllers/task");
const upload_image = require("../middleware/upload-user_image");
const userController = require("../controllers/user");
const isAuth = require("../middleware/is-auth");

router.post("/login", userAuthController.postUserLogin);
router.post(
  "/edit_profile",
  isAuth,
  upload_image.single("user_image"),
  userController.editUserProfile
);
router.post("/change_password", isAuth, userController.postChangePassword);

router.post("/register", userAuthController.postUserRegister);
router.post("/logout", userAuthController.postUserLogout);

module.exports = router;
