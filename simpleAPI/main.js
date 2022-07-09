const {Database} = require("./Database.js");
const {App} = require("./App.js");

async function main() {
    const database = new Database({
        host: "localhost",
        user: "root",
        password: "",
        database: "apitest"
    });

    const conn = await database.createConnnection();
    const result = await conn.getRes("select * from client;");

    const app = new App(1000, (req, res) => {
        console.log("a request has been performed");

        const bearer = req.headers["authorization"];
        const verification = app.verify(bearer, "elhalili");

        if(!verification.isVerified || verification.payload.name !== "amine") {
            res.statusCode = 403;
            res.end("Forbidden !");
        }

        else if(req.url != "/") {
            res.statusCode = 404;
            res.end("Not found !");
        }

        else {
            res.statusCode = 200;
            res.setHeader("Content-type", "application/json");
            res.setHeader("Access-Control-Allow-Origin", "*")
            res.write(JSON.stringify(result))
            res.end();
        }
    });

    app.run((err) => {
        if(err) throw "App " + err;
        else console.log("Done"); 
    });
}

main();

