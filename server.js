const express = require("express");
const mongoose = require("mongoose");

const auth = require("./routes/api/auth");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");

const app = express();

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to DB
mongoose
  .connect(db)
  .then(() => console.log("db connected"))
  .catch(err => onsole.log(err));

app.get("/", (req, res) => res.send("hello!!!!"));

app.use("/api/auth", auth);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
