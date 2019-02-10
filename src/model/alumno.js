const mongoose = require('mongoose');
//mongoose.set('useCreateIndex', true);
require('../config/db');
const Schema = mongoose.Schema;


var alumnoSchema = new Schema({
    lastname: {type: String, unique: true },
    name: {type: String, unique: true },
    date: {type: Date},
    address: {
        street: {type: String, required: true, max: 100},
        city: {type: String, required: true, max: 100},
        province: {type: String, required: true, max: 100},
        postal_code: {type: String, required: true, max: 100},
    }
});

// Virtual for author's full name
AuthorSchema
    .virtual('name')
    .get(function () {
        return this.lastname + ', ' + this.name;
    });

// Virtual for author's URL
alumnoSchema
    .virtual('url')
    .get(function () {
        return '/alumno/' + this._id;
    });



//Los modelos se crean a partir de esquemas utilizando el mongoose.model()método:


var Alumno = mongoose.model('Alumno', alumnoSchema);
module.exports = Alumno;
