const express = require('express');
const fs = require('fs');
const path = require('path');
const uuid = require('uuid');
const app = express();
const PORT = process.env.PORT || 3001;
// const db = require('./db/db.json');

app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// GET index.html

// GET notes.html
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))
});

// return all saved notes as json
app.get('/api/notes', (req, res) => {
    const db = JSON.parse(fs.readFileSync('./db/db.json'));
    return res.json(db);
});

app.post('/api/notes', (req, res) =>{
    const db = JSON.parse(fs.readFileSync('./db/db.json'));
    const newNote = {
        title: req.body.title,
        text: req.body.text
    };
    
    if (!newNote.title || !newNote.text) {
        return res.status(400).json({ msg: "Please include a title and some text" });
    }
    db.push(newNote);
    fs.writeFileSync('./db/db.json', JSON.stringify(db))
    res.json(db);
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
});

// Starting the server in the localhost PORT
app.listen(PORT, () => console.log(`server started on port ${PORT}`));