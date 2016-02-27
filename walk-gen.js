var fs = require("fs");
var path = require("path");

function* walk(directory) {
    for (var file of fs.readdirSync(directory)) {
        file = path.join(directory, file);
        if (fs.statSync(file).isDirectory()) {
            yield* walk(file);
        }
        else {
            yield file;
        }
    }
}

exports.walk = walk;
