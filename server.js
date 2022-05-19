const fs = require('fs');
const shortId = require('short-unique-id');
const path = require('path');
const db = require('./db/db')
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}))
const uid = new shortId({length: 10})

//create route to serve up db.json as json
app.get('/api/notes', (req, res) => {
    //res.sendFile(path.join(__dirname, "./db/db.json"))
    res.json(db);
});

//create route to serve up notes.html homepage
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
    
  });

  //create route to serve up index.html homepage
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
  });
app.post('/api/notes', (req, res) => {
    const note = req.body;
    note.id = uid()
    db.push(note)
    fs.writeFileSync("./db/db.json", JSON.stringify(db))
    res.json(db);
   // res.sendFile(path.join(__dirname, "./db/db.json"))
})
app.listen(PORT, ()=> {
    console.log(`API server now on port 3001!`);
}) 

