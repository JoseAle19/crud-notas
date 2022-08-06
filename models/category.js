const { Module } = require("module");
const { parse } = require("path");
const db = require("../database/database");


const Category = {};


Category.createcategory = (categor, result) => {

    const sql = `call isvalidcategory(?,?, @gato)`;

    db.query(
        sql,
        [
            categor.Description_category,
            categor.id_users
        ],
        (err, res) => {
            if (err) {
                console.log(`Error el crear una categoria ${err}`)
                result(err, null)
            } else {
                console.log(`Categoria creada ${res[0]}`)
                result(null, res[0])
            }
        }

    )
};

Category.FindCategorys = (iduser, result) => {
    const sql = "select * from category where id_users = ? ";


    db.query(sql, [iduser], (err, rows) => {
        if (err) {
            console.log("Hubo un error al obtener las categorias");
            result(err, null);
        } else {
            if (rows.length > 0) {
                console.log(`Hay categorias en la base de datos ${rows}`);
                result(null, rows);
            } else {
                console.log("No hay nada en la base de datos");
                result(err, rows)
                //es muy importante colocar el result de lo que se recibe
                //en el metodo Category = (result)=>
                //{datos de de db.query(sql)}
            }

        }
    })
};


Category.deletecategory = (categ, result) => {
    const sql = "delete from category where id_Category = ? and id_users = ?";

    db.query(sql, [
        categ.id_category,
        categ.id_users
    ],
        (err, rows) => {
            if (err) {
                console.log("Error al eliminar");
                result(err, null);
            } else {

                console.log(`Eliminando categoria ${rows}`);
                result(null, rows)
            }
        })
}



Category.updatecategory = (category, categoryparams, result) => {
    const sql = `
    update category 
     set Description_category = ?
     where id_Category = ? and id_users = ?
      `;
    db.query(sql, [
        category.Description_category,
        categoryparams.idcate,
        categoryparams.iduser
    ],
        (err, updatecate) => {
            if (err) {
                console.log("Error al actualizar categoria");
                result(err, null)
            } else {
                console.log("Actualizando categoria");
                result(null, updatecate)
            }
        }
    )
}



module.exports = Category;