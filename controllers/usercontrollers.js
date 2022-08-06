const mysqlcon = require("../database/database");
const User = require("../models/user");
const bcrypt = require("bcryptjs");


module.exports = {

    login(req, res) {
        const email = req.body.email;
        const password = req.body.password;
        User.findbyemail(email, async (err, myuser) => {
            console.log(myuser);
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: "Hubo un error al consultar el usuario",
                    err: err
                })
            }
            if (!myuser) {
                return res.status(401).json({
                    success: false,
                    message: "El correo no fue econtrado "
                })
            }

            const ispassvalid = await bcrypt.compare(password, myuser.password);
            if (ispassvalid) {
                return res.status(201).json({
                    success: true,
                    message: "Usuario autenticado",
                    data: myuser
                })
            } else {
                return res.status(401).json({
                    //el cliente no tiene autorizacion para realizar  esta peticion
                    success: false,
                    message: "La contraseña  es incorrecta",
                });
            }
        });

    },


    registernewuser(req, res) {
        const user = req.body;
        User.createuser(user, (err, data) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: "Este correo ya existe o verifica tu numero de telefono",
                    err: err
                })
            }
            else {
                return res.status(201).json({
                    success: true,
                    message: "El usuario se registro correctamente",
                    data: user
                })
            }
        })
    },



    recoverypassword(req, res) {
        const bodyuser = req.body;
        const questionandanswer = req.body.answerques;
        User.findbyPhone(bodyuser, async (err, myuser) => {
            console.log(myuser);
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: "Hubo un error al consultar el usuario",
                    err: err
                })
            }

            if (!myuser) {
                return res.status(401).json({
                    success: false,
                    message: "Tus datos no coinciden"
                })
            }
            const ispassvalid = await bcrypt.compare(questionandanswer, myuser.answerques);

            if (ispassvalid) {
                return res.status(201).json({
                    success: true,
                    message: "Recuperar contraseña",
                    data: myuser
                })
            } else {
                return res.status(401).json({
                    success: false,
                    message: "La respuesta es incorrecta",
                });
            }
        });

    },

    updateuser(req, res) {


        const id = req.params.iduser;
        const userbody = req.body;

        User.findbyidupdate(id, (err, myuser) => {

            if (err) {
                return res.status(501).json({
                    success: false,
                    message: "Error en el servidor",
                    err: err
                })
            }

            if (!myuser) {
                res.status(401).json({
                    success: false,
                    message: "Usuario no existe",
                    data: myuser
                })
            }

            //si el usuario es encontrado se hace la actualizacion del usuario
            else {
                User.userupdate(id, userbody, (err, data) => {


                    if (err) {
                        return res.status(501).json({
                            success: false,
                            message: "Verifica tu numero de telefono",
                            err: err
                        })
                    }


                    else {
                        return res.status(201).json({
                            success: true,
                            message: "Sesion caducada, Inicia sesion",
                            data: userbody
                        })
                    }
                });
            }
        })
    },


    updatepass(req, res) {
        const iduser = req.params.iduser;
        const body = req.body;
        User.updatepassword(iduser, body, (err, userpass) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: "Error en el servidor",
                    err: err
                })
            } else {
                return res.status(201).json({
                    success: true,
                    message: "Contraseña actualizada",
                    userpass: body
                })

            }
        })
    },

    listnotes(req, res) {
        const body = req.params;
        User.listnoteviewforcategory(body, (err, data) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: "Error en el servidor",
                    err: err
                })
            } else {
                return res.status(201).json({
                    success: true,
                    message: "Listado de las notas",
                    data: data
                })
            }
        });

    }
}