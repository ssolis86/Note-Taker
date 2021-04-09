
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path');
const dataBase = require('./db/db.json');
const uniqid = require('uniqid');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//Add notes to list
app.post('/api/notes', (req, res) => 
{
  req.body.id = `${uniqid.process()}`;
  dataBase.push(req.body);
  res.json(dataBase);
});
// Delete notes from list
app.delete('/api/notes/:id', (req, res) =>
{ 
  dataBase.forEach(function(note, index, object)
  {
    if (note.id === req.params.id) {
      object.splice(index, 1);
    }
  })
  res.json(dataBase);
});

app.get('/api/notes', (req, res) =>
{
  res.json(dataBase);
});

app.get('/notes', (req, res) => 
{
  res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('*', (req,res) => 
{
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));