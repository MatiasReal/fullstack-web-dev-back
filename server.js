const express = require("express");
const app = express();//construye el objeto app

const http = require("https").createServer(app);
const cors = require("cors");

const PORT = process.env.PORT || 5000;
//cons uri = process.env.MONGO_URI;

http.listen(PORT, () => {
    console.log(`Listening to ${PORT}`);
});
