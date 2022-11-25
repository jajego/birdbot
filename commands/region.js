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
    .setName("region")
    .setDescription("Finds sightings within a region")
    .addStringOption((option) =>
      option
        .setName("regioncode")
        .setDescription("Region code")
        .setRequired(true)
    ),
  async execute(interaction) {
    // Need to check if country code is valid
    const regCode = interaction.options.getString("regioncode");
    const data = await getSightingsFromRegion(regCode);
    if (data.length == 0) {
      return interaction.reply(`No sightings reported for region ${regCode}!`);
    }
    const query = {
      queryId: crypto.randomBytes(16).toString("hex"),
      queryContent: regCode,
      sightings: JSON.stringify(data),
    };
    await addQuery(query);

    return interaction.reply(
      `Pulled ${data.length} sightings from ${regCode}! Success! http://localhost:3001/q/${query.queryId}`
    );
  },
};
