const mysql = require("mysql");

class Database {
    //config => database configiration
    constructor(config) {
        this.config = config;
    }

    //establsh the connection to mysql
    createConnnection() {
        return new Promise((resolve, reject) => {
            this.conn = mysql.createConnection(this.config);
            this.conn.connect((err) => {
                if(err) reject("First error" + err);

                resolve(this);
            })

        })
    }

    // get result of select query
    getRes(q) {
        return new Promise((res, rej) => {
            this.conn.query(q, (err, resu) => {
                if(err) rej("connection :::", err);
                res(resu);
            })
        })
    }
}

module.exports.Database = Database;