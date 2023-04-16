const {
    ChatInputCommandInteraction,
    SlashCommandBuilder,
    EmbedBuilder,
  } = require("discord.js");
  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName("imageai")
      .setDescription("create an AI image")
      .setDMPermission(false)
      .addStringOption((options) =>
        options
          .setName("prompt")
          .setDescription("prompt to produce image")
          .setRequired(true)
      ),
    /**
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction) {
        const { default: midjourney } = await import("midjourney-client");
        const promptOption = interaction.options.getString('prompt');
    
            if (!promptOption) {
          return interaction.reply({ content: 'No prompt option was provided.', ephemeral: true });
        }
    
        try {
          await interaction.reply("Reds using his brain power hang tight...");
          const response = await midjourney(promptOption);
    
          if (response.length < 1) {
            return interaction.editReply("Unable to generate images lol😭.");
          }
    
          const imageURLs = response.join("\n");
          interaction.editReply({
            content: `**${promptOption}**`,
            embeds: [
              {
                image: { url: imageURLs },
                footer: { text: "Cheese is the best- Red" },
              },
            ],
          });
        } catch (error) {
          console.error(error);
          interaction.editReply({ content: "An error occurred while generating the image.", ephemeral: true });
        }
    },
  };

//Cheese is the best -red
