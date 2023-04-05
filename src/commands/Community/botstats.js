const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName(`botstats`)
    .setDescription('Gives some Public Regulations Officer stats!'),
    async execute (interaction, client) {

        const name = "Public Regulations Officer";
        const icon = `${client.user.displayAvatarURL()}`;
        let servercount = await client.guilds.cache.reduce((a,b) => a+b.memberCount, 0);

        let totalSeconds = (client.uptime / 1000);
        let days = Math.floor(totalSeconds / 86400);
        totalSeconds %= 86400;
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = Math.floor(totalSeconds % 60);

        let uptime = `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;

        let ping = `${Date.now() - interaction.createdTimestamp}ms`;

        const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setLabel(`Invite me to your server!`)
            .setStyle(ButtonStyle.Link)
            .setURL('https://discord.gg/ZD3GW9M5ee'),

            new ButtonBuilder()
            .setLabel('Invite me to your server')
            .setStyle(ButtonStyle.Link)
            .setURL(`https://discord.com/api/oauth2/authorize?client_id=1092962375193342013&permissions=8&scope=bot`)
        )

        const embed = new EmbedBuilder()
        .setColor("Red")
        .setAuthor({ name: name, iconURL: icon })
        .setThumbnail(`${icon}`)
        .setFooter({ text: "Made by Henry."})
        .setTimestamp()
        .addFields({ name: 'Server Numbers', value: `${client.guilds.cache.size}`, inline: true})
        .addFields({ name: 'Server Members', value: `${servercount}`, inline: true})
        .addFields({ name: 'Latency', value: `${ping}`, inline: true})
        .addFields({ name: 'uptime', value: `\`\`\`${uptime}\`\`\``})

        await interaction.reply({ embeds: [embed], components: [row] });
    }
}
//Made by red
