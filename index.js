const express = require('express');
const app = express();

const port = 4000;

app.get('/', (req, res) => {
    res.send("Flash Cards Backend");
});

app.listen(port, () => {
    console.log(`Flash Cards API is listening on port ${port}`);
});