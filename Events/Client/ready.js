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
        console.log(` [HENREH] Connected to DataBase in  ${client.ws.ping} ms`.cyan)
    };
            console.log(' [HENREH] You wish you were special.'.cyan);
        },
};
