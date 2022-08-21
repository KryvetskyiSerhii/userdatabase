const express = require("express");
require("dotenv").config();
const app = express();
app.use(express.json());
const port = process.env.APP_PORT ?? 5010;

const welcome = (req, res) => {
  res.send("Welcome to the users list");
};

app.get("/", welcome);

const userHandlers = require("./userHandlers");
const movieHandlers = require("./movieHandlers");
const { validateMovie, validateUser } = require("./validator");

app.get("/api/users", userHandlers.getUsers);
app.get("/api/users/:id", userHandlers.getUserById);
app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);
app.post("/api/movies", validateMovie, movieHandlers.postMovies);
app.post("/api/users", validateUser, userHandlers.postUser);
app.put("/api/movies/:id", validateMovie, movieHandlers.putMovies);
app.put("/api/users/:id", validateUser, userHandlers.putUsers);
app.delete("/api/movies/:id", movieHandlers.deleteMovie);
app.delete("/api/users/:id", userHandlers.deleteUser);

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
