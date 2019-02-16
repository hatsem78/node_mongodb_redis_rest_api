"use strict";

var should = require('should'),
    request = require('supertest'),
    app = require('../../../app'),
    mongoose = require('mongoose'),
    Todo = mongoose.model('Alumno'),
    agent = request.agent(app),
    chai = require('chai'),
    expect = chai.expect;

describe('Alumno CRUD integration testing', function () {

    var alumno = {
        "lastname": "Aoellido test" ,
        "name": "Nombre test",
        "date": "2018-01-01",
        "email": "preueba@gmail.com",
        "phone": "13213123",
        "address": {
            "street": "calle",
            "city": "caba",
            "province": "caba",
            "postal_code": "1111"
        },
        "carrera": [],
        "materia": [],
        _id: '5c683adfcd1c393625280e1b'
    };

    describe('## Crea una Alumno ', function() {
        it('Debería crear una Alumno', function(done) {
            request(app)
                .post('/alumno')
                .send(alumno)
                .end(function(err, res) {
                    console.log(res.text);
                    expect(res.statusCode).to.equal(200);
                    expect(res.body.name).to.equal('Nombre test');
                    alumno = res.body;
                    done();
                });
        });
    });


    describe('Get Todas las Alumno', function () {

        it('Debería retornar una o más Alumno', function (done) {
            agent
                .get('/alumno')
                .expect(200)
                .end(function(err, res){
                    expect(res.statusCode).to.equal(200);
                    expect(res.body[0].activo).to.equal(true);
                    alumno.carrera = res.body[0]._id;
                    done();
                });
        });
    });

    describe('Get Todas las Alumno', function () {

        it('Debería retornar una o más Alumno', function (done) {
            agent
                .get('/alumno')
                .expect(200)
                .end(function(err, res){
                    expect(res.statusCode).to.equal(200);
                    expect(res.body[0].activo).to.equal(true);
                    done();
                });
        });
    });

    describe('Get retorna una Alumno por id', function() {
        it('Debería retornar una Alumno', function(done) {
            request(app) .get('/alumno/' + materia._id) .end(function(err, res) {
                expect(res.statusCode).to.equal(200);
                expect(res.body.name).to.equal('integration test');
                done();
            });
        });
    });

    describe('Delete Alumno por id', function() {
        it('Debería eliminar una Alumno por id', function(done) {
            request(app) .del('/alumno/' + carrera._id) .end(function(err, res) {
                expect(res.statusCode).to.equal(200);
                expect(res.body.name).to.equal('integration test');
                done();
            });
        });
    });*/

});
