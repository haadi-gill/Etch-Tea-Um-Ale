const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const dotenv = require('dotenv').config();

const App = express();
App.use(cors());

const db = mysql.createPool({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database
});


App.get('/', (req, res) => {
    return res.json("Hello World");
});

App.get('/test', (req, res) => {
    return res.json(db.state);
});

App.get('/users', (req, res) => {
            
    db.query('SELECT * FROM Users', (err, result) => {
        
        if (err) {
            
            if (db.state == 'connected') {
                console.log('Connected to database');
            } else {
                console.log('Not connected to database');
            }
    
            return res.json(err);
        } else {
            return res.json(result);
        }
    });
});

App.get('/posts', (req, res) => {
    db.query('SELECT * FROM Posts', (err, result) => {
        if (err) {
            return res.json(err);
        } else {
            return res.json(result);
        }
    });
});

App.listen(7341, () => {
    console.log('Server started on port 7341');
});