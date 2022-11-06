const getImages = async (birds) => {
  fetch(`http://localhost:5001/birds`, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    redirect: "follow",
    data: { birds: birds },
  })
    .then((response) => response.json())
    .then((data) => console.log(data));
};

module.exports = {
  getImages,
};
