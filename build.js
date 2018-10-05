const path = require("path");
const { fromObservable } = require("./webpack.config");

fromObservable.setOutputPath(path.resolve(__dirname, "dist")).build();
