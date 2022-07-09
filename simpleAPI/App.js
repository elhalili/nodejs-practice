const http = require("http");
const jwt = require("jsonwebtoken");


class App {
    //callback for handling (request, respond)
    constructor(port, callback) {
        this.port = port;
        this.server = http.createServer(callback);
    }

    //callback for handling the runnig of server
    run(callback) {
        this.server.listen(this.port, callback);
    }

    //jwt token verfication
    verify(bearer, key) {
        if(bearer == undefined) {
            return {
                isVerified: false,
                payload: {}
            };
        }

        const token = bearer.split(" ")[1];
        const returnedValue = {};

        jwt.verify(token, key, (err, data) => {
            returnedValue.isVerified = err ? false: true;
            returnedValue.payload = err? {}: data;
        })
        
        return returnedValue;
    }
}

module.exports.App = App;