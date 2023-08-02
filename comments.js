// Create web server and listen to port 3000
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const comments = require('./comments');

// Configure body-parser for express
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// GET /comments
app.get('/comments', (req, res) => {
  res.json(comments);
});

// GET /comments/:id
app.get('/comments/:id', (req, res) => {
  const comment = comments.find(comment => comment.id === Number(req.params.id));
  res.json(comment);
});

// POST /comments
app.post('/comments', (req, res) => {
  const lastId = comments[comments.length - 1].id;
  const newComment = { id: lastId + 1, ...req.body };
  comments.push(newComment);
  res.json(newComment);
});

// PUT /comments/:id
app.put('/comments/:id', (req, res) => {
  const comment = comments.find(comment => comment.id === Number(req.params.id));
  comment.body = req.body.body;
  res.json(comment);
});

// DELETE /comments/:id
app.delete('/comments/:id', (req, res) => {
  const commentIndex = comments.findIndex(comment => comment.id === Number(req.params.id));
  comments.splice(commentIndex, 1);
  res.json(comments);
});

// Start web server
app.listen(port, () => {
  console.log(`Web server is listening to http://localhost:${port}`);
});

