let allEpisodes;
let allShows;

async function setup() {
  allEpisodes = await getAllEpisodesFromApi();
  allShows = getAllShows().sort((showA, showB) => {
    return showA.name.localeCompare(showB.name);
  });
  makePageForEpisodes(allEpisodes);
  showDropdownListOptions();
  episodeDropdownListOptions();
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

  episodeTitle.innerHTML = `${episode.name} - ${generateEpisodeCode(episode)}`;

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

function makePageForEpisodes(allEpisodes) {
  const rootElem = document.getElementById("root");
  rootElem.textContent = `Got ${allEpisodes.length} episode(s)`;

  allEpisodes.forEach((episode) => {
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

  const filteredEpisodes = allEpisodes.filter(
    (episode) =>
      episode.name.toLowerCase().includes(filter) ||
      episode.summary.toLowerCase().includes(filter)
  );

  rootElem.innerHTML = "";
  if (input.length === 0) {
    makePageForEpisodes();
  } else {
    makePageForEpisodes(filteredEpisodes);
  }
}

//The select input should list all episodes in the format: "S01E01 - Winter is Coming"
function episodeDropdownListOptions() {
  const episodeDropdownListEl = document.getElementById("episodesDropdownList");
  episodeDropdownListEl.innerHTML = "";
  const dropdownOption = document.createElement("option");
  dropdownOption.value = `showAll`;
  dropdownOption.innerHTML = `Show All Episodes`;
  episodeDropdownListEl.appendChild(dropdownOption);

  allEpisodes.forEach((episode) => {
    const dropdownOption = document.createElement("option");
    dropdownOption.value = `${generateEpisodeCode(episode)}`;
    dropdownOption.innerHTML = `${generateEpisodeCode(episode)} - ${
      episode.name
    }`;
    episodeDropdownListEl.appendChild(dropdownOption);
  });

  episodeDropdownListEl.addEventListener("change", () => onEpisodeSelect());
}

// user makes a selection, they should be taken directly to that episode in the list
function onEpisodeSelect() {
  const selectedCode = document.getElementById("episodesDropdownList").value;

  const rootElem = document.getElementById("root");
  let filteredEpisode = []; 
  if(selectedCode === 'showAll') {
    filteredEpisode = allEpisodes;
  } else {
    filteredEpisode = allEpisodes.filter((episode) => {
      const episodeCode = generateEpisodeCode(episode);
      return episodeCode === selectedCode;
    });
  }

  rootElem.innerHTML = "";
  makePageForEpisodes(filteredEpisode);
}

function generateEpisodeCode(episode) {
  return `S${formatNumber(episode.season)}E${formatNumber(episode.number)}`;
}

function getAllEpisodesFromApi() {
  return fetch("https://api.tvmaze.com/shows/82/episodes")
    .then(
      (response) => {
      return response.json();
   }).then(
      (episodes) => {
     return episodes;
   });
}

function showDropdownListOptions() {
  const showDropdownListEl = document.getElementById("showsDropdownList");

  allShows.forEach((show) => {
    const dropdownOption = document.createElement("option");
    dropdownOption.value = show.id;
    dropdownOption.innerHTML = show.name;
    showDropdownListEl.appendChild(dropdownOption);
  });

  showDropdownListEl.addEventListener("change", () => onShowSelect());
}

// user makes a selection, they should be taken directly to that show in the list
function onShowSelect() {
  const selectedShowId = document.getElementById("showsDropdownList").value;
  fetch(`https://api.tvmaze.com/shows/${selectedShowId}/episodes`)
  .then((response) => {
    return response.json();
  }).then((episodes) => {
    const rootElem = document.getElementById("root");
    const searchInput = document.getElementById("search");
    rootElem.innerHTML = "";
    searchInput.value = "";
    allEpisodes = episodes;
    makePageForEpisodes(episodes);
    
    episodeDropdownListOptions();
  })
} 

window.onload = setup;
