const { Schema, model } = require('mongoose');

//Requerimos el módulo para validaciones únicas
const uniqueValidator = require('mongoose-unique-validator');


const UsuarioSchema = Schema({

    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    img: {
        type: String,
    },
    role: {
        type: String,
        required: true,
        default: 'USER_ROLE'
    },
    google: {
        type: Boolean,
        default: false
    },
    activo: {
        type: Boolean,
        default: true
    },
});

/*=============================================
Devolver mensaje personalizado para validaciones únicas
=============================================*/

UsuarioSchema.plugin(uniqueValidator, {message: 'Este {PATH} ya está registrado en la Base de datos' })

/*=============================================
Destructurando objeto usuario y devolviendo solo lo necesario y con el formato deseado
=============================================*/
UsuarioSchema.method('toJSON', function() {
    const { __v, _id, password, ...object } = this.toObject();
    object.id = _id;
    return object;
})

module.exports = model( 'Usuario', UsuarioSchema );
