

# Proyecto crear un Api-Rest con tecnología node, mongodb, y una capa de cache con herramienta redis

Es un simple API-REST que guarda la información de alumnos que se inscriben a una carrera determinada.
Luego seleccionan las materias que pertenecen a la carrera

There are two versions of this project.

- [V1.0.0](https://bitbucket.org/hatsem78/api_node_mongo/src/master/): Puede ejecutar el servidor directamente después de clonar esta versión. Creará una API RESTful simple a través de HTTP.


## Requirements
[Node-express](https://expressjs.com/es/)\
[NodeJS](https://nodejs.org/en/) \
[redis](https://redis.io/)\
[Mongo](https://www.mongodb.com/es)






## Getting Started

Debe instalar MongoDB en su máquina local o usar otros servicios como mLab o Compose [MongoDB](https://docs.mongodb.com/manual/administration/install-community/) 
Después de eso, tendrá que reemplazar el mongoURL con su dirección de MongoDB, crear un usuarios con los privilegios

## Clone el repositorio

```
git clone https://hatsem78@bitbucket.org/hatsem78/api_node_mongo.git
```

Instalar las dependencias

```
npm install --save
```

## Start the server

Correr el server

```
npm run dev
```

Correr producción

```
npm run prod
```

Correr test

```
npm test
```

## Testtear HTTP (tag [v1.0.0](https://bitbucket.org/hatsem78/api_node_mongo/src/master/))

The default URL is: *http://localhost:3000*

+ GET todos los alumnos

```
Send GET request to http://localhost:3000/alumno/
`