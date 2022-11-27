# Ginkgo 
[Ginkgo](https://ginkgo.page) is a Discord bot that makes requests to Cornell's Lab of Ornithology eBird API to provide server members with constantly updated bird sighting data from around the world. It provides the ability to query by region, a pair of coordinate points, or species. It also scrapes Wikipedia for high resolution photos of each sighted bird and caches the links for future use.

## Examples

- Ohio: https://www.ginkgo.page/q/a9a2e6ef53f163efef3ab6e518fe8541
- Japan: https://www.ginkgo.page/q/4af16da431e1d461558b7b3e8c8bf6f0
- Latvia: https://ginkgo.page/q/0523ee650810ccb75445388f22194311

## Local use
If you would like to run Ginkgo locally, you will need to host:
- The bot itself (this repo)
- [The database server](https://github.com/jajego/ginkgo-server) 
- [The photo scraper](https://github.com/jajego/bird-scraper)
- [The front-end](https://github.com/jajego/birdbot-frontend)

Additionally, you will need to sign up for an API key from Cornell. [You can do so here for free.](https://ebird.org/api/keygen)

## Stack
Ginkgo was built with React, Discord.js, Node.js, Express, Flask, and SQLite.
