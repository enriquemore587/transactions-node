const express = require('express');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/user', function(req, res) {
    res.status(200).json({ name: 'john' });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Api RESTFul Ok, y ejecutándose...');
})

module.exports = app;