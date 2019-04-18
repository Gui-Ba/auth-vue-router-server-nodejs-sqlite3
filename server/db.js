"use strict";
const sqlite3 = require('sqlite3').verbose();

class Db {
    constructor(file) {
      // this.db = new sqlite3.Database(file);
        this.db = new sqlite3.Database('filedb.db', (err) => {
              if (err) {
                console.error(err.message);}
                console.log('Connected to the database.');
              });
        this.createTable()
    }

    createTable() {
        const sql = `
            CREATE TABLE IF NOT EXISTS user (
                id integer PRIMARY KEY,
                name text,
                email text UNIQUE,
                user_pass text,
                is_admin integer)`
        return this.db.run(sql);


    }



         // selectAlll(callback) {
         //           return this.db.all( `SELECT  name name, email email, user_pass user_pass FROM user
         //                  ORDER BY name`, (err, rows) => {
         //         if (err) {
         //           throw err;
         //         }
         //         rows.forEach((row) => {
         //           console.log(row.name, row.email, row.user_pass);
         //         });
         //       });
         //     }



    selectByEmail(email, callback) {
        return this.db.get(
            `SELECT * FROM user WHERE email = ?`,
            [email],function(err,row){
                callback(err,row)
            })
    }

    insertAdmin(user, callback) {
        return this.db.run(
            'INSERT INTO user (name,email,user_pass,is_admin) VALUES (?,?,?,?)',
            user, (err) => {
                callback(err)
            })
    }

    selectAll(callback) {
        return this.db.all(`SELECT * FROM user`, function(err,rows){
            callback(err,rows)
        })
    }

    insert(user, callback) {
        return this.db.run(
            'INSERT INTO user (name,email,user_pass) VALUES (?,?,?)',
            user, (err) => {
                callback(err)
            })
    }
}

module.exports = Db
