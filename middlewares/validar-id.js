const Hospital = require('../models/hospital.model');
const Medico = require('../models/medico.model');

const validarIdHospital = async (req, res, next) => {

    const id = req.params.id;

    const hospitalDB = await Hospital.findById(id);

    if (!hospitalDB) {
        return res.status(400).json({
            ok: false,
            msg: 'No existe un hospital con este id'
        })
    }

    next();
}
const validarIdMedicoHospital = async (req, res, next) => {

    const idMedico = req.params.id;
    const idHospital = req.body.hospital

    const medicoDB = await Medico.findById(idMedico);

    if (!medicoDB) {
        return res.status(400).json({
            ok: false,
            msg: 'No existe un médico con este id'
        })
    }

    const hospitalDB = await Hospital.findById(idHospital);

    if (!hospitalDB) {
        return res.status(400).json({
            ok: false,
            msg: 'No existe un hospital con este id'
        })
    }

    next();
}
const validarIdMedico = async (req, res, next) => {

    const idMedico = req.params.id;   

    const medicoDB = await Medico.findById(idMedico);

    if (!medicoDB) {
        return res.status(400).json({
            ok: false,
            msg: 'No existe un médico con este id'
        })
    }   

    next();
}

module.exports = {
    validarIdHospital,
    validarIdMedicoHospital,
    validarIdMedico
}
