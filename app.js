const express = require('express');
const app = express();
const accountRoute = require('./routes/account.route')
const mongoose = require('mongoose')
const config = require('config');

//Conectarnos a la BD
mongoose.connect(config.get('configDB.HOST'), {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('Conectado a MongoDB...'))
    .catch(err => console.log('No se pudo conectar con MongoDB..', err));

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