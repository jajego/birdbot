# Ginkgo 
[Ginkgo](https://ginkgo.page) is a Discord bot that makes requests to Cornell's Lab of Ornithology eBird API to provide server members with recent bird sighting data from around the world. It provides the ability to query by region, a pair of coordinate points, or species. It also scrapes eBird for photos of each sighted bird and caches the links for future use.

## Examples

- Ohio (USA): https://ginkgo.page/q/3deea5cfa020c63acdfb029790f44e37
- Japan: https://ginkgo.page/q/46183b3d8b1c0bafc73e127e0b38f600
- New Caledonia: https://ginkgo.page/q/1294593b9ff84bf139199d6063dbfced

## Local use
If you would like to run Ginkgo locally, you will need to host:
- The bot itself (this repo)
- [The database server](https://github.com/jajego/ginkgo-server) 
- [The photo scraper](https://github.com/jajego/bird-scraper)
- [The front-end](https://github.com/jajego/birdbot-frontend)

Additionally, you will need to sign up for an API key from Cornell. [You can do so here for free.](https://ebird.org/api/keygen)

## Stack
Ginkgo was built with React, Discord.js, Node.js, Express, Flask, and SQLite.
