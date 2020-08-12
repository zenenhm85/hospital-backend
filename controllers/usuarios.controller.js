const Usuario = require('../models/usuario.model');
const {response, request} = require('express')
const bcrypt = require('bcryptjs');

const getUsuarios = async (req, res) => {

    try {
        const usuarios = await Usuario.find({}, 'nombre email role google');

        return res.status(200).json({
            ok: true,
            usuarios
        });
    }
    catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Error inesperado en el servidor',
            errors: error
        });
    }
}

const crearUsuario = async (req = request, res = response) => {

    //validar correo único con mongoose-unique-validator

    const { password } = req.body;

    try {
        const usuario = new Usuario(req.body);

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save();

        res.status(200).json({
            ok: true,
            usuario
        });
    }
    catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado en el servidor',
            errors: error
        });
    }
}

const actualizarUsuario = async (req = request, res = response) => {


    // TODO: Validar token y comprobar si es el usuario correcto

    const uid = req.params.id;

    try {

        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario por este id'
            });
        }
        // Destructurando el body y dejando en campo solo los atributos a modificar
        const { password, google, activo, ...campos } = req.body;

        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, { new: true });

        return res.json({
            ok: true,
            usuario: usuarioActualizado
        });

    } 
    catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Error inesperado en el servidor',
            errors: error
        })
    }
}

const eliminarUsuario = async (req = request, res = response) => {


    const uid = req.params.id;

    try {

        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario por este id'
            });
        }
        
        await Usuario.findByIdAndDelete(uid);

        return res.json({
            ok: true,
            msg:"Usuario eliminado con éxito"
        });

    } 
    catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Error inesperado en el servidor',
            errors: error
        })
    }
}

/*=============================================
Exportando funcionalidades
=============================================*/
module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario
}