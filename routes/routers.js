const { Router, query } = require("express");
const router = Router();

const routersuser = require("../controllers/usercontrollers")
const routersnote = require("../controllers/notecontroller")

const routerscategory = require("../controllers/categorycontroller")


//peticiones para los usuarios
router.post("/api/adminpassword/login", routersuser.login)
router.post("/api/adminpassword/newuser", routersuser.registernewuser)
//Recovery password
router.post("/api/adminpassword/recoverypassword", routersuser.recoverypassword)
//update password
router.put("/api/adminpassword/updatepass/:iduser", routersuser.updatepass)
//Udate user
http://localhost:3000/api/adminpassword/updateduser/3
router.post("/api/adminpassword/updateduser/:iduser", routersuser.updateuser)

//rutas para las peticiones alas categorias
router.post("/api/adminpassword/category/createcategory", routerscategory.createcategory);
router.put("/api/adminpassword/category/updatecategory/:idcate/:iduser", routerscategory.updatecategory);
router.get("/api/adminpassword/category/getcategorys/:iduser", routerscategory.getcategory);
router.delete("/api/adminpassword/category/deletecategory/:id_category/:id_users", routerscategory.deletecategory);


//Ruta para las peticiones alas notas
router.post("/api/adminpassword/note/addnote/:idusernote", routersnote.createnote);
router.put("/api/adminpassword/note/update/:iduser/:idnote", routersnote.updatenote);
router.get("/api/adminpassword/note/getnote/:idusernote", routersnote.getnotes);
router.delete("/api/adminpassword/note/deletenote/:iduser/:idnote", routersnote.deletenote);


//Listado de las notas
router.get("/api/adminpassword/note/getnotes/:userid/:tyoecategory", routersuser.listnotes);






module.exports = router;