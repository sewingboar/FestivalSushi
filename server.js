const express = require('express');
const path = require('path');
const port = process.env.PORT || 80;
const app = express();
var __dirname = 'land';
// the __dirname is the current directory from where the script is running
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'land')));
app.get('/ping', function (req, res) {
    return res.send('pong');
});
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'land', 'index.html'));
});
