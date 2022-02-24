//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
  selectInputDropdownList();
}

//prepend a 0 to single digit numbers to display season/episode
function formatNumber(episodeNumber) {
  return episodeNumber.toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
}

//create div el
function createTVEpisodeDiv() {
  const tvEpisode = document.createElement("div");
  tvEpisode.classList.add("tv-episode");
  return tvEpisode;
}

//create episode title
function createEpisodeTitle(tvEpisodeDiv, episode) {
  const episodeTitle = document.createElement("h1");
  episodeTitle.classList.add("episode-title");

  episodeTitle.innerHTML = `${episode.name} - S${formatNumber(
    episode.season
  )}E${formatNumber(episode.number)}`;

  tvEpisodeDiv.appendChild(episodeTitle);
}

//create div with img tag as child
function createEpisodeImage(tvEpisodeDiv, episode) {
  const imgDiv = document.createElement("div");
  imgDiv.classList.add("img-div");

  const image = document.createElement("img");
  image.src = episode.image.medium;
  imgDiv.appendChild(image);

  tvEpisodeDiv.appendChild(imgDiv);
}

//create div for episode description
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

//Add live search input
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

//The select input should list all episodes in the format: "S01E01 - Winter is Coming"
function selectInputDropdownList() {
  const dropdownList = document.createElement("select");
  const bodyElement = document.getElementsByTagName("body")[0];
  const allEpisodes = getAllEpisodes();
    
  dropdownList.setAttribute("id", "dropdownEpisode");

  bodyElement.insertBefore(dropdownList, bodyElement.children[0]);
 
  allEpisodes.forEach((episode) => {
    const dropdownOption = document.createElement("option");
    dropdownOption.value = `S${formatNumber(episode.season)}E${formatNumber(
      episode.number
    )}`;
    dropdownOption.innerHTML = `S${formatNumber(episode.season)}E${formatNumber(
      episode.number
    )} - ${episode.name}`;
    dropdownList.appendChild(dropdownOption);
  });

  dropdownList.addEventListener("change", () => onEpisodeSelect());
}

// user makes a selection, they should be taken directly to that episode in the list
function onEpisodeSelect() {
  const selectedCode = document.getElementById("dropdownEpisode").value;

  const rootElem = document.getElementById("root");

  const allEpisodes = getAllEpisodes();

  const filteredEpisode = allEpisodes.filter((episode) => {
      const episodeCode = `S${formatNumber(episode.season)}E${formatNumber(episode.number)}`;
      return (episodeCode === selectedCode);
    }
  );

  rootElem.innerHTML = "";
  makePageForEpisodes(filteredEpisode);
}

window.onload = setup;
