const { deletecategory } = require("../models/category");
const Category = require("../models/category");



module.exports = {

    createcategory(req, res) {
        const category = req.body;
        Category.createcategory(category, (err, data) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: "Esta categoria ya existe",
                    err: data
                })
            } else {
                return res.status(201).json({
                    success: true,
                    message: "Categoria agregada",
                    data: category
                })
            }
        })
    },



    getcategory(req, res) {
        
        const id = req.params.iduser;

        Category.FindCategorys(id, (err, data) => {
            console.log(err);
            console.log(data);


            console.log(id);
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: "Error al obtener categorias",
                    err: err
                })
            }
            if (!data) {
                return res.status(401).json({
                    success: false,
                    message: "No hay categorias en la base de datos",
                    data: data
                })
            }
            else {
                return res.status(201).json({
                    success: true,
                    message: "Categorias obtenidas",
                    data: data
                })
            }



        })
    },



    deletecategory(req, res) {
        const id = req.params;
        Category.deletecategory(id, (err, data) => {


            console.log(err);
            console.log(data);

            if (err) {
                return res.status(501).json({
                    success: false,
                    message: "Error en el servidor",
                    err: err
                })
            }

            else {

                return res.status(201).json({
                    success: true,
                    message: "La categoria ha sido eliminada",
                    data: data
                })
            }
        })
    },


    updatecategory(req, res) {
        const category = req.body;
        const paramscategory = req.params;
        Category.updatecategory(category, paramscategory, (err, data) => {
            console.log(`error ${err}`);


            if (err) {
                return res.status(501).json({
                    success: false,
                    message: "Ya hay una categoria con este nombre",
                    err: err
                })
            }
            if (data.changedRows == 0) {
                return res.status(404).json({
                    success: false,
                    message: "Error al actualizar la categoria",
                    data: data
                })
            }


            return res.status(201).json({
                success: true,
                message: "La categoria ha sido actualizada",
                data: data
            })

        })
    }

}