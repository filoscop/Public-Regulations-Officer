const {Client} = require('discord.js');
const mongoose = require('mongoose');
const config = require("../../config.json");

module.exports ={
    name: "ready",
    once: true,
   async execute(client) {
    await mongoose.connect(config.mongodb || '', {
        keepAlive: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    if (mongoose.connect) {
        console.log(` [REDKZX] Connected to DataBase in  ${client.ws.ping} ms`.red)
    };
            console.log(' [REDKZX] You wish you were special.'.red);
        },
};