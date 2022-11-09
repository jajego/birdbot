const { SlashCommandBuilder } = require("discord.js");
let json = require("../utils/codes.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("codes")
    .setDescription("Replies with Pong!"),
  async execute(interaction) {
    console.log(json);
    console.log(json.length);
    let reply = "";
    for (let country of json) {
      reply += `${country.name.substring(0, 5)}${country["alpha-2"]} `;
    }

    reply = "```" + reply + "```";
    return interaction.reply(reply);
  },
};
