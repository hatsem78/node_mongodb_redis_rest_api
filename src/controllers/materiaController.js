'use strict';

const MateriaRepository = require('../repositories/materiaRepository');

var redis = require('redis');
var client = redis.createClient();

exports.get = (req, res, next) => {
    client.get('allMateria', function (err, reply) {
        if (reply) {
            res.send(reply)
        } else {
            MateriaRepository.getAll()
            .then((Materia) => {
                client.set('allMaterias', JSON.stringify(Materia));
                client.expire('allMaterias', 20);
                res.status(200).send(Materia);
            }).catch(err => res.status(500).send(err))
        }
    });
};

exports.getById = (req, res, next) => {
    client.get('getMateria', function (err, reply) {
        if (reply) {
            res.send(reply)
        } else {
            MateriaRepository.getById(req.params.id)
            .then((Materia) => {
                client.set('getMateria', JSON.stringify(Materia));
                client.expire('getMateria', 20);
                res.status(200).send(Materia);
            }).catch(err => res.status(500).send(err))
        }
    });
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