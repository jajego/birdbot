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
    .setDescription(
      "Finds notable sightings within 50km of a given latitude & longitude."
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
      queryContent: `${lat.substring(0, 6)}, ${lng.substring(0, 6)}`,
      sightings: JSON.stringify(data),
    };
    await addQuery(query);

    let reply = "";
    let replyHeader = `**Pulled ${data.length} sightings from ${lat}, ${lng}!**`;
    let replyBody = "";
    let replyCloser = `See photos and locations [here](https://ginkgo.page/q/${query.queryId}).`;
    for (let sighting of data) {
      replyBody = replyBody + "- " + sighting.comName + "\n";
    }
    reply = `${replyHeader} \`\`\`${replyBody}\`\`\`\n${replyCloser}`;

    return interaction.reply(reply);
  },
};
