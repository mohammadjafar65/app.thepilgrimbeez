// routes/student.js
module.exports = (app, db) => {
  // Route to get all users
  app.get("/users", (req, res) => {
    const sql = "SELECT * FROM user";
    db.query(sql, (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Error fetching users" });
      }
      return res.json(data);
    });
  });

  // Route to create a new user
  app.post("/users/create", (req, res) => {
    const sql = "INSERT INTO user (`Name`, `Email`) VALUES (?, ?)";
    const values = [req.body.name, req.body.email];

    db.query(sql, values, (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Error creating user" });
      }
      return res.json({ message: "User created successfully", data });
    });
  });

  // Route to update a user
  app.put("/users/update/:id", (req, res) => {
    const sql = "UPDATE user SET `Name` = ?, `Email` = ? WHERE `ID` = ?";
    const values = [req.body.name, req.body.email];
    const id = req.params.id;

    db.query(sql, [...values, id], (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Error updating user" });
      }
      return res.json({ message: "User updated successfully", data });
    });
  });

  // Route to delete a user
  app.delete("/users/:id", (req, res) => {
    const sql = "DELETE FROM user WHERE `ID` = ?";
    const id = req.params.id;
    db.query(sql, id, (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Error deleting user" });
      }
      return res.json({ message: "User deleted successfully", data });
    });
  });
};