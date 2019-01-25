const path = require('path');
const express = require('express');

const publicPath = path.join(__dirname, '../public');
console.log(publicPath);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

app.listen(port, () => {
    console.log(`Server started at port ${port}`);
});

