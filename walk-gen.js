var fs = require("fs");
var path = require("path");

function* walk(directory, maxDepth, yieldDirectories) {
    yield* walkHelper(directory, maxDepth, 0, yieldDirectories);
}

function* walkHelper(directory, maxDepth, currentDepth, yieldDirectories) {
    if (currentDepth <= maxDepth) {
        for (var file of fs.readdirSync(directory)) {
            file = path.join(directory, file);
            if (fs.statSync(file).isDirectory()) {
                if (yieldDirectories) {
                    yield file;
                }
                yield* walkHelper(file, maxDepth, currentDepth + 1);
            }
            else {
                yield file;
            }
        }
    }
}

exports.walk = walk;
