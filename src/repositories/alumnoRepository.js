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

        const updatedalumno = {
            lastname: alumno.lastname,
            name: alumno.name,
            date: alumno.date,
            email: alumno.email,
            phone: alumno.phone,
            $set: { "address.street": alumno.street },
            /*address: {
                street: alumno.street,
                city: alumno.city,
                province: alumno.province,
                postal_code: alumno.postal_code,
            }*/

        };

        console.log('pedro: '+alumno.address.street);

       return  Alumno.findOneAndUpdate(
            {   lastname: alumno.lastname,
                name: alumno.name,
                date: alumno.date,
                email: alumno.email,
                phone: alumno.phone},
            {
                $set: {
                    "address.street": alumno.address.street,
                    "address.city": alumno.address.city,
                    "address.province": alumno.address.province,
                    "address.postal_code": alumno.address.postal_code,
                }
                },
            { upsert: true }
        )


        /*var myquery = { address: "Valley 345" };
        var newvalues = {$set: {address: "Canyon 123"} };

        return Alumno.findOneAndReplace(id, updatedalumno, { new: true });*/
    }

    delete(id) {
        return Alumno.findByIdAndRemove(id);
    }

}
