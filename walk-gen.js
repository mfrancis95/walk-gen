var fs = require("fs");
var path = require("path");

function* walk(directory, maxDepth, yieldDirectories, followSymbolicLinks) {
    yield* walkHelper(directory, maxDepth, yieldDirectories, followSymbolicLinks, 0);
}

function* walkHelper(directory, maxDepth, yieldDirectories, followSymbolicLinks, currentDepth) {
    if (currentDepth <= maxDepth) {
        for (var file of fs.readdirSync(directory)) {
            file = path.join(directory, file);
            var stats = fs.lstatSync(file);
            if (stats.isSymbolicLink()) {
                yield file;
                if (followSymbolicLinks) {
                    yield* walkHelper(file, maxDepth, yieldDirectories, followSymbolicLinks, currentDepth + 1);
                }
            }
            else if (stats.isDirectory()) {
                if (yieldDirectories) {
                    yield file;
                }
                yield* walkHelper(file, maxDepth, yieldDirectories, followSymbolicLinks, currentDepth + 1);
            }
            else {
                yield file;
            }
        }
    }
}

module.exports = walk;
