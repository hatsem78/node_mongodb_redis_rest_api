"use strict";
var sinon = require('sinon'),
    chai = require('chai'),
    expect = chai.expect,
    mongoose = require('mongoose');

var should = require('should');
require('sinon-mongoose');

const request = require('supertest');

var Materia = require('../../model/materia');
global.Promise = require('bluebird');

describe('MateriaController testing', function () {


    describe("Get todas las Materias", function(){

        it("Retorna todas las materia Activas test", function(done){
            var MateriaMock = sinon.mock(Materia);
            var expectedResult = { activo: true, name: []};
            debugger
            MateriaMock.expects('find').yields(null, expectedResult);
            Materia.find(function (err, result) {
                MateriaMock.verify();
                MateriaMock.restore();
                expect(result.activo).to.be.true;
                done();
            });
        });


        it("Retorna un error test", function(done){
            var MateriaMock = sinon.mock(Materia);
            var expectedResult = {activos: false, error: "No existe el campo activos"};
            MateriaMock.expects('find').yields(expectedResult, null);
            Materia.find(function (err, result) {
                MateriaMock.verify();
                MateriaMock.restore();
                expect(err.status).to.not.be.true;
                done();
            });
        });
    });



    describe('Get un solo registro de Materia', function () {
        it('Buscar un solo elemento', function (done) {
            var MateriaMock = sinon.mock(Materia);
            MateriaMock
                .expects('find')
                .yields(null, 'Materia');

            Materia.find(function (err, result) {
                MateriaMock.verify();
                MateriaMock.restore();
                should.equal('Materia', result, "La prueba falla debido a un resultado inesperado")
                done();
            });
        });
    });

    describe('Delete Elimina una Materia test', function () {
        it('Debería borrar una Materia', function (done) {
            var MateriaMock = sinon.mock(Materia);

            MateriaMock
                .expects('remove')
                .withArgs({_id: 12345})
                .yields(null, 'DELETED');

            Materia.remove({_id: 12345}, function(err, result){
                MateriaMock.verify();
                MateriaMock.restore();
                done();
            })

        });
    });

    describe('Put Actualizar Materia test', function () {
        it('Debería actualizar el nombre de la Materia', function (done) {
            var MateriaMock = sinon.mock(new Materia({ name: 'Guarda nombre de la Materia'}));
            var materia = MateriaMock.object;

            MateriaMock
                .expects('save')
                .withArgs({_id: 12345})
                .yields(null, 'UPDATED');

            materia.save({_id: 12345}, function(err, result){
                MateriaMock.verify();
                MateriaMock.restore();
                done();
            })

        });
    });




    describe("Post nueva Materia", function(){

        it("Debería guardar una Materia", function(done){
            var MateriaMock = sinon.mock(new Materia({ name: 'Nueva mock Materia'}));
            var materia = MateriaMock.object;
            var expectedResult = { name: true };
            MateriaMock.expects('save').yields(null, expectedResult);
            materia.save(function (err, result) {
                MateriaMock.verify();
                MateriaMock.restore();
                expect(result.name).to.be.true;
                done();
            });
        });


        it("Debería no guardar una Materia", function(done){
            var MateriaMock = sinon.mock(new Materia({ name: 'Nueva mock Materia'}));
            var materia = MateriaMock.object;
            var expectedResult = { name: false };
            MateriaMock.expects('save').yields(expectedResult, null);
            materia.save(function (err, result) {
                MateriaMock.verify();
                MateriaMock.restore();
                expect(err.name).to.not.be.true;
                done();
            });
        });

    });


    describe('Update una Materia', function () {
        it('Debería guardar cambiar el nombre de una Materia', function (done) {
            var MateriaMock = sinon.mock(new Materia({ Materia: 'Nueva Materia'}));
            var materia = MateriaMock.object;

            MateriaMock
                .expects('save')
                .withArgs({_id: 12345})
                .yields(null, 'UPDATED');

            materia.save({_id: 12345}, function(err, result){
                MateriaMock.verify();
                MateriaMock.restore();
                done();
            })

        });
    });


    describe('Delete todo test', function () {
        it('Should delete todo of gived id', function (done) {
            var MateriaMock = sinon.mock(Materia);

            MateriaMock
                .expects('remove')
                .withArgs({_id: 12345})
                .yields(null, 'DELETED');

            Materia.remove({_id: 12345}, function(err, result){
                MateriaMock.verify();
                MateriaMock.restore();
                done();
            })


        });
    });

});