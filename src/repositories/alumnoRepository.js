'use strict';
var mongoose = require('mongoose')
var Alumno = require('../model/alumno');


// noinspection JSAnnotator
module.exports = new class AlumnoRepository {

    getAll() {
        return Alumno.find();
    }

    getById(id) {
        return Alumno.findById(id);
    }

    create(alumno) {
        return Alumno.create(alumno);
    }

    update(id, alumno) {


        var updatedalumno = {
            lastname: alumno.lastname,
            name: alumno.name,
            date: alumno.date,
            email: alumno.email,
            phone: alumno.phone,
            materia: alumno.materia,
                $set: {
                    "address.street": alumno.address.street,
                        "address.city": alumno.address.city,
                        "address.province": alumno.address.province,
                        "address.postal_code": alumno.address.postal_code
                }
        }


        return  Alumno.findOneAndUpdate(
                    id,
                    updatedalumno,
                    {upsert: true, new: true}
                )
    }

    delete(id) {
        return Alumno.findByIdAndRemove(id);
    }

}
