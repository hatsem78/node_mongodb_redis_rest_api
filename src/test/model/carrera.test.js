"use strict";

var should = require('should'),
    request = require('supertest'),
    app = require('../../../app'),
    mongoose = require('mongoose'),
    Todo = mongoose.model('Carrera'),
    agent = request.agent(app),
    chai = require('chai'),
    expect = chai.expect;

describe('Carrera CRUD integration testing', function () {

    var carrera = {
        name: 'integration test',
        title: 'integration test',


    };

   describe('## Crea una carrera ', function() {
        it('Debería crear una carrera', function(done) {
            request(app)
                .post('/carrera')
                .send(carrera)
                .end(function(err, res) {
                    expect(res.statusCode).to.equal(200);
                    expect(res.body.name).to.equal('integration test');
                    carrera = res.body;
                    done();
                });
        });
    });

    describe('Get Todas las Carreras', function () {

        it('Debería retornar una o más carreras', function (done) {
            agent
                .get('/carrera')
                .expect(200)
                .end(function(err, res){
                    expect(res.statusCode).to.equal(200);
                    expect(res.body[0].activo).to.equal(true);
                    carrera = res.body[0];
                    done();
                });
        });
    });


    describe('Get retorna una carrera por id', function() {
        it('Debería retornar una carrera', function(done) {
            request(app) .get('/carrera/' + carrera._id) .end(function(err, res) {
                expect(res.statusCode).to.equal(200);
                expect(res.body.name).to.equal('integration test');
                done();
            });
        });
    });

    describe('Delete carrera por id', function() {
        it('Debería eliminar una carrera por id', function(done) {

            request(app) .del('/carrera/5c6847aaadade1439c2682d7')
            .end(function(err, res){
                expect(res.statusCode).to.equal(200);
                expect(typeof res.body).to.eql('object')
                expect(res.body.msg).to.eql('success')
                done()
            })
        });
    });

});
