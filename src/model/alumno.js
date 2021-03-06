const mongoose = require('mongoose');
//mongoose.set('useCreateIndex', true);
const Schema = mongoose.Schema;


var alumnoSchema = new Schema({
    //lastname: {type: String, unique: true },
    lastname: {type: String },
    name: {type: String},
    date: {type: Date},
    email: {
        type: String,
        validate: function(email) {
            return /^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)
        }
    },
    phone: {type: String},
    address: {
        street: {type: String, required: true, max: 100},
        city: {type: String, required: true, max: 100},
        province: {type: String, required: true, max: 100},
        postal_code: {type: String, required: true, max: 100},
    },
    carrera: [{ type: Schema.Types.ObjectId, ref: 'Carrera' }],
    materia: [{ type: Schema.Types.ObjectId, ref: 'Materia' }],
    activo: { type: Boolean, default: true}
});

// Virtual for author's full name
alumnoSchema
    .virtual('nombre')
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
