const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("codes-us")
    .setDescription("Tells you the codes for each US state"),
  async execute(interaction) {
    let reply =
      "US-AL, US-AK, US-AZ, US-AR, US-CA, US-CO, US-CT, US-DE, US-DC, US-FL, US-GA, US-HI, US-ID, US-IL, US-IN, US-IA, US-KS, US-KY, US-LA, US-ME, US-MD, US-MA, US-MI, US-MN, US-MS, US-MO, US-MT, US-NE, US-NV, US-NH, US-NJ, US-NM, US-NY, US-NC, US-ND, US-OH, US-OK, US-OR, US-PA, US-RI, US-SC, US-SD, US-TN, US-TX, US-UT, US-VT, US-VA, US-WA, US-WV, US-WI, US-WY";
    reply = "```" + reply + "```";
    return interaction.reply(reply);
  },
};
