'use strict';

const AlumnoRepository = require('../repositories/alumnoRepository');

var redis = require('redis');
var client = redis.createClient();

exports.get = (req, res, next) => {

    client.get('allAlumnos', function (err, reply) {
        if (reply) {
            console.log('redis');
            res.send(reply)
        } else {
            console.log('db');
            AlumnoRepository.getAll()
                .then((Alumno) => {
                client.set('allAlumnos', JSON.stringify(Alumno));
            client.expire('allAlumnos', 20);
            res.status(200).send(Alumno);
        }).catch(err => res.status(500).send(err))
        }
    });

};

exports.getById = (req, res, next) => {

    AlumnoRepository.getById(req.params.id)
        .then((Alumno) => {
        res.status(200).send(Alumno);
}).catch(err => res.status(500).send(err))
};

exports.post = (req, res, next) => {
    const p = req.body;

    AlumnoRepository.create(p)
        .then((Alumno) => {
        res.status(200).send(Alumno);
}).catch(err => res.status(500).send(err))
};

exports.put = (req, res, next) => {
    const p = req.body;

    AlumnoRepository.update(req.params.id, p)
        .then((Alumno) => {
        res.status(201).send(Alumno);
}).catch(err => res.status(500).send(err))
};

exports.delete = (req, res, next) => {
    AlumnoRepository.delete(req.params.id)
        .then((Alumno) => {
        res.status(200).send('delete succeeded!');
}).catch(err => console.error.bind(console, `Error ${err}`))
};