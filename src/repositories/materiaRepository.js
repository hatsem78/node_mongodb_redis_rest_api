'use strict';
var mongoose = require('mongoose')
var Carrera = require('../model/materia');


// noinspection JSAnnotator
module.exports = new class MateriaRepository {

    getAll() {
        return Carrera.find();
    }

    getById(id) {
        return Carrera.findById(id);
    }

    create(carrera) {
        return Carrera.create(carrera);
    }

    update(id, carrera) {
        console.log(carrera);
        return  Carrera.findOneAndUpdate(
            {
                name: carrera.name,
                title: carrera.title
            },
            {
                upsert: true
            }
        );
    }

    delete(id) {
        return Carrera.findOneAndDelete(id);
    }

}
