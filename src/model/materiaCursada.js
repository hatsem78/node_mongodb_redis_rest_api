const mongoose = require('mongoose');
require('../config/db');
require('../model/materia');
const Schema = mongoose.Schema;


var MateriaCursadaSchema = new Schema(
    {
        nota: { type: Number, default: 0 },
        cursada: { type: Boolean, default: false},
        materia: { type: Schema.Types.ObjectId, ref: 'Materia', required: true }
    }
);

// Virtual para Materia's URL
MateriaCursadaSchema
    .virtual('url')
    .get(function () {
        return '/materia/' + this._id;
    });

//Export model
module.exports = mongoose.model('MateriaCursada', MateriaCursadaSchema);