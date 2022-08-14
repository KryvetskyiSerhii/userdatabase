const database = require("./database");

const getUsers = (req, res) => {
  database
    .query("select * from users")
    .then(([users]) => {
      res.json(users);
    })
    .catch((err) =>
      res.status(500).send("Error retrieving data from the database")
    );
};

const getUserById = (req, res) => {
  const id = parseInt(req.params.id);

  database
    .query(`select * from users where id=?`, [id])
    .then(([users]) => {
      if (users.length > 0) res.json(users);
      else res.status(404).send("There is no such a movie");
    })

    .catch((err) => res.status(500).send("connection error"));
};

const postUser = (req, res) => {
  const { firstname, lastname, email, city, language } = req.body;
  database
    .query(
      "insert into users (firstname, lastname, email, city, language) values (?, ?, ?, ?, ?)",
      [firstname, lastname, email, city, language]
    )
    .then(([result]) => {
      res.location(`/api/users/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      res.status(500).send("Error adding the user");
    });
};

const putUsers = (req, res) => {
  const id = req.params.id;
  const { firstname, lastname, email, city, language } = req.body;
  database
    .query(
      "update users set firstname=?, lastname=?, email=?, city=?, language=? where id=?",
      [firstname, lastname, email, city, language, id]
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
  getUsers,
  getUserById,
  postUser,
  putUsers,
};
