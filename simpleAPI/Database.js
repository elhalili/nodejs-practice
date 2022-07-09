const mysql = require("mysql");

class Database {
    constructor(config) {
        this.config = config;
    }

    createConnnection() {
        return new Promise((resolve, reject) => {
            this.conn = mysql.createConnection(this.config);
            this.conn.connect((err) => {
                if(err) reject("First error" + err);

                resolve(this);
            })

        })
    }

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