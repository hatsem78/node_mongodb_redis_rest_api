'use strict';
var mongoose = require('mongoose')
var Carrera = require('../model/Carrera');


// noinspection JSAnnotator
module.exports = new class CarreraRepository {

    getAll() {
        return Carrera.find();
    }

    getById(id) {
        return Carrera.findById(id);
    }

    create(Carrera) {
        return Carrera.create(Carrera);
    }

    update(id, Carrera) {

        const updatedCarrera = {
            name: Carrera.name,
            mail: Carrera.mail,
            role: Carrera.role,
        }

        return Carrera.findByIdAndUpdate(id, updatedCarrera, { new: true });
    }

    delete(id) {
        return Carrera.findByIdAndRemove(id);
    }

}
