//var compression = require('compression');

const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
const app = express();

//Rotas
const index = require('./routes/index');
const alumnoRoute = require('./routes/alumnoRoute');
const carreraRoute = require('./routes/carreraRoute');
const materiaRoute = require('./routes/materiaRoute');
const materiaCursadaRoute = require('./routes/materiaCursadaRoute');



app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

//app.use(compression());


app.use('/', index);
app.use('/alumno', alumnoRoute);
app.use('/carrera', carreraRoute);
app.use('/materia', materiaRoute);
app.use('/materia_cursada', materiaCursadaRoute);

module.exports = app;


app.listen(3000, function () {
    console.log('app listening on port 3000!');
});
