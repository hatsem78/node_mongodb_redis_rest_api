'use strict';
var mongoose = require('mongoose');
var MateriaCursada = require('../model/materiaCursada');

var Alumno = require('../model/alumno');


// noinspection JSAnnotator
module.exports = new class MateriaRepository {

    getAll() {
        return MateriaCursada.find();
    }

    getById(id) {
        return MateriaCursada.findById(id);
    }

    create(materia) {



        var materia_cursada = MateriaCursada.create(materia);

        return  Alumno.findOneAndUpdate(
            {
                id: materia.id
            },
            {
                $set: {
                    "materia": push(materia._id)
                }
            },
            {
                upsert: true
            }
        )
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
