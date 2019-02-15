"use strict";
var sinon = require('sinon'),
    chai = require('chai'),
    expect = chai.expect,
    mongoose = require('mongoose');

var should = require('should');
require('sinon-mongoose');

const request = require('supertest');

var Carrera = require('../../model/carrera');
global.Promise = require('bluebird');

describe('CarreraController testing', function () {


    describe("Get todas las carreras", function(){

        it("Retorna todas las carrras Activas test", function(done){
            var CarreraMock = sinon.mock(Carrera);
            var expectedResult = { activo: true, name: []};
            debugger
            CarreraMock.expects('find').yields(null, expectedResult);
            Carrera.find(function (err, result) {
                CarreraMock.verify();
                CarreraMock.restore();
                expect(result.activo).to.be.true;
                done();
            });
        });


        it("Retorna un error test", function(done){
            var CarreraMock = sinon.mock(Carrera);
            var expectedResult = {activos: false, error: "No existe el campo activos"};
            CarreraMock.expects('find').yields(expectedResult, null);
            Carrera.find(function (err, result) {
                CarreraMock.verify();
                CarreraMock.restore();
                expect(err.status).to.not.be.true;
                done();
            });
        });
    });



    describe('Get un solo registro de Carrera', function () {
        it('Buscar un solo elemento', function (done) {
            var CarreraMock = sinon.mock(Carrera);
            CarreraMock
                .expects('find')
                .yields(null, 'Carrera');

            Carrera.find(function (err, result) {
                CarreraMock.verify();
                CarreraMock.restore();
                should.equal('Carrera', result, "La prueba falla debido a un resultado inesperado")
                done();
            });
        });
    });

    describe('Delete Elimina una carrera test', function () {
        it('Debería borrar una carrera', function (done) {
            var CarreraMock = sinon.mock(Carrera);

            CarreraMock
                .expects('remove')
                .withArgs({_id: 12345})
                .yields(null, 'DELETED');

            Carrera.remove({_id: 12345}, function(err, result){
                CarreraMock.verify();
                CarreraMock.restore();
                done();
            })

        });
    });

    describe('Put Actualizar Carrera test', function () {
        it('Debería actualizar el nombre de la Carrera', function (done) {
            var CarreraMock = sinon.mock(new Carrera({ name: 'Guarda nombre de la Carrera'}));
            var carrera = CarreraMock.object;

            CarreraMock
                .expects('save')
                .withArgs({_id: 12345})
                .yields(null, 'UPDATED');

            carrera.save({_id: 12345}, function(err, result){
                CarreraMock.verify();
                CarreraMock.restore();
                done();
            })

        });
    });

    describe("Post nueva Carrera", function(){

        it("Debería guardar una carrera", function(done){
            var CarreraMock = sinon.mock(new Carrera({ name: 'Nueva mock Carrera'}));
            var carrera = CarreraMock.object;
            var expectedResult = { name: true };
            CarreraMock.expects('save').yields(null, expectedResult);
            carrera.save(function (err, result) {
                CarreraMock.verify();
                CarreraMock.restore();
                expect(result.name).to.be.true;
                done();
            });
        });


        it("Debería no guardar una carrera", function(done){
            var CarreraMock = sinon.mock(new Carrera({ name: 'Nueva mock Carrera'}));
            var carrera = CarreraMock.object;
            var expectedResult = { name: false };
            CarreraMock.expects('save').yields(expectedResult, null);
            carrera.save(function (err, result) {
                CarreraMock.verify();
                CarreraMock.restore();
                expect(err.name).to.not.be.true;
                done();
            });
        });

    });


    describe('Update una carrera', function () {
        it('Debería guardar cambiar el nombre de una carrera', function (done) {
            var carreraMock = sinon.mock(new Carrera({ carrera: 'Nueva carrera'}));
            var carrera = carreraMock.object;

            carreraMock
                .expects('save')
                .withArgs({_id: 12345})
                .yields(null, 'UPDATED');

            carrera.save({_id: 12345}, function(err, result){
                carreraMock.verify();
                carreraMock.restore();
                done();
            })

        });
    });


    describe('Delete todo test', function () {
        it('Should delete todo of gived id', function (done) {
            var CarreraMock = sinon.mock(Carrera);

            CarreraMock
                .expects('remove')
                .withArgs({_id: 12345})
                .yields(null, 'DELETED');

            Carrera.remove({_id: 12345}, function(err, result){
                CarreraMock.verify();
                CarreraMock.restore();
                done();
            })


        });
    });

});