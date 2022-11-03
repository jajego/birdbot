const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("birds")
    .setDescription("Looks for birds"),
  async execute(interaction) {
    const options = {
      method: "GET",
      headers: { "X-eBirdApiToken": API_KEY },
      redirect: "follow",
    };
    let sightings = [];
    const data = await fetch(
      "https://api.ebird.org/v2/data/obs/US/recent/notable?detail=full",
      options
    ).then((response) => response.json());

    data.map((sighting) =>
      sightings.push({
        comName: sighting.comName,
        sciName: sighting.sciName,
        howMany: sighting.howMany,
        locName: sighting.locName,
        locationPrivate: sighting.locationPrivate,
        lat: sighting.lat,
        lng: sighting.lng,
      })
    );

    let reply = "";
    let lastIndex;
    let reached = false;
    // not what map is for - better to use reduce
    sightings.map((bird, i) => {
      const currLength = reply.length;
      if (
        (reply + `${bird.comName} (${bird.howMany}) - ${bird.locName}`).length >
        2000
      ) {
        reply = reply;
        if (!reached) {
          lastIndex = i;
          reached = true;
        }
      } else {
        reply = reply + `${bird.comName} (${bird.howMany}) - ${bird.locName}\n`;
      }
    });
    console.log(`Reached limit at ${lastIndex}`);
    reply = "";

    for (let i = 0; i < lastIndex; i++) {
      reply =
        reply +
        `[${sightings[i].comName}](http://en.wikipedia.org/wiki/${sightings[
          i
        ].sciName.replace(" ", "_")})` +
        ` (${sightings[i].howMany}) @ [${sightings[i].locName}](https://www.google.com/maps/@${sightings[i].lat},${sightings[i].lng},15z)\n`;
    }
    reply = reply.substring(0, 1999);
    return interaction.reply(reply);
  },
};
