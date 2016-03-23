var fs = require("fs");
var path = require("path");

function* walk(directory, maxDepth, yieldDirectories) {
    yield* walkHelper(directory, maxDepth, yieldDirectories, 0);
}

function* walkHelper(directory, maxDepth, yieldDirectories, currentDepth) {
    if (currentDepth <= maxDepth) {
        for (var file of fs.readdirSync(directory)) {
            file = path.join(directory, file);
            if (fs.statSync(file).isDirectory()) {
                if (yieldDirectories) {
                    yield file;
                }
                yield* walkHelper(file, maxDepth, yieldDirectories, currentDepth + 1);
            }
            else {
                yield file;
            }
        }
    }
}

module.exports = walk;
