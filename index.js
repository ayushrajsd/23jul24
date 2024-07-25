const express = require("express");

// create an express application
const app = express();
app.use(express.json());

const loggerMiddleware = (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next(); // call the next middleware or route handler
};

// app.use(loggerMiddleware);

// define a route
app.get("/", (req, res) => {
  res.send("Hello, Express");
});

app.get("/about", (req, res) => {
  res.send(" This is the about page");
});
app.post("/data", (req, res) => {
  console.log("req obj", req.body);
  res.send("received a new POST request");
});

const users = [
  { id: 1, name: "User 1" },
  { id: 2, name: "User 2" },
];

app.post("/users", (req, res) => {
  const newUser = req.body; // {name:node}
  const userId = users.length + 1; // 2 + 1 = 3 -> userId = 3
  newUser.id = userId; // {name:node, id:3}
  users.push(newUser);
  res.status(201).json({ message: "User created", user: newUser });
});

// delete the user

app.delete("/users/:id", (req, res) => {
  // /users/1
  const userId = req.params.id;
  // find the user index matching the userId
  const userIndex = users.findIndex((user) => user.id == userId);
  if (userIndex == -1) {
    return res.status(404).json({ message: "User not found" });
  }

  // remove the user from the array
  users.splice(userIndex, 1);
  res.json({ message: "User deleted" });
});

app.get("/users", (req, res) => {
  res.json(users);
});

app.get("/special", loggerMiddleware, (req, res) => {
  res.send("This is a special page");
});

app.use((req, res) => {
  res.status(404).send("Page not found");
});

// start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
