"use strict";

var should = require('should'),
    request = require('supertest'),
    app = require('../../../app'),
    mongoose = require('mongoose'),
    Todo = mongoose.model('Materia'),
    agent = request.agent(app),
    chai = require('chai'),
    expect = chai.expect;

describe('Materia CRUD integration testing', function () {

    var materia = {
        name: 'integration test',
        work_load: 23,
        carrera: ''
    };

    describe('Get Todas las Carreras', function () {

        it('Debería retornar una o más carreras', function (done) {
            agent
                .get('/carrera')
                .expect(200)
                .end(function(err, res){
                    expect(res.statusCode).to.equal(200);
                    expect(res.body[0].activo).to.equal(true);
                    materia.carrera = res.body[0]._id;
                    done();
                });
        });
    });

    describe('## Crea una Materia ', function() {
        it('Debería crear una Materia', function(done) {
            request(app)
                .post('/materia')
                .send(task)
                .end(function(err, res) {
                    expect(res.statusCode).to.equal(200);
                    expect(res.body.name).to.equal('integration test');
                    materia = res.body;
                    done();
                });
        });
    });

    describe('Get Todas las Materias', function () {

        it('Debería retornar una o más Materias', function (done) {
            agent
                .get('/materia')
                .expect(200)
                .end(function(err, res){
                    expect(res.statusCode).to.equal(200);
                    expect(res.body[0].activo).to.equal(true);
                    done();
                });
        });
    });

    describe('Get retorna una Materia por id', function() {
        it('Debería retornar una Materia', function(done) {
            request(app) .get('/materia/' + materia._id) .end(function(err, res) {
                expect(res.statusCode).to.equal(200);
                expect(res.body.name).to.equal('integration test');
                done();
            });
        });
    });

    describe('Delete Materia por id', function() {
        it('Debería eliminar una Materia por id', function(done) {
            request(app) .get('/materia/' + carrera._id) .end(function(err, res) {
                expect(res.statusCode).to.equal(200);
                expect(res.body.name).to.equal('integration test');
                done();
            });
        });
    });

});
