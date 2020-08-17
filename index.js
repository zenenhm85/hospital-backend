/*=============================================
REQUERIMIENTOS
=============================================*/
require('dotenv').config();
const express = require('express');
const cors = require('cors');


const {dbConection} = require('./database/config.database');


/*=============================================
/Iniciando servidor de express
=============================================*/
const app = express();

/*=============================================
EJECUTANDO CORS
=============================================*/
app.use(cors());

/*=============================================
LECTURA Y PARSEO DEL BODY
=============================================*/
// parse application/json
app.use(express.json());

/*=============================================
RUTAS
=============================================*/
app.use('/api/usuarios', require('./routes/usuarios.route'));
app.use('/api/login', require('./routes/auth.route'));
app.use('/api/hospitales', require('./routes/hospitales.route'));
app.use('/api/medicos', require('./routes/medicos.route'));
app.use('/api/todo', require('./routes/busqueda.route'));


/*=============================================
CONEXIÓN A LA BASE DE DATOS
=============================================*/

dbConection();

/*=============================================
DERECTORIO PÚBLICO
=============================================*/
app.use(express.static('public'));
/*=============================================
SALIDA PUERTO HTTP
=============================================*/
app.listen(process.env.PORT, ()=>{
    console.log(`Servidor abierto en puerto ${process.env.PORT}`);
});