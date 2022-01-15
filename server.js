// express
const express = require('express');
const path = require('path');

const app = express();

// Static files
app.use(express.static('./dist/crud-firebase'))

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/angular-heroku/'})

);

app.listen(process.env.PORT || 8080);