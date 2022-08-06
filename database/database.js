const mysql = require("mysql");
const console = require("console")


const mysqlcon = mysql.createConnection({
    host:"localhost",
    user: "root",
    password:"",
    database: "administradorcontraseña"
})

mysqlcon.connect(function (err){
if (!err) {
    console.log("Database connected")
} else {
    console.log("Database not connnected")
}
});


module.exports = mysqlcon;