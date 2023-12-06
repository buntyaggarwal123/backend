'use strict'
const express = require('express')
const app = express()
const cors = require("cors");
const port = process.env.PORT || 3000;
const func = require("./config/mongoose.config")
const authRoute = require('./route/auth-route')
const gameRoute = require('./route/game-route')
app.use(cors({ origin: "*", credentials: true }));

// func();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Server
app.listen(port, () => {
    console.log(`Listening on: http://localhost:${port}`);
 });

///adding route for home page
app.get('/', (req, res) => {
    res.status(200).send('<center><h2><b>Hi, This is Test Project.</b></h2></center>');
});


app.use("/auth/api/v1/", authRoute);
app.use("/game/api/v1",gameRoute)


//The 404 Route
app.get('*', (req, res) => {
    res.send('Page Not found 404', 404);
});

module.exports = app
