const express = require('express');
const app = express();
const accountRoute = require('./routes/account.route')

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/users', function(req, res) {
    res.status(200).json({ name: 'john' });
});

app.use('/accounts', accountRoute);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Api RESTFul Ok, y ejecutándose...');
})

module.exports = app;