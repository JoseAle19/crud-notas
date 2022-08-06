
const db = require("../database/database");
const bcrypt = require("bcryptjs");
const User = require("./user");


const Note = {};



Note.createnote = (userid, note, callback) => {
    const sql = `insert into note
    (tittle, email, password, id_users, typecategory) 
    values(?,?,?,?,?)
    `;

    db.query(
        sql,
        [
            note.tittle,
            note.email,
            note.password,
            userid,
            note.typecategory
        ],
        (err, resolve) => {
            if (err) {
                console.log(`Error al crear la nota ${err}`);
                callback(err, null)
            }
            else {
                console.log(`Creando categoria`);
                callback(null, resolve)
            }

        }
    )

}
Note.getnotes = (id, callback) => {

    const sql = `select 
    id_note,
    tittle, 
    email,
    password,
     typecategory
    from note 
    where id_users= ?
    `

    db.query(sql,
        [
            id
        ],
        (err, notes) => {
            if (err) {
                console.log(`Error al obtener las notas del usuario con el id ${id}`);
                callback(err, null)
            } else {
                console.log(`Notas obtenidas de usuario con el id ${id} notas ${notes}`);
                callback(null, notes)
            }
        }
    )


}



Note.updatenote = (noteparams, note, callback) => {
    const sql = `
    update note 
 set 
 Tittle= ?,
 email=?,
  password= ?,
 typecategory= ?
 where id_users = ? and id_note= ?
      `;
    db.query(sql,
        [
            note.tittle,
            note.email,
            note.password,
            note.typecategory,
            noteparams.iduser,
            noteparams.idnote
        ],
        (err, updatenote) => {
            if (err) {
                console.log("Error al actualizar nota");
                callback(err, null)
            } else {
                console.log(`Actualizando nota con el id ${noteparams.idnote} id nota ${note.iduser}`);
                callback(null, updatenote)
            }
        }
    )
}

Note.deletenote = (idu, idn, callback) => {
    const sql = `delete 
    from note 
    where id_users = ? 
    and id_note = ?
    `;
    db.query(sql, [
        idu,
        idn
    ],
        (err, res) => {
            if (err) {
                console.log(`No se pudo eliminar la nota ${err}`);
                callback(err, null);

            } else {
                console.log(`Nota eliminada con el id ${idu}`);
                callback(null, res);


            }
        }
    )
}

module.exports = Note;