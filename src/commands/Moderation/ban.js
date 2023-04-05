module.exports = {
    data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription(`Ban a user`)
    .addUserOption(option => option.setName('user').setDescription(`The person to get banned.`).setRequired(true))
    .addStringOption(option => option.setName('reason').setDescription(`Reson for ban?`).setRequired(true)),
    async execute(interaction, client) {
 
        const users = interaction.options.getUser('user');
        const ID = users.id;
        const banUser = client.users.cache.get(ID)
 
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers)) return await interaction.reply({ content: "Red doesnt let you ban people", ephemeral: true});
        if (interaction.member.id === ID) return await interaction.reply({ content: "Unable to ban self.", ephemeral: true});
 
        let reason = interaction.options.getString('reason');
        if (!reason) reason = "No reason given";
 
        const dmEmbed = new EmbedBuilder()
        .setColor("Red")
        .setDescription(`You have been banned from **${interaction.guild.name}** | ${reason}`)
        .setFooter('Bot made by R͓̽e͓̽d͓̽#9999')
 
        const embed = new EmbedBuilder()
        .setColor("Red")
        .setDescription(`${banUser.tag} has been banned | ${reason}`)
        .setFooter('Bot made by R͓̽e͓̽d͓̽#9999')
 
        await interaction.guild.bans.create(banUser.id, {reason}).catch(err => {
            return interaction.reply({ content: "I cannot ban this member!", ephemeral: true})
        })
 
        await banUser.send({ embeds: [dmEmbed] }).catch(err => {
            return;
        })
 
        await interaction.reply({ embeds: [embed] });
    } 
}
//Hammer time//
//Made by red
