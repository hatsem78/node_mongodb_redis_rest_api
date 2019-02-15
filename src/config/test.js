var mongoose = require('mongoose');

/*coneccion con usuario y contraseña*/
const dbpath = 'mongodb://root:root@localhost/db_employees?authSource=admin';

const mongo = mongoose.connect(dbpath, {useNewUrlParser: true });
mongoose.set('useCreateIndex', true);
/*probamos si tnemos conecci{on*/
mongo.then(() => {
    console.log('connected test' );
}).catch((err) => {
    console.log('err', err);
    return false;
});

module.exports = mongoose;