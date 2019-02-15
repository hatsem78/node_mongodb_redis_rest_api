'use strict';

var MateriaCursada = require('../model/materiaCursada');

var Alumno = require('../model/alumno');

var AlumnoMateria = require('../model/materia');


// noinspection JSAnnotator
module.exports = new class MateriaCursadaRepository {

    /**
    * retorna todas las materias que se estan cursando pertenecientes a los alumnos
    * */
    getAll() {
        return MateriaCursada.find();
    }

    getById(id) {
        return MateriaCursada.findById(id);
    }

    /**
     * crea los docuemntos de las materias que se anotan los alumnos
     */
    async create(materia){

        var lista_materias = [];

        var lista_id_materias = [];

        /*busco la carrera que esta inscripto*/
        var carrera = await this.alumnoCarrera(materia.alumno);

        var materias_actuales = ["5c62c2fe4393150658918fef"]//carrera.toBSON().materia;

        /*busco todas las materias correspondiente a la carrera del alumno*/
        var materias = await this.todasMateriaCarrera(carrera.carrera.toString());

        /*filtro para que no se repitan*/
        materia.materia.filter(function (elemento) {
            materias.filter(function (materias_validas) {
                if(elemento == materias_validas.toBSON()._id.toString() && materias_actuales.indexOf(elemento) <= -1){
                    lista_materias.push(elemento);
                }
            })
        });

        for(var index in lista_materias){
            var id_elemnto =  await this.altaMartriaCursada(lista_materias[index]);
            lista_id_materias.push(id_elemnto.toBSON()._id.toString())
        }


        var materias_actualizadas = await this.alumnoCarreraUpdate(carrera._doc._id.toString(), lista_id_materias.concat(materias_actuales));

        return materias_actualizadas;
    }

    /**
     *Para actualizar las carreras se debe ingresar un array de las materiacarreras
     * Para actualizar
     * @id_materia_cursada {String} id_materia_materia cursada
     * @materia {Object} ejemplo {"nota": 5,"cursada": (true/false) }

     **/
    update(id, materia) {

        const updatedcarrera = {
            nota: materia.nota,
            cursada: materia.cursada,
        };

        return MateriaCursada.findOneAndUpdate(id, updatedcarrera,{ upsert: true, new: true});
    }

    delete(id) {
        return MateriaCursada.findOneAndDelete(id);
    }

    /**
     * retorna el alumno para determinar cual es su carrera
     * @id_alumno {String}
     * */
    alumnoCarrera(id){
        return  new Promise(function(resolve) {
            Alumno.findById(id)
            .then(function (alumno) {
                resolve(alumno);
            });
        });
    }

    /**
     *retorna las materias asociadas a la carrera
     * @id_carrera {String}
     * * */
    todasMateriaCarrera(id_carrera){
        return  new Promise(function(resolve) {
            AlumnoMateria.find( { carrera: { $in: [id_carrera] } } )
            .then(function (materia_carrera) {
                resolve(materia_carrera);
            });
        });
    }

    /**
     * crea las nuevas materias que seran asociadas al alumno
     * @id_materia {Stirng} id de la materia que se anota el alumno
     * */
    altaMartriaCursada(id_materia){
        return  new Promise(function(resolve) {
            resolve(MateriaCursada.create(
                { id_materia }
            ));
        });
    }

    /**
     * actualiza el listado de materias asociadas
     * @id_alumno {String} id del alumno
     * @lsta_materia {array} Lista de las materias que se anoto el alumno
     * */
    alumnoCarreraUpdate(id_alumno, lista_materias){
        console.log(id);
        console.log(lista_materias);

        return  new Promise(function(resolve) {
            resolve(Alumno.findOneAndUpdate(
                id_alumno,
                {activo: false},
                {upsert: true, new: true}
            ));
        });
    }

}
