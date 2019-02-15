//var compression = require('compression');
const control_db = require('./src/config/index');

const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
const app = express();

//Rotas
const index = require('./src/routes/index');
const alumnoRoute = require('./src/routes/alumnoRoute');
const carreraRoute = require('./src/routes/carreraRoute');
const materiaRoute = require('./src/routes/materiaRoute');
const materiaCursadaRoute = require('./src/routes/materiaCursadaRoute');



app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.use('/', index);
app.use('/alumno', alumnoRoute);
app.use('/carrera', carreraRoute);
app.use('/materia', materiaRoute);
app.use('/materia_cursada', materiaCursadaRoute);

module.exports = app;


app.listen(3000, function () {
    console.log('app listening on port 3000!');
});
