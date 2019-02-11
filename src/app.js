const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");

//Rotas
const index = require('./routes/index');
const alumnoRoute = require('./routes/alumnoRoute');

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());


app.use('/', index);
app.use('/alumno', alumnoRoute);

module.exports = app;


app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});