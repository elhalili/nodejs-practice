const http = require("http");

class App {
    constructor(port, callback) {
        this.port = port;
        this.server = http.createServer(callback);
    }

    run(callback) {
        this.server.listen(this.port, callback);
    }
}

module.exports.App = App;