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

let codes = require("../utils/codes.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("region-rare")
    .setDescription(
      "Finds notable sightings within a region (locally or nationally rare species, or otherwise unusual.)"
    )
    .addStringOption((option) =>
      option
        .setName("regioncode")
        .setDescription("Region code")
        .setRequired(true)
    ),
  async execute(interaction) {
    // Need to check if country code is valid
    const regCode = interaction.options.getString("regioncode");
    let region = "";
    for (let country of codes) {
      if (country["alpha-2"] == regCode) {
        region = country.name;
      }
    }

    if (region == "" || region == undefined) {
      region = regCode;
    }
    const data = await getSightingsRareFromRegion(regCode);
    if (data.length == 0) {
      return interaction.reply(
        `No sightings reported for country code ${regCode}!`
      );
    }
    const query = {
      queryId: crypto.randomBytes(16).toString("hex"),
      queryContent: region,
      sightings: JSON.stringify(data),
    };
    await addQuery(query);

    let reply = "";
    let replyHeader = `**Pulled ${data.length} sightings from ${region}!**`;
    let replyBody = "";
    let replyCloser = `See photos and locations [here](https://ginkgo.page/q/${query.queryId}).`;
    for (let sighting of data) {
      replyBody = replyBody + "- " + sighting.comName + "\n";
    }
    reply = `${replyHeader} \`\`\`${replyBody}\`\`\`\n${replyCloser}`;
    return interaction.reply(reply);
  },
};
