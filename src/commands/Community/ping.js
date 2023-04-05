const { SlashCommandBuilder, CommandInteraction, PermissionFlagsBits, EmbedBuilder } = require("discord.js");
 
module.exports = {
    data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('pong or smt')
    .setDMPermission(false),
    async execute(interaction, client) {
        const embed = new EmbedBuilder()
        .setDescription(`:ping_pong: | Pong! Latency: **${client.ws.ping} MS**`)
        .setColor("Blue")
        .setTimestamp();
        
        await interaction.reply({ embeds: [embed] })
    }
}
//+()
