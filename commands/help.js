const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Tells you how to use Ginkgo"),
  async execute(interaction) {
    let replyLines = [
      "\n",
      "__Sighting commands__\n",
      "- **/species**: Fetch sightings using a species code. [Learn more at eBird.](https://science.ebird.org/en/use-ebird-data/the-ebird-taxonomy)\n",
      "- **/region** **/region-rare**: Fetch (notable) sightings using a region code\n",
      "- **/coords**, **/coords-rare**: Fetch (notable) sightings using latitude and longitude\n",
      "\n",
      "__Utility commands__\n",
      "- **/codes**: Lists region codes\n",
      "- **/codes-us**: Lists US state codes\n",
      "- **/codes-ca**: Lists Canadian province codes",
    ];

    let reply = "";
    replyLines.map((line) => (reply += line));
    return interaction.reply(reply);
  },
};
