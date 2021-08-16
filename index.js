const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");

const path = require("path");
const bodyParser = require("body-parser");
const MongoDBStore = require("connect-mongodb-session")(session);

const app = express();

const MONGODB_URI = "mongodb://localhost:27017/mello_task_users";
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: "sessions",
});

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

app.use(bodyParser.json());

const userRoutes = require("./routes/user");
const taskRoutes = require("./routes/task");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

// import routes
app.use(userRoutes);
app.use(taskRoutes);

const PORT = 5000;

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(PORT, () => {
  console.log(`Connection successful on http://localhost:${PORT}`);
});
