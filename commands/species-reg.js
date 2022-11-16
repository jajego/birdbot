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
    .setDescription("Finds sightings of a species within a region")
    .addStringOption((option) =>
      option
        .setName("speciescode")
        .setDescription("Species code per eBird's taxonomy system")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("regioncode")
        .setDescription("Region code")
        .setRequired(true)
    ),
  async execute(interaction) {
    // Need to check if country code is valid
    const specCode = interaction.options.getString("speciescode");
    const regCode = interaction.options.getString("regioncode");
    const data = await getSpeciesInRegion(specCode, regCode);
    if (data.length == 0) {
      return interaction.reply(
        `No sightings of ${specCode} reported in region ${regCode}!`
      );
    }
    const query = {
      queryId: crypto.randomBytes(16).toString("hex"),
      queryContent: `${specCode} @ ${regCode}`,
      sightings: JSON.stringify(data),
    };
    await addQuery(query);

    return interaction.reply(
      `Success! See results at http://localhost:3001/q/${query.queryId}`
    );
  },
};