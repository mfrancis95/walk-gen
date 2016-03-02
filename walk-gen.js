var fs = require("fs");
var path = require("path");

function* walk(directory, maxDepth) {
    yield* walkHelper(directory, maxDepth, 0);
}

function* walkHelper(directory, maxDepth, currentDepth) {
    if (currentDepth <= maxDepth) {
        for (var file of fs.readdirSync(directory)) {
            file = path.join(directory, file);
            if (fs.statSync(file).isDirectory()) {
                yield* walkHelper(file, maxDepth, currentDepth + 1);
            }
            else {
                yield file;
            }
        }
    }
}

exports.walk = walk;
