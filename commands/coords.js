const { SlashCommandBuilder } = require("discord.js");
const crypto = require("crypto");

const { addQuery, getQuery } = require("../services/query");
const { getImages } = require("../services/images");
const {
  getSightingsFromCoords,
  getSightingsRareFromCoords,
  getRegionCodes,
} = require("../api/api.js");

const regionCodes = getRegionCodes();

module.exports = {
  data: new SlashCommandBuilder()
    .setName("coords")
    .setDescription(
      "Finds sightings within 50km of a given latitude and longitude."
    )
    .addStringOption((option) =>
      option.setName("latitude").setDescription("Latitude").setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("longitude").setDescription("Longitude").setRequired(true)
    ),
  async execute(interaction) {
    // Need to check if country code is valid
    const lat = interaction.options.getString("latitude");
    const lng = interaction.options.getString("longitude");
    const data = await getSightingsFromCoords(lat, lng);
    console.log("Data:");
    console.log(data);
    if (data.length == 0) {
      return interaction.reply(
        `No sightings reported for coordinates ${lat}, ${lng}!`
      );
    }
    const query = {
      queryId: crypto.randomBytes(16).toString("hex"),
      queryContent: `${lat.substring(0, 6)}, ${lng.substring(0, 6)}`,
      sightings: JSON.stringify(data),
    };
    await addQuery(query);

    return interaction.reply(
      `Success! See results at http://localhost:3000/q/${query.queryId}`
    );
  },
};
