const Medico = require('../models/medico.model');
const { response, request } = require('express');
const path = require('path');
const fs = require('fs');

const {subirImagen} = require('../helpers/actualizar-imagen');

const getMedicos = async (req = request, res = response) => {
    try {
        const medicos = await Medico.find({}, 'nombre img usuario hospital')
                                    .populate('usuario', 'nombre email')
                                    .populate('hospital','nombre');

        return res.status(200).json({
            ok: true,
            medicos
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

const crearMedico = async (req = request, res = response) => {

    let uid = req.uid;
    medico = new Medico({ usuario: uid, ...req.body });

    try {
        const medicoBD = await medico.save();

        return res.status(200).json({
            ok: true,
            msg: 'Médico creado con éxito!!',
            medico: medicoBD
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

const actualizarMedico = async (req = request, res = response) => {

}

const eliminarMedico = async (req = request, res = response) => {
}

const subirImagenMedico = async (req = request, res = response) => {

    try {
        subirImagen(req, res, 'medicos');
    }
    catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Error inesperado en el servidor',
            errors: error
        })
    }

}
const recibirImagen = async (req = request, res = response) => {

    try {
        const nombreImagen = req.params.nombre;

        let pathImagen = `./uploads/medicos/${nombreImagen}`;

        fs.exists(pathImagen, exists=>{

            if(!exists){
                return res.sendFile(path.resolve(`./uploads/not-image.png`));                   
            }    
            res.sendFile(path.resolve(pathImagen));
    
        })
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
    getMedicos,
    crearMedico,
    actualizarMedico,
    eliminarMedico,
    recibirImagen,
    subirImagenMedico
}