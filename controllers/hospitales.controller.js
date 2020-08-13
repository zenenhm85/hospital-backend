const Hospital = require('../models/hospital.model');
const { response, request } = require('express');
const path = require('path');
const fs = require('fs');

const {subirImagen} = require('../helpers/actualizar-imagen');

const getHospitales = async (req = request, res = response) => {
    try {
        const hospitales = await Hospital.find({}, 'nombre img usuario').populate('usuario','nombre email');

        return res.status(200).json({
            ok: true,
            hospitales
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

const crearHospital = async (req = request, res = response) => {

    let uid = req.uid;
    hospital = new Hospital({ usuario: uid, ...req.body });

    try {
        const hospitalBD = await hospital.save();

        return res.status(200).json({
            ok: true,
            msg: 'Hospital creado con éxito!!',
            hospital: hospitalBD
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

const actualizarHospital = async (req = request, res = response) => {

}

const eliminarHospital = async (req = request, res = response) => {
}
const subirImagenHospital = async (req = request, res = response) => {

    try {
        subirImagen(req, res, 'hospitales');
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

        let pathImagen = path.join(__dirname, `../uploads/hospitales/${nombreImagen}`);

        if(fs.existsSync(pathImagen)){
            res.sendFile(pathImagen);
        }
        pathImagen = path.join(__dirname, `../uploads/not-image.png`);
        res.sendFile(pathImagen);  
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
    getHospitales,
    crearHospital,
    actualizarHospital,
    eliminarHospital,
    recibirImagen,
    subirImagenHospital
}