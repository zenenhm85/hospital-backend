const Hospital = require('../models/hospital.model');
const { response, request } = require('express');
const path = require('path');
const fs = require('fs');

const { subirImagen } = require('../helpers/actualizar-imagen');

const getHospitales = async (req = request, res = response) => {
    try {
        const hospitales = await Hospital.find({}, 'nombre img usuario').populate('usuario', 'nombre email');

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
    try {
        const id = req.params.id;
        const uid = req.uid;
        
        const datosHospital = {
            ...req.body,
            usuario: uid
        }

        const hospitalActualizado = await Hospital.findByIdAndUpdate(id,datosHospital,{new:true});

        return res.status(200).json({
            ok: true,
            msg: 'Hospital actualizado con éxito!',
            hospital: hospitalActualizado
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

const eliminarHospital = async (req = request, res = response) => {
    try {
        const id = req.params.id;        

        const hospitalEliminado = await Hospital.findByIdAndDelete(id);

        return res.status(200).json({
            ok: true,
            msg: 'Hospital eliminado con éxito!',
            hospital: hospitalEliminado
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

        let pathImagen = `./uploads/hospitales/${nombreImagen}`;

        fs.exists(pathImagen, exists => {

            if (!exists) {
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
    getHospitales,
    crearHospital,
    actualizarHospital,
    eliminarHospital,
    recibirImagen,
    subirImagenHospital
}