'use strict';
var mongoose = require('mongoose');
var Materia = require('../model/materia');


// noinspection JSAnnotator
module.exports = new class MateriaRepository {


    getAll() {
        return Materia.find();
    }

    getById(id) {
        return Materia.findById(id);
    }

    create(materia) {
        return Materia.create(materia);
    }

    /**
     *Para actualizar las carreras se debe ingresar un array de las materiacarreras
     * Para actualizar
     * @carrera {List} ejemplo {"carrera": ["5c62a4709077b56157ff61ce","5c62a4709077b561dfds161ce"]}
     * @materia {Object} ejemplo {"name": "Matematicas","work_load": 22}

     **/
    update(id, materia) {

        if(Object.keys(materia).length == 1 && Object.keys(materia).indexOf('carrera') >= 0){
            return Materia.findOneAndUpdate(id, { $set: { carrera: materia.carrera }}, { upsert: true, new: true});
        }
        else{
            const updatedcarrera = {
                name: materia.name,
                work_load: materia.work_load,
                carrera: materia.carrera
            };

            return Materia.findOneAndUpdate(id, updatedcarrera,{ upsert: true, new: true});
        }
    }

    delete(id) {
        return Materia.findOneAndDelete(id);
    }

}
