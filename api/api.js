require("dotenv").config();

const API_KEY = process.env.API_KEY;
const back = 3;
// may want to limit requests to 200

const request = async (type, ...params) => {
  const options = {
    method: "GET",
    headers: { "X-eBirdApiToken": API_KEY },
    redirect: "follow",
  };
  switch (type) {
    case "reg":
      var data = await fetch(
        `https://api.ebird.org/v2/data/obs/${params[0]}/recent?back=${back}&maxResults=30`,
        options
      ).then((response) => response.json());
      break;
    case "reg-rare":
      console.log('someone made a "reg-rare" request');

      var data = await fetch(
        `https://api.ebird.org/v2/data/obs/${params[0]}/recent/notable?back=${back}&maxResults=30`,
        options
      ).then((response) => response.json());
      break;
    case "reg-species":
      console.log('someone made a "reg-species" request');

      var data = await fetch(
        `https://api.ebird.org/v2/data/obs/${params[0]}/recent/${params[1]}&back=${back}`,
        options
      ).then((response) => response.json());
      break;
    case "ll":
      let lat = params[0];
      let lng = params[1];
      console.log(lat);
      console.log(lng);
      var data = await fetch(
        `https://api.ebird.org/v2/data/obs/geo/recent?lat=${lat}&lng=${lng}&back=${back}&maxResults=30`,
        options
      ).then((response) => response.json());
      break;
    case "ll-rare":
      let latRare = params[0];
      let lngRare = params[1];
      console.log(latRare);
      console.log(lngRare);
      var data = await fetch(
        `https://api.ebird.org/v2/data/obs/geo/recent/notable?lat=${latRare}&lng=${lngRare}&back=${back}&maxResults=30`,
        options
      ).then((response) => response.json());
      break;
    case "ll-species":
      var data = await fetch(
        `https://api.ebird.org/v2/data/obs/geo/recent/${params[2]}?lat=${params[0]}&lng=${params[1]}?back=${back}`,
        options
      ).then((response) => response.json());
      break;
    case "shared":
      var data = await fetch(
        `https://api.ebird.org/v2/ref/adjacent/${params[0]}`,
        options
      ).then((response) => response.json());
      break;
    case "hotspot-reg":
      var data = await fetch(
        `https://api.ebird.org/v2/ref/hotspot/${params[0]}`,
        options
      ).then((response) => response.json());
      break;
    case "hotspot-ll":
      var data = await fetch(
        `https://api.ebird.org/v2/ref/hotspot/geo?lat=${params[0]}&lng=${params[1]}`,
        options
      ).then((response) => response.json());
      break;
    default:
      var data = "";
      break;
  }
  console.log(data);
  return data;
};

const processData = (data) => {
  let processed = [];
  data.map((datum) => processed.push(datum));
  return processed;
};

const getSightingsFromRegion = async (regCode) => {
  const data = await request("reg", regCode);
  return processData(data);
};

const getSightingsRareFromRegion = async (regCode) => {
  const data = await request("reg-rare", regCode);
  return processData(data);
};

const getSightingsFromCoords = async (lat, lng) => {
  console.log(`getSightingsFromCoords`);
  console.log(lat);
  console.log(lng);
  const data = await request("ll", lat, lng);
  console.log(`Data from getSightingsFromCoords:`);
  console.log(data);
  return processData(data);
};

const getSightingsRareFromCoords = async (lat, lng) => {
  console.log(`getSightingsRareFromCoords`);
  console.log(lat);
  console.log(lng);
  const data = await request("ll-rare", lat, lng);
  return processData(data);
};

const getSpeciesInRegion = async (regCode, speciesCode) => {
  const data = await request("reg-species", regCode, speciesCode);
  return processData(data);
};
const getSpeciesFromCoords = async (lat, lng, speciesCode) => {
  const data = await request("ll-species", lat, lng, speciesCode);
  return processData(data);
};

const getNearestObsFromCoords = async (lat, lng) => {
  const data = await request("ll", lat, lng);
  return processData(data);
};

const getSharedBorders = async (regCode) => {
  const data = await request("shared", regCode);
  return processData(data);
};

const getHotspotsFromRegion = async (regCode) => {
  const data = await request("hotspot-reg", regCode);
  return processData(data);
};

const getHotspotsFromCoords = async (lat, lng) => {
  const data = await request("hotspot-ll", lat, lng);
  return processData(data);
};

const getSpeciesCodes = () => {};

const getRegionCodes = () => {};

module.exports = {
  getSightingsFromRegion,
  getSightingsRareFromRegion,
  getSightingsFromCoords,
  getSightingsRareFromCoords,
  getSpeciesInRegion,
  getSpeciesFromCoords,
  getNearestObsFromCoords,
  getSharedBorders,
  getHotspotsFromRegion,
  getHotspotsFromCoords,
  getRegionCodes,
};
