'use strict';

const MateriaRepository = require('../repositories/materiaRepository');

var redis = require('redis');
var client = redis.createClient();

exports.get = (req, res, next) => {

    client.get('allMateria', function (err, reply) {
        if (reply) {
            console.log('redis');
            res.send(reply)
        } else {
            console.log('db');
            CarreraRepository.getAll()
                .then((Carrera) => {
                client.set('allMaterias', JSON.stringify(Carrera));
            client.expire('allMaterias', 20);
            res.status(200).send(Carrera);
        }).catch(err => res.status(500).send(err))
        }
    });

};

exports.getById = (req, res, next) => {

    MateriaRepository.getById(req.params.id)
        .then((Materia) => {
        res.status(200).send(Materia);
}).catch(err => res.status(500).send(err))
};

exports.post = (req, res, next) => {
    const p = req.body;

    MateriaRepository.create(p)
        .then((Materia) => {
        res.status(200).send(Materia);
}).catch(err => res.status(500).send(err))
};

exports.put = (req, res, next) => {
    const p = req.body;

    MateriaRepository.update(req.params.id, p)
        .then((Materia) => {
        res.status(201).send(Materia);
}).catch(err => res.status(500).send(err))
};

exports.delete = (req, res, next) => {
    MateriaRepository.delete(req.params.id)
        .then((Materia) => {
        res.status(200).send('delete succeeded!');
}).catch(err => console.error.bind(console, `Error ${err}`))
};