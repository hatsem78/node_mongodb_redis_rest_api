'use strict';

const CarreraRepository = require('../repositories/carreraRepository');

var redis = require('redis');
var client = redis.createClient();

exports.get = (req, res, next) => {

    client.get('allCarrera', function (err, reply) {
        if (reply) {
            console.log('redis');
            res.send(reply)
        } else {
            console.log('db');
            CarreraRepository.getAll()
                .then((Carrera) => {
                client.set('allCarreras', JSON.stringify(Carrera));
            client.expire('allCarreras', 20);
            res.status(200).send(Carrera);
        }).catch(err => res.status(500).send(err))
        }
    });

};

exports.getById = (req, res, next) => {

    CarreraRepository.getById(req.params.id)
        .then((Carrera) => {
        res.status(200).send(Carrera);
}).catch(err => res.status(500).send(err))
};

exports.post = (req, res, next) => {
    const p = req.body;

    CarreraRepository.create(p)
        .then((Carrera) => {
        res.status(200).send(Carrera);
}).catch(err => res.status(500).send(err))
};

exports.put = (req, res, next) => {
    const p = req.body;

    CarreraRepository.update(req.params.id, p)
        .then((Carrera) => {
        res.status(201).send(Carrera);
}).catch(err => res.status(500).send(err))
};

exports.delete = (req, res, next) => {
    CarreraRepository.delete(req.params.id)
        .then((Carrera) => {
        res.status(200).send('delete succeeded!');
}).catch(err => console.error.bind(console, `Error ${err}`))
};