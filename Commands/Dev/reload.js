const { Client, SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const {loadCommands} = require('../../Handlers/commandHandler');
const {loadEvents } = require('../../Handlers/eventHandler');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('reload')
    .setDescription("Reloads Commands or Events")
    .addSubcommand(subcommand =>
        subcommand.setName("commands")
        .setDescription("Reloads Commands")
        )
        .addSubcommand(subcommand =>
            subcommand.setName("events")
            .setDescription("Reloads Events")
            ),

            async execute(interaction, client) {
                
                const { user } = interaction;

                if (user.id !== "756849096479866996") return interaction.reply({
                    embeds: [new EmbedBuilder()
                    .setColor("Red").setDescription("This command is only available for Devs!")], ephemeral: true
                })

                const sub = interaction.options.getSubcommand()
                const embed = new EmbedBuilder()
                .setTitle("Dev Info")
                .setColor("Red")

                switch (sub) {
                    case "commands": {
                        loadCommands(client)
                        interaction.reply({ embeds: [embed.setDescription("Commands Reloaded")] })
                        console.log(` [SYSTEM] ${user} has reloaded the commands`.cyan)
                    }
                    break;
                    case "events": {
                    loadEvents(client)
                    interaction.reply({ embeds: [embed.setDescription("Events Reloaded")] })
                    console.log(` [SYSTEM] ${user} has reloaded the events`.cyan)
                }
                break;
            }
        }
    }
