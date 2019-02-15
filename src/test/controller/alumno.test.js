"use strict";
var sinon = require('sinon'),
    chai = require('chai'),
    expect = chai.expect,
    mongoose = require('mongoose'),
    should = require('should');

require('sinon-mongoose');

const request = require('supertest');

var Alumno = require('../../model/carrera');
global.Promise = require('bluebird');

describe('AlumnoController testing', function () {


    describe("Get todas las alumnos", function(){

        it("Retorna todas las carrras Activas test", function(done){
            var AlumnoMock = sinon.mock(Alumno);
            var expectedResult = { activo: true, name: []};
            debugger
            AlumnoMock.expects('find').yields(null, expectedResult);
            Alumno.find(function (err, result) {
                AlumnoMock.verify();
                AlumnoMock.restore();
                expect(result.activo).to.be.true;
                done();
            });
        });


        it("Retorna un error test", function(done){
            var AlumnoMock = sinon.mock(Alumno);
            var expectedResult = {activos: false, error: "No existe el campo activos"};
            AlumnoMock.expects('find').yields(expectedResult, null);
            Alumno.find(function (err, result) {
                AlumnoMock.verify();
                AlumnoMock.restore();
                expect(err.status).to.not.be.true;
                done();
            });
        });
    });



    describe('Get un solo registro de Alumno', function () {
        it('Buscar un solo elemento', function (done) {
            var AlumnoMock = sinon.mock(Alumno);
            AlumnoMock
                .expects('find')
                .yields(null, 'Alumno');

            Alumno.find(function (err, result) {
                AlumnoMock.verify();
                AlumnoMock.restore();
                should.equal('Alumno', result, "La prueba falla debido a un resultado inesperado")
                done();
            });
        });
    });

    describe('Delete Elimina una alumno test', function () {
        it('Debería borrar una alumno', function (done) {
            var AlumnoMock = sinon.mock(Alumno);

            AlumnoMock
                .expects('remove')
                .withArgs({_id: 12345})
                .yields(null, 'DELETED');

            Alumno.remove({_id: 12345}, function(err, result){
                AlumnoMock.verify();
                AlumnoMock.restore();
                done();
            })

        });
    });

    describe('Put Actualizar Alumno test', function () {
        it('Debería actualizar el nombre de la Alumno', function (done) {
            var AlumnoMock = sinon.mock(new Alumno({ name: 'Guarda nombre de la Alumno'}));
            var alumno = AlumnoMock.object;

            AlumnoMock
                .expects('save')
                .withArgs({_id: 12345})
                .yields(null, 'UPDATED');

            alumno.save({_id: 12345}, function(err, result){
                AlumnoMock.verify();
                AlumnoMock.restore();
                done();
            })

        });
    });

    describe("Post nueva Alumno", function(){

        it("Debería guardar una alumno", function(done){
            var AlumnoMock = sinon.mock(new Alumno({ name: 'Nueva mock Alumno'}));
            var alumno = AlumnoMock.object;
            var expectedResult = { name: true };
            AlumnoMock.expects('save').yields(null, expectedResult);
            alumno.save(function (err, result) {
                AlumnoMock.verify();
                AlumnoMock.restore();
                expect(result.name).to.be.true;
                done();
            });
        });


        it("Debería no guardar una alumno", function(done){
            var AlumnoMock = sinon.mock(new Alumno({ name: 'Nueva mock Alumno'}));
            var alumno = AlumnoMock.object;
            var expectedResult = { name: false };
            AlumnoMock.expects('save').yields(expectedResult, null);
            alumno.save(function (err, result) {
                AlumnoMock.verify();
                AlumnoMock.restore();
                expect(err.name).to.not.be.true;
                done();
            });
        });

    });


    describe('Update una alumno', function () {
        it('Debería guardar cambiar el nombre de una alumno', function (done) {
            var alumnoMock = sinon.mock(new Alumno({ alumno: 'Nueva alumno'}));
            var alumno = alumnoMock.object;

            alumnoMock
                .expects('save')
                .withArgs({_id: 12345})
                .yields(null, 'UPDATED');

            alumno.save({_id: 12345}, function(err, result){
                alumnoMock.verify();
                alumnoMock.restore();
                done();
            })

        });
    });


    describe('Delete todo test', function () {
        it('Should delete todo of gived id', function (done) {
            var AlumnoMock = sinon.mock(Alumno);

            AlumnoMock
                .expects('remove')
                .withArgs({_id: 12345})
                .yields(null, 'DELETED');

            Alumno.remove({_id: 12345}, function(err, result){
                AlumnoMock.verify();
                AlumnoMock.restore();
                done();
            })


        });
    });

});