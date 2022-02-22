//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function formatNumber(episodeNumber) {
  return episodeNumber.toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
}

function createTVEpisodeDiv() {
  const tvEpisode = document.createElement("div");
  tvEpisode.classList.add("tv-episode");
  return tvEpisode;
}

function createEpisodeTitle(tvEpisodeDiv, episode) {
  const episodeTitle = document.createElement("h1");
  episodeTitle.classList.add("episode-title");

  episodeTitle.innerHTML = `${episode.name} - S${formatNumber(
    episode.season
  )}E${formatNumber(episode.number)}`;

  tvEpisodeDiv.appendChild(episodeTitle);
}

function createEpisodeImage(tvEpisodeDiv, episode) {
  const imgDiv = document.createElement("div");
  imgDiv.classList.add("img-div");

  const image = document.createElement("img");
  image.src = episode.image.medium;
  imgDiv.appendChild(image);

  tvEpisodeDiv.appendChild(imgDiv);
}

function createEpisodeDescription(tvEpisodeDiv, episode) {
  const descDiv = document.createElement("div");
  descDiv.classList.add("episode-description");

  descDiv.insertAdjacentHTML("beforeend", episode.summary);

  tvEpisodeDiv.appendChild(descDiv);
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.textContent = `Got ${episodeList.length} episode(s)`;

  episodeList.forEach(episode => {
    
    const tvEpisodeDiv = createTVEpisodeDiv();

    createEpisodeTitle(tvEpisodeDiv, episode);

    createEpisodeImage(tvEpisodeDiv, episode);
   
    createEpisodeDescription(tvEpisodeDiv, episode);

    rootElem.appendChild(tvEpisodeDiv);
  });
}

window.onload = setup;
