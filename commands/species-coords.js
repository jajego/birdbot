const { SlashCommandBuilder } = require("discord.js");
const crypto = require("crypto");

const { addQuery, getQuery } = require("../services/query");
const { getImages } = require("../services/images");
const {
  getSpeciesInRegion,
  getSpeciesFromCoords,
  getRegionCodes,
} = require("../api/api.js");

const regionCodes = getRegionCodes();

module.exports = {
  data: new SlashCommandBuilder()
    .setName("species-coords")
    .setDescription("Finds sightings of species within 50km of coordinates")
    .addStringOption((option) =>
      option
        .setName("speciescode")
        .setDescription("Species code")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("latitude").setDescription("latitude").setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("longitude").setDescription("longitude").setRequired(true)
    ),
  async execute(interaction) {
    // Need to check if country code is valid
    const specCode = interaction.options.getString("speciescode");
    const lat = interaction.options.getString("latitude");
    const lng = interaction.options.getString("longitude");
    const data = await getSpeciesFromCoords(specCode, lat, lng);
    if (data.length == 0) {
      return interaction.reply(
        `No sightings reported for species ${specCode} at ${lat}, ${lng}!`
      );
    }
    const query = {
      queryId: crypto.randomBytes(16).toString("hex"),
      queryContent: `${specCode} @ ${lat.substring(0, 6)}, ${lng.substring(
        0,
        7
      )}`,
      sightings: JSON.stringify(data),
    };
    await addQuery(query);

    return interaction.reply(
      `Success! See results at http://localhost:3001/q/${query.queryId}`
    );
  },
};
