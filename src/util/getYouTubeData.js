const baseApiUrl = "https://www.googleapis.com/youtube/v3";

async function getYoutubeData(apiKey) {
  const res = await fetch(`${baseApiUrl}?part=snippet&playlistId=RDJI4B8pj5G1M&maxResults=10&key=${apiKey}`);
  const data = await res.json();
  return data;
}

module.exports = getYoutubeData;