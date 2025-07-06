const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all tasks
router.get('/', (req, res) => {
  db.all('SELECT * FROM tasks', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// ADD a task
router.post('/', (req, res) => {
  const { title, description, deadline, category } = req.body;
  const io = req.app.locals.io;  
  db.run(
    `INSERT INTO tasks (title, description, deadline, category) VALUES (?, ?, ?, ?)`,
    [title, description, deadline, category],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      const newTask = { id: this.lastID, title, description, deadline, category, is_completed: 0 };
      io.emit('taskAdded', newTask); 
      res.json({ id: this.lastID });
    }
  );
});

// Edit task route
router.put('/edit/:id', (req, res) => {
  const { title, description, deadline, category } = req.body;
  const io = req.app.locals.io;
  db.run(
    `UPDATE tasks SET title = ?, description = ?, deadline = ?, category = ? WHERE id = ?`,
    [title, description, deadline, category, req.params.id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      const updatedTask = { id: Number(req.params.id), title, description, deadline, category };
      io.emit('taskUpdated', updatedTask);
      res.json({ updated: this.changes });
    }
  );
});

// Update completion status
router.put('/:id', (req, res) => {
  const { is_completed } = req.body;
  const io = req.app.locals.io;
  db.run(
    `UPDATE tasks SET is_completed = ? WHERE id = ?`,
    [is_completed ? 1 : 0, req.params.id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });

      db.get(`SELECT * FROM tasks WHERE id = ?`, [req.params.id], (err2, updatedTask) => {
        if (err2) return res.status(500).json({ error: err2.message });

        io.emit('taskUpdated', updatedTask);  
        res.json({ updated: this.changes });
      });
    }
  );
});


// DELETE a task
router.delete('/:id', (req, res) => {
  const io = req.app.locals.io;
  db.run(`DELETE FROM tasks WHERE id = ?`, req.params.id, function (err) {
    if (err) return res.status(500).json({ error: err.message });
    io.emit('taskDeleted', Number(req.params.id));
    res.json({ deleted: this.changes });
  });
});

module.exports = router;
