'use strict';

const CarreraRepository = require('../repositories/carreraRepository');

var redis = require('redis');
var client = redis.createClient();

exports.get = (req, res, next) => {
    client.get('allCarrera', function (err, reply) {
        if (reply) {
            res.send(reply)
        } else {
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
    client.get('getCarrera', function (err, reply) {
        if (reply) {
            res.send(reply)
        } else {
            CarreraRepository.getById(req.params.id)
            .then((Carrera) => {
                client.set('getCarrera', JSON.stringify(Carrera));
                client.expire('getCarrera', 20);
                res.status(200).send(Carrera);
            }).catch(err => res.status(500).send(err))
        }
    });
};

exports.post = (req, res, next) => {
    const p = req.body;

    CarreraRepository.create(p)
        .then((Carrera) => {
        res.status(200).send(Carrera);
}).catch(err => res.status(500).send(err))
};


exports.put = (req, res) => {

    const id = req.params.id;
    const vm = req.body;

    console.log(id);

    CarreraRepository.update(req.params.id, vm)
        .then((carrera) => {
        res.status(201).send(carrera);
}).catch(err => res.status(500).send(err))
};



exports.delete = (req, res, next) => {
    CarreraRepository.delete(req.params.id)
        .then((carrera) => {
        res.status(200).send('delete succeeded!');
}).catch(err => console.error.bind(console, `Error ${err}`))
};