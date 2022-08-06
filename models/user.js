const db = require("../database/database");
const bcrypt = require("bcryptjs");
const User = {};



User.findbyemail = (email, result) => {

    const sql = `select id_user,
                        name,  
                        email,  
                        password,  
                        last_name,  
                        phone,  
                        age ,
                        answerques
                    from users
                    where email = ?`;


    db.query(sql,
        [email],
        (err, user) => {
            if (err) {
                console.log("No se obtuvo el usuario");
                result(err, null)
            } else {
                console.log("Usuario obtenido");
                result(null, user[0])
            }
        })

}

User.createuser = async (user, result) => {
    const sql = `insert into  users(email, password, name, last_name, phone, age, answerques, created, updated) 
    values(?,?,?,?,?,?,?,?,?)
`;
    const hashpass = await bcrypt.hash(user.password, 10);
    const hashanswer = await bcrypt.hash(user.answerques, 10);
    db.query(sql,
        [
            user.email,
            hashpass,
            user.name,
            user.last_name,
            user.phone,
            user.age,
            hashanswer,
            new Date(),
            new Date(),
        ]
        , (err, user) => {
            if (err) {
                console.log(`Error al insertar   ${err}`);
                result(err, null)
            } else {
                console.log(`Usuario agreagdo  ${user[0]}`);
                result(null, user[0])
            }
        })
}

User.findbyPhone = (user, result) => {

    const sql = `select id_user,
                        name,  
                        email,  
                        password,  
                        last_name,  
                        phone,  
                        age ,
                        answerques
                    from users
                    where phone = ? and email = ?`;


    db.query(sql,
        [user.phone, user.email],
        (err, user) => {
            if (err) {
                console.log("No se obtuvo el usuario");
                result(err, null)
            } else {
                console.log("Usuario obtenido");
                result(null, user[0])
            }
        })

}
User.findbyidupdate = (id, result) => {

    const sql = `select 
        id_user,
        name,  
        email,  
        password,  
        last_name,  
        phone,  
        age ,
        answerques
        from users
    where id_user = ?`;
    db.query(sql,
        [id],
        (err, user) => {
            if (err) {
                console.log("No se obtuvo el usuario");
                result(err, null)
            } else {
                console.log("Usuario obtenido");
                result(null, user[0])
            }
        })
}


User.userupdate = async (id, user, callback) => {

    const sql = `update users 
    set 
    name          = ?,
    last_name     = ?,   
    phone         = ?,   
    age           = ?,    
    updated       = ?
    where id_user = ?
    `;
    const hashpass = await bcrypt.hash(user.password, 10);
    const hashanswer = await bcrypt.hash(user.answerques, 10);


    db.query(sql,
        [
            hashpass,
            user.name,
            user.last_name,
            user.phone,
            user.age,
            hashanswer,
            new Date(),
            id
        ],
        (err, users) => {
            if (err) {
                console.log("No se obtuvo el usuario");
                callback(err, null)
            } else {
                console.log("Usuario obtenido");
                callback(null, users)
            }
        })
},

    User.updatepassword = async (userparams, bodyuser, callback) => {
        const sql = `update users 
        set 
        password   = ?,
        answerques = ?
        where id_user = ?`;

        const hashpass = await bcrypt.hash(bodyuser.password, 10);
        const hashanswer = await bcrypt.hash(bodyuser.answerques, 10);
        db.query(
            sql,
            [
                hashpass,
                hashanswer,
                userparams
            ],
            (err, userpass) => {

                if (err) {
                    console.log(`Hubo un error al actualizar la contraseña ${err}`);
                    callback(err, null)

                } else {
                    console.log(`Se ha actualizado la contrase del usuario ${userpass}`);
                    callback(null, userpass)

                }
            }
        )
    }


User.listnoteviewforcategory = (idparams, callback) => {

    const sql = `select 
        id_note,
        tittle, 
        email,
        password,
         typecategory
    from note 
    where id_users    = ?
    and typecategory  = ? 
    `;
    db.query(
        sql,
        [
            idparams.userid,
            idparams.tyoecategory
        ],
        (err, result) => {
            if (err) {
                console.log(`Notas no encontradas ${err}`);
                callback(err, null);
            } else {
                console.log(`Notas encontradas con el id del usuario ${idparams.userid}`);
                callback(null, result);

            }
        }

    )
}

//crear nota y cambiar password
//crud
module.exports = User;