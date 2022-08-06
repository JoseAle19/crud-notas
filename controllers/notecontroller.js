const Note = require("../models/note");


module.exports = {
    createnote(req, res) {
        const iduser = req.params.idusernote;
        const note = req.body;
        Note.createnote(iduser, note, (err, data) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: "Error en el servidor, callback crear nota",
                    err: err
                })
            } else {
                return res.status(201).json({
                    success: true,
                    message: `Se ha creado la nota`,
                    data: note

                })
            }
        })

    },

    getnotes(req, res) {
        const id = req.params.idusernote;


        Note.getnotes(id, (err, data) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: "Error en el servidor, callback getnotes",
                    err: err
                })
            } else {
                return res.status(201).json({
                    success: true,
                    message: "Notas obtenidas del usuario",
                    data: data
                })
            }
        })

    },


    updatenote(req, res) {
        const ids = req.params;
        const note = req.body;

        Note.updatenote(ids, note, (err, data) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: "Error en el servidor",
                    err: err
                })

            } else {
                return res.status(201).json({
                    success: true,
                    message: "Datos de la nota actualizado",
                    data: note
                })
            }
        })

    },


    deletenote(req, res) {
        const idu = req.params.iduser;
        const idn= req.params.idnote;
        Note.deletenote(idu, idn, (err, data) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: "Error al eliminar la nota",
                    err: err
                })
            } else {
                return res.status(201).json({
                    success: true,
                    message: "Nota eliminada",
                    data: data
                })
            }

        })

    }

}