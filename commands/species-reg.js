const { SlashCommandBuilder } = require("discord.js");
const crypto = require("crypto");

const { addQuery, getQuery } = require("../services/query");
const { getImages } = require("../services/images");
const {
  getSightingsFromRegion,
  getSightingsRareFromRegion,
  getSpeciesInRegion,
  getRegionCodes,
} = require("../api/api.js");

const regionCodes = getRegionCodes();

module.exports = {
  data: new SlashCommandBuilder()
    .setName("species-reg")
    .setDescription("Replies with Pong!")
    .addStringOption((option) =>
      option
        .setName("regioncode")
        .setDescription("The input to echo back")
        .setRequired(true)
    ),
  async execute(interaction) {
    // Need to check if country code is valid
    const regCode = interaction.options.getString("regioncode");
    const data = await getSightingsFromRegion(regCode);
    if (data.length == 0) {
      return interaction.reply(
        `No sightings reported for country code ${regCode}!`
      );
    }
    const query = {
      queryId: crypto.randomBytes(16).toString("hex"),
      queryContent: regCode,
      sightings: JSON.stringify(data),
    };
    await addQuery(query);

    return interaction.reply(
      `Success! See results at http://localhost:3001/q/${query.queryId}`
    );
  },
};
