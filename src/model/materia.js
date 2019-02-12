const mongoose = require('mongoose');
require('../config/db');
require('../model/carrera');
const Schema = mongoose.Schema;


var MateriaSchema = new Schema(
    {
        name: { type: String, required: true, unique: true },
        work_load: { type: String, required: true},
        carrera: [{ type: Schema.Types.ObjectId, ref: 'Carrera' }]
    }
);

// Virtual para Materia's URL
MateriaSchema
    .virtual('url')
    .get(function () {
        return '/materia/' + this._id;
    });

//Export model
module.exports = mongoose.model('Materia', MateriaSchema);