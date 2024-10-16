console.log("test");
//window.alert("uh oh");

const express = require('express');
const app = express();

const { readFile, readFileSync } = require('fs');

app.get('/', (request, response) => {

    readFile('./home.html', 'utf8', (err, html) => {
        if (err) {
            response.status(500).send('oopsies');
        }
        response.send(html);
    })
});

app.listen(process.env.PORT || 3000, () => console.log('App available on website http://localhost:3000'));
