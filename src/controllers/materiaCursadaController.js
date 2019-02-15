'use strict';

const MateriaCursadaRepository = require('../repositories/materiaCursadaRepository');

var redis = require('redis');
var client = redis.createClient();

exports.get = (req, res, next) => {

    client.get('allMateriaCursadas', function (err, reply) {
        if (reply) {
            console.log('redis');
            res.send(reply)
        } else {
            MateriaCursadaRepository.getAll()
                .then((materias_cursadas) => {
                client.set('allMaterias', JSON.stringify(materias_cursadas));
            client.expire('allMateriaCursadas', 20);
            res.status(200).send(materias_cursadas);
        }).catch(err => res.status(500).send(err))
        }
    });

};

exports.getById = (req, res, next) => {

    MateriaCursadaRepository.getById(req.params.id)
        .then((materias_cursadas) => {
        res.status(200).send(materias_cursadas);
}).catch(err => res.status(500).send(err))
};

exports.post = (req, res, next) => {
    const p = req.body;

    MateriaCursadaRepository.create(p)
        .then((materia_cursada) => {
        res.status(200).send(materia_cursada);
}).catch(err => res.status(500).send(err))
};

exports.put = (req, res, next) => {
    const p = req.body;

    MateriaCursadaRepository.update(req.params.id, p)
        .then((MateriaCursada) => {
        res.status(201).send(MateriaCursada);
}).catch(err => res.status(500).send(err))
};

exports.delete = (req, res, next) => {
    MateriaCursadaRepository.delete(req.params.id)
        .then((MateriaCursada) => {
        res.status(200).send('delete succeeded!');
}).catch(err => console.error.bind(console, `Error ${err}`))
};