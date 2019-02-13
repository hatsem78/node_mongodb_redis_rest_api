const mongoose = require('mongoose');
//mongoose.set('useCreateIndex', true);
const Schema = mongoose.Schema;


var CarreraSchema = new Schema(
    {
        name: { type: String, required: true, unique: true },
        title: { type: String, required: true},

    }
);

// Virtual para Carrera's URL
CarreraSchema
    .virtual('url')
    .get(function () {
        return '/carrera/' + this._id;
    });

//Export model
module.exports = mongoose.model('Carrera', CarreraSchema);
