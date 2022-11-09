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
    .setName("coords-rare")
    .setDescription("Replies with Pong!")
    .addStringOption((option) =>
      option
        .setName("latitude")
        .setDescription("The input to echo back")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("longitude")
        .setDescription("The input to echo back")
        .setRequired(true)
    ),
  async execute(interaction) {
    // Need to check if country code is valid
    const lat = interaction.options.getString("latitude");
    const lng = interaction.options.getString("longitude");
    const data = await getSightingsRareFromCoords(lat, lng);
    console.log("Data:");
    console.log(data);
    if (data.length == 0) {
      return interaction.reply(
        `No sightings reported for coordinations ${lat}, ${lng}!`
      );
    }
    const query = {
      queryId: crypto.randomBytes(16).toString("hex"),
      queryContent: `${lat}, ${lng}`,
      sightings: JSON.stringify(data),
    };
    await addQuery(query);

    return interaction.reply(
      `Success! See results at http://localhost:3001/q/${query.queryId}`
    );
  },
};
