const database = require("./database");

const getMovies = (req, res) => {
  database
    .query("select * from movies")
    .then(([movies]) => {
      res.status(200).json(movies);
    })
    .catch((err) => {
      res.status(500).send("Cannot retrieve the data");
    });
};

const getMovieById = (req, res) => {
  const id = parseInt(req.params.id);
  database
    .query("select * from movies where id=?", [id])
    .then(([movies]) => {
      if (movies.length > 0) res.status(200).json(movies);
      else res.status(404).send("Not found");
    })
    .catch((err) => {
      res.status(500).send("No data");
    });
};

const postMovies = (req, res) => {
  const { title, director, year, color, duration } = req.body;
  database
    .query(
      "insert into movies (title, director, year, color, duration) values (?, ?, ?, ?, ?)",
      [title, director, year, color, duration]
    )
    .then(([result]) => {
      res.location(`/api/movies/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      res.status(500).send("Error saving a movie");
    });
};

const putMovies = (req, res) => {
  const id = req.params.id;
  const { title, director, year, color, duration } = req.body;
  database
    .query(
      "update movies set title=?, director=?, year=?, color=?, duration=? where id=?",
      [title, director, year, color, duration, id]
    )
    .then(([result]) => {
      if (result.affectedRows === 0) res.status(404).send("Not Found");
      else res.sendStatus(204);
    })
    .catch((err) => {
      res.status(500).send("Error changing data");
    });
};

module.exports = {
  getMovieById,
  getMovies,
  postMovies,
  putMovies,
};
