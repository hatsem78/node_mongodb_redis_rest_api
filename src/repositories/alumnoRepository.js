'use strict';
var mongoose = require('mongoose')
var Alumno = require('../model/alumno');


// noinspection JSAnnotator
module.exports = new class AlumnoRepository {

     /**
    * retorna todas los alumnos inscriptos
    * */
    getAll() {
        return Alumno.find();
    }

    /**
    * retorna un alumnos inscriptos
    * */
    getById(id) {
        return Alumno.findById(id);
    }

    /**
    * crea la inscripción del almno
    *@alumno {Objeto}
    *    ejemplo
    *    {
    *        lastname: "",
    *        name: "",
    *        date: "",
    *        email: "",
    *        phone: "",
    *        address: {
    *            street: "",
    *            city: "",
    *            province: "",
    *            postal_code: "",
    *        },
    *        carrera: "",
    *        materia: ""
    * */
    create(alumno) {
        return Alumno.create(alumno);
    }

    /**
    *Actualiza los datos del alumno
    *@alumno {Objeto}
    *    ejemplo
    *    {
    *        lastname: "",
    *        name: "",
    *        date: "",
    *        email: "",
    *        phone: "",
    *        address: {
    *            street: "",
    *            city: "",
    *            province: "",
    *            postal_code: "",
    *        },
    *        carrera: "",
    *        materia: ""
    * */
    */
    update(id, alumno) {

        var updatedalumno = {
            lastname: alumno.lastname,
            name: alumno.name,
            date: alumno.date,
            email: alumno.email,
            phone: alumno.phone,
            carrera: alumno.phone,
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

    /**
    *Borrado logico del alumno, mantiene su historia
    **/
    delete(id) {

        Alumno.findOneAndUpdate(
                id_alumno,
                {materia: lista_materias},
                {upsert: true, new: true}
            )
        return Alumno.findByIdAndRemove(id);
    }

}
