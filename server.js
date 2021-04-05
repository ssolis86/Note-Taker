const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path');
const dataBase = require('./db/db')
// uniqid offers the unique id functionality
const uniqid = require('uniqid');
console.log(uniqid.process());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/notes', (req, res) => 
{
  res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.post('/api/notes', (req, res) =>
{
  notesData.push(req.body);
  res.json(dataBase);
})
//
app.post('api/notes', (req, res) => 
{
  req.body.id = uniqid.process();
  console.log(uniqid.process());
})

app.get('*', (req,res) => 
{
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));