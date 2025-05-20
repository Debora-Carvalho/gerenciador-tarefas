const mongoose = require("mongoose");
mongoose.Promise = globalThis.Promise;
const url = 'mongodb://127.0.0.1/ZL';

mongoose.connect(url).then(() => {
    console.log("Conectado ao MongoDB");
}).catch((err) => {
    console.log("Erri ao conectar ao MongoDB: " + err);
});