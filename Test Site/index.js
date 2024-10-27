const express = require('express');
const app = express();
const path = require('path');
const { readFile } = require('fs');


// Makes home page accessible
app.get('/', (request, response) => {
    readFile('./home.html', 'utf8', (err, html) => {
        if (err) {
            response.status(500).send('oopsies');
            return;
        }
        return response.send(html);
    });
});

// Makes guess screen accessible
app.get('/guessScreen', (request, response) => {
    readFile('./guessScreen.html', 'utf8', (err, html) => {
        if (err) {
            response.status(500).send('oopsies');
            return;
        }
        return response.send(html);
    });
});

// Start the server
app.listen(process.env.PORT || 3000, () => console.log('App available on http://localhost:3000'));
