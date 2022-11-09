const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("codes-ca")
    .setDescription("Replies with Pong!"),
  async execute(interaction) {
    let reply =
      "Alberta: CA-AB\nBritish Columbia: CA-BC\nManitoba: CA-MB\nNew Brunswick: CA-NB\nNewfoundland and Labrador:CA-NL\nNorthwest Territories: CA-NT\nNova Scotia: CA-NS\nNunavut: CA-NU\nOntario: CA-ON\nPrince Edward Island: CA-PE\nQuebec: CA-QC\nSaskatchewan: CA-SK\nYukon Territory: CA-YT";
    reply = "```" + reply + "```";
    return interaction.reply(reply);
  },
};
