'use strict';
var mongoose = require('mongoose')
var Carrera = require('../model/carrera')


// noinspection JSAnnotator
module.exports = new class CarreraRepository {

    /**
     * retorna todas las carreras
     * */
    getAll() {
        return Carrera.find();
    }

    /**
     * retorna una unica carrera a partir de un id
     * @id {String}
     * */
    getById(id) {
        return Carrera.findById(id);
    }

    /**
     * crea una nueva carrera
     * @carrera {Objeto} ejemplo
     *  {
     *      name: '',
     *      title: '',
     *   }
     * */
    create(carrera) {
        return Carrera.create(carrera);
    }

    /**
     * actualiza una carrera
     * @id {String}
     * @carrera {Objeto}ejemplo
     *  {
     *      name: '',
     *      title: '',
     *   }
     * */
    update(id, carrera) {

        const updatedcarrera = {
            name: carrera.name,
            title: carrera.title,
            activo: true
        }

        return Carrera.findOneAndReplace(id, updatedcarrera);
    }

    /**
     * Borrado logico de una carrera para mantener el historial de la carrera
     * @id {String}
     * @activo {Boolen} True activo, false desactivo
     * */
    delete(id) {

        Carrera.findOneAndUpdate(
            id,
            { activo: false },
            {upsert: true, new: true}
        );

    }

}
