const { Client, GatewayIntentBits, EmbedBuilder, PermissionsBitField, Permissions, MessageManager, Embed, Collection } = require(`discord.js`);
const fs = require('fs');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] }); 
const { Events } = require ('discord.js');
const { QuickDB } = require("quick.db");
const db = new QuickDB();


client.commands = new Collection();

require('dotenv').config();

const functions = fs.readdirSync("./src/functions").filter(file => file.endsWith(".js"));
const eventFiles = fs.readdirSync("./src/events").filter(file => file.endsWith(".js"));
const commandFolders = fs.readdirSync("./src/commands");

(async () => {
    for (file of functions) {
        require(`./functions/${file}`)(client);
    }
    client.handleEvents(eventFiles, "./src/events");
    client.handleCommands(commandFolders, "./src/commands");
    client.login(process.env.token)
})();

const figlet = require("figlet")
figlet.text("REDKZX", function (err, data){
 console.log(data)
});

//Anti Crash

client.on("error", (err) => {
    const ChannelID = "1112903325298458654";
    const Embed = new EmbedBuilder()
      .setColor("Red")
      .setTimestamp()
      .setFooter({ text: "Anti Crash system" })
      .setTitle("Error Encountered");
    const Channel = client.channels.cache.get(ChannelID);
    if (!Channel) return;
    Channel.send({
      embeds: [
        Embed.setDescription(
          "**Discord API Error/Catch:\n\n** ```" + err + "```"
        ),
      ],
    });
  });
  
  process.on("unhandledRejection", (reason, p) => {
    const ChannelID = "1112903325298458654";
    console.log("Unhandled promise rejection:", reason, p);
    const Embed = new EmbedBuilder()
      .setColor("Red")
      .setTimestamp()
      .setFooter({ text: "Anti Crash system" })
      .setTitle("Error Encountered");
    const Channel = client.channels.cache.get(ChannelID);
    if (!Channel) return;
    Channel.send({
      embeds: [
        Embed.setDescription(
          "**Unhandled Rejection/Catch:\n\n** ```" + reason + "```"
        ),
      ],
    });
  });
  
  process.on("uncaughtException", (err, origin) => {
    const ChannelID = "1112903325298458654";
    const Embed = new EmbedBuilder()
      .setColor("Red")
      .setTimestamp()
      .setFooter({ text: "Anti Crash system" })
      .setTitle("Error Encountered");
    const Channel = client.channels.cache.get(ChannelID);
    if (!Channel) return;
    Channel.send({
      embeds: [
        Embed.setDescription(
          "**Uncought Exception/Catch:\n\n** ```" + err + "```"
        ),
      ],
    });
  });
  
  process.on("uncaughtExceptionMonitor", (err, origin) => {
    const ChannelID = "1112903325298458654";
    const Embed = new EmbedBuilder()
      .setColor("Red")
      .setTimestamp()
      .setFooter({ text: "Anti Crash system" })
      .setTitle("Error Encountered");
    const Channel = client.channels.cache.get(ChannelID);
    if (!Channel) return;
    Channel.send({
      embeds: [
        Embed.setDescription(
          "**Uncaught Exception Monitor/Catch:\n\n** ```" + err + "```"
        ),
      ],
    });
  });
  
  process.on("warning", (warn) => {
    const ChannelID = "1112903325298458654";
    const Embed = new EmbedBuilder()
      .setColor("Red")
      .setTimestamp()
      .setFooter({ text: "Anti Crash system" })
      .setTitle("Error Encountered");
    const Channel = client.channels.cache.get(ChannelID);
    if (!Channel) return;
    Channel.send({
      embeds: [
        Embed.setDescription(
          "**Warning/Catch:\n\n** ```" + warn + "```"
        ),
      ],
    });
  });
