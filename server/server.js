const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req,res) => {
    res.send('Hello world');
})

app.get('/stop', (req,res) => {
    console.log('Exiting server');
    process.exit();
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})