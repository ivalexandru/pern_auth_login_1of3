const express = require("express");
const app = express();
const cors = require("cors");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" }); //point to the file
const PORT = process.env.PORT;
const jwt = require("jsonwebtoken");

app.use(cors());
app.use(express.json());

const users = [];
app.get("/users", (req, res) => {
  res.json(users);
});

app.post("/users", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const user = { name: req.body.name, password: hashedPassword };
    users.push(user);
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json("user NOT created");
  }
});

app.post("/users/login", async (req, res) => {
  const user = users.find((user) => user.name === req.body.name);
  console.log(user);
  if (user == null) {
    return res.status(400).json("cannot find user");
  }
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      console.log(`user.password is ${user.password}`);
      res.status(200).json("user is logged in");
    } else {
      res.status(500).json("passwords do not match");
    }
  } catch (err) {
    res.status(500).json("user NOT allowed here");
  }
});

const posts = [
  {
    username: "Kyle",
    title: "Post 1",
  },
  {
    username: "ana",
    title: "Post 2",
  },
];

app.get("/posts", (req, res) => {
  res.status(200).json(posts);
});

app.post("/login", (req, res) => {
  //auth user
});

app.listen(PORT, (req, res) => {
  console.log(`s up on p ${PORT}`);
});
