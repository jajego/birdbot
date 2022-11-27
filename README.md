# Ginkgo 
Ginkgo is a Discord bot that makes requests to Cornell's Lab of Ornithology eBird API to provide server members with constantly updated bird sighting data from around the world. It provides the ability to query by region, a pair of coordinate points, or species. It also scrapes Wikipedia for high resolution photos of each sighted bird and caches the links for future use.

## Stack
Ginkgo was built with React, Discord.js, Node.js, Express, Flask, and SQLite.

## Local use
If you would like to run Ginkgo locally, you will need to host:
- The bot itself (this repo!)
- [The database server](https://github.com/jajego/ginkgo-server) 
- [The photo scraper](https://github.com/jajego/bird-scraper)
- [The front-end](https://github.com/jajego/birdbot-frontend)

Additionally, you will need to sign up for an API key from Cornell. [You can do so here for free.](https://ebird.org/api/keygen)
