"use strict";
var sinon = require('sinon'),
    chai = require('chai'),
    expect = chai.expect,
    mongoose = require('mongoose');

var should = require('should');
require('sinon-mongoose');

const request = require('supertest');

var MateriaCursada = require('../../model/materiaCursada');
global.Promise = require('bluebird');

describe('MateriaCursadaController testing', function () {


    describe("Get todas las MateriaCursadas", function(){

        it("Retorna todas las materiaCursada Activas test", function(done){
            var MateriaCursadaMock = sinon.mock(MateriaCursada);
            var expectedResult = { activo: true, name: []};
            debugger
            MateriaCursadaMock.expects('find').yields(null, expectedResult);
            MateriaCursada.find(function (err, result) {
                MateriaCursadaMock.verify();
                MateriaCursadaMock.restore();
                expect(result.activo).to.be.true;
                done();
            });
        });


        it("Retorna un error test", function(done){
            var MateriaCursadaMock = sinon.mock(MateriaCursada);
            var expectedResult = {activos: false, error: "No existe el campo activos"};
            MateriaCursadaMock.expects('find').yields(expectedResult, null);
            MateriaCursada.find(function (err, result) {
                MateriaCursadaMock.verify();
                MateriaCursadaMock.restore();
                expect(err.status).to.not.be.true;
                done();
            });
        });
    });



    describe('Get un solo registro de MateriaCursada', function () {
        it('Buscar un solo elemento', function (done) {
            var MateriaCursadaMock = sinon.mock(MateriaCursada);
            MateriaCursadaMock
                .expects('find')
                .yields(null, 'MateriaCursada');

            MateriaCursada.find(function (err, result) {
                MateriaCursadaMock.verify();
                MateriaCursadaMock.restore();
                should.equal('MateriaCursada', result, "La prueba falla debido a un resultado inesperado")
                done();
            });
        });
    });

    describe('Delete Elimina una MateriaCursada test', function () {
        it('Debería borrar una MateriaCursada', function (done) {
            var MateriaCursadaMock = sinon.mock(MateriaCursada);

            MateriaCursadaMock
                .expects('remove')
                .withArgs({_id: 12345})
                .yields(null, 'DELETED');

            MateriaCursada.remove({_id: 12345}, function(err, result){
                MateriaCursadaMock.verify();
                MateriaCursadaMock.restore();
                done();
            })

        });
    });

    describe('Put Actualizar MateriaCursada test', function () {
        it('Debería actualizar el nombre de la MateriaCursada', function (done) {
            var MateriaCursadaMock = sinon.mock(new MateriaCursada({ name: 'Guarda nombre de la MateriaCursada'}));
            var materiaCursada = MateriaCursadaMock.object;

            MateriaCursadaMock
                .expects('save')
                .withArgs({_id: 12345})
                .yields(null, 'UPDATED');

            materiaCursada.save({_id: 12345}, function(err, result){
                MateriaCursadaMock.verify();
                MateriaCursadaMock.restore();
                done();
            })

        });
    });




    describe("Post nueva MateriaCursada", function(){

        it("Debería guardar una MateriaCursada", function(done){
            var MateriaCursadaMock = sinon.mock(new MateriaCursada({ name: 'Nueva mock MateriaCursada'}));
            var materiaCursada = MateriaCursadaMock.object;
            var expectedResult = { name: true };
            MateriaCursadaMock.expects('save').yields(null, expectedResult);
            materiaCursada.save(function (err, result) {
                MateriaCursadaMock.verify();
                MateriaCursadaMock.restore();
                expect(result.name).to.be.true;
                done();
            });
        });


        it("Debería no guardar una MateriaCursada", function(done){
            var MateriaCursadaMock = sinon.mock(new MateriaCursada({ name: 'Nueva mock MateriaCursada'}));
            var materiaCursada = MateriaCursadaMock.object;
            var expectedResult = { name: false };
            MateriaCursadaMock.expects('save').yields(expectedResult, null);
            materiaCursada.save(function (err, result) {
                MateriaCursadaMock.verify();
                MateriaCursadaMock.restore();
                expect(err.name).to.not.be.true;
                done();
            });
        });

    });


    describe('Update una MateriaCursada', function () {
        it('Debería guardar cambiar el nombre de una MateriaCursada', function (done) {
            var MateriaCursadaMock = sinon.mock(new MateriaCursada({ MateriaCursada: 'Nueva MateriaCursada'}));
            var materiaCursada = MateriaCursadaMock.object;

            MateriaCursadaMock
                .expects('save')
                .withArgs({_id: 12345})
                .yields(null, 'UPDATED');

            materiaCursada.save({_id: 12345}, function(err, result){
                MateriaCursadaMock.verify();
                MateriaCursadaMock.restore();
                done();
            })

        });
    });


    describe('Delete todo test', function () {
        it('Should delete todo of gived id', function (done) {
            var MateriaCursadaMock = sinon.mock(MateriaCursada);

            MateriaCursadaMock
                .expects('remove')
                .withArgs({_id: 12345})
                .yields(null, 'DELETED');

            MateriaCursada.remove({_id: 12345}, function(err, result){
                MateriaCursadaMock.verify();
                MateriaCursadaMock.restore();
                done();
            })


        });
    });

});