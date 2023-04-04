const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = '!'; // Replace with your desired prefix

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message => {
  // Ignore messages sent by the bot itself
  if (message.author.bot) return;

  // Ignore messages that don't start with the prefix
  if (!message.content.startsWith(prefix)) return;

  // Split the message into a command and arguments
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  // Check if the command is a moderation command
  if (command === 'kick') {
    // Check if the user has permission to kick members
    if (!message.member.hasPermission('KICK_MEMBERS')) {
      return message.reply('You do not have permission to use this command.');
    }

    // Check if a user was mentioned
    const member = message.mentions.members.first();
    if (!member) {
      return message.reply('Please mention a valid user to kick.');
    }

    // Kick the user
    member.kick().then(() => {
      message.reply(`${member.user.tag} was kicked.`);
    }).catch(error => {
      console.error(error);
      message.reply('An error occurred while trying to kick the user.');
    });
  } else if (command === 'ban') {
    // Check if the user has permission to ban members
    if (!message.member.hasPermission('BAN_MEMBERS')) {
      return message.reply('You do not have permission to use this command.');
    }

    // Check if a user was mentioned
    const member = message.mentions.members.first();
    if (!member) {
      return message.reply('Please mention a valid user to ban.');
    }

    // Ban the user
    member.ban().then(() => {
      message.reply(`${member.user.tag} was banned.`);
    }).catch(error => {
      console.error(error);
      message.reply('An error occurred while trying to ban the user.');
    });
  } else if (command === 'purge') {
    // Check if the user has permission to delete messages
    if (!message.member.hasPermission('MANAGE_MESSAGES')) {
      return message.reply('You do not have permission to use this command.');
    }

    // Check if an argument was provided
    const amount = parseInt(args[0]);
    if (isNaN(amount)) {
      return message.reply('Please provide a valid number of messages to delete.');
    }

    // Delete the messages
    message.channel.bulkDelete(amount, true).catch(error => {
      console.error(error);
      message.reply('An error occurred while trying to delete the messages.');
    });
  }
});

client.login('your-bot-token-here');

