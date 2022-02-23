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

function search() {
  const input = document.getElementById("search");
  const filter = input.value.toLowerCase();
  const rootElem = document.getElementById("root");

  const allEpisodes = getAllEpisodes();
  
  const filteredEpisodes = allEpisodes.filter(
    (episode) =>
      episode.name.toLowerCase().includes(filter) ||
      episode.summary.toLowerCase().includes(filter)
  );

  rootElem.innerHTML = "";
  if (input.length === 0) {
    makePageForEpisodes(allEpisodes);
  } else {
    makePageForEpisodes(filteredEpisodes);
  }
} 

function selectInputDropdownList() {
  const dropdownList = document.createElement("select");
  dropdownList.name = "episodes";
  dropdownList.setAttribute("id", "dropdown-episode");
  const bodyElement = document.getElementsByTagName("body")[0];
  bodyElement.insertBefore(dropdownList, bodyElement.children[0]);
 

  const allEpisodes = getAllEpisodes();
  allEpisodes.forEach((episode) => {
    const dropdownOption = document.createElement("option");
    dropdownOption.value = "episode";

    dropdownOption.innerHTML = `S${formatNumber(episode.season)}E${formatNumber(
      episode.number
    )} - ${episode.name}`;

    dropdownList.appendChild(dropdownOption);
  });
}
selectInputDropdownList();



window.onload = setup;
