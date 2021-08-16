const router = require("express").Router();
const userAuthController = require("../controllers/auth");
const taskController = require("../controllers/task");
const upload_image = require("../middleware/upload-user_image");
const userController = require("../controllers/user");
const isAuth = require("../middleware/is-auth");

router.get("/delete_tasks/:id", isAuth, taskController.deleteTodoTask);
router.post("/add_tasks", isAuth, taskController.postTodoTask);
router.get("/get_tasks", isAuth, taskController.getTodoTask);
router.post("/edit_tasks/:id", isAuth, taskController.editTodoTask);

module.exports = router;
