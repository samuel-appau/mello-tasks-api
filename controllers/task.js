const Task = require("../models/tasks");
const User = require("../models/user");

exports.postTodoTask = (req, res, next) => {
  // const user=req.session.user._id;

  const title = req.body.title;
  const content = req.body.content;
  const status = req.body.status;
  const reminder = req.body.reminder;
  const favourite = req.body.favourite;

  const newTask = new Task({
    title: title,
    content: content,
    favourite: favourite,
    status: status,
    reminder: reminder,
    user: req.session.user,
  });

  return newTask
    .save()
    .then((result) => {
      res.json({ message: "Task added successfully" });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.deleteTodoTask = (req, res, next) => {
  const user_id = req.session.user._id;
  const task_id = req.params.id;

  Task.deleteOne({ user: user_id }).then((task) => {
    if ((task._id = task_id)) {
      return res.json({ message: "Task deleted successfully" });
    }
    return res.json({ message: "Could not delete task,Try again" });
  });
};

exports.getTodoTask = (req, res) => {
  const user_id = req.session.user._id;

  Task.find({ user: user_id })
    .then((task) => {
      if (!task) {
        return res.json({ message: "No task found" });
      }
      return res.json(task);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.editTodoTask = (req, res) => {
  const user_id = req.session.user._id;
  const task_id = req.params.id;
  const title = req.body.title;
  const content = req.body.content;
  const status = req.body.status;
  const reminder = req.body.reminder;
  const favourite = req.body.favourite;

  Task.findOneAndUpdate(
    { user: user_id },
    {
      title: title,
      content: content,
      favourite: favourite,
      status: status,
      reminder: reminder,
    },
    function (err, task) {
      if (task._id == task_id) {
        return res.json({ message: "Task has been edited" });
      }
      return res.json({ message: "Error" });
    }
  );
};
