let allEpisodes;
let allShows;

async function setup() {
  allEpisodes = await getAllEpisodesFromApi();
  allShows = getAllShows().sort((showA, showB) => {
    return showA.name.localeCompare(showB.name);
  });
  showDropdownListOptions();
  episodeDropdownListOptions();
  // selectGameOfThronesShowByDefault();
  // makePageForEpisodes(allEpisodes);
  makePageForShows(allShows);
}

function selectGameOfThronesShowByDefault() {
  const showDropdownListEl = document.getElementById("showsDropdownList");
  showDropdownListEl.value = 82;
}

//prepend a 0 to single digit numbers to display season/episode
function formatNumber(episodeNumber) {
  return episodeNumber.toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
}

// --------------------TV SHOW EPISODES------------------------------

//create episode div el
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

//create episode div with episode img tag as child
function createEpisodeImage(tvEpisodeDiv, episode) {
  const imgDiv = document.createElement("div");
  imgDiv.classList.add("img-div");

  const image = document.createElement("img");
  image.src = episode.image.medium;
  imgDiv.appendChild(image);

  tvEpisodeDiv.appendChild(imgDiv);
}

//create div for episode summary
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

    //check if medium property is present
    if (episode?.image?.medium != undefined) {
      createEpisodeImage(tvEpisodeDiv, episode);
    }

    //check if summary property is present
    if (episode.summary != undefined) {
      createEpisodeDescription(tvEpisodeDiv, episode);
    }

    rootElem.appendChild(tvEpisodeDiv);
  });
}

// --------------------------------TV SHOW-----------------------------------

//create show div el
function createTVShowDiv() {
  const tvShow = document.createElement("div");
  tvShow.classList.add("tv-show");
  return tvShow;
}

//create show title
function createShowTitle(tvShowDiv, show) {
  const showTitle = document.createElement("h1");
  showTitle.classList.add("episode-title");

  showTitle.innerHTML = `${show.name}`;

  tvShowDiv.appendChild(showTitle);
}

//create show div with show img tag as child
function createShowImage(tvShowDiv, show) {
  const showImgDiv = document.createElement("div");
  showImgDiv.classList.add("img-div");

  const showImage = document.createElement("img");
  showImage.src = show.image.medium;
  showImgDiv.appendChild(showImage);

  tvShowDiv.appendChild(showImgDiv);
}

//create div for show summary
function createShowDescription(tvShowDiv, show) {
  const showDescDiv = document.createElement('div');
  showDescDiv.classList.add('show-description');

  showDescDiv.insertAdjacentHTML('beforeend', show.summary);

  tvShowDiv.appendChild(showDescDiv);
}

//create show genre
function createShowGenre(tvShowDiv, show) {
  const showGenre = document.createElement('div');
  showGenre.classList.add('show-genre');

  showGenre.innerHTML = `Genres: ${show.genres}`;

  tvShowDiv.appendChild(showGenre);
}

//create show status
function createShowStatus(tvShowDiv, show) {
  const showStatus = document.createElement('div');
  showStatus.classList.add('show-status');

  showStatus.innerHTML = `Status: ${show.status}`;

  tvShowDiv.appendChild(showStatus);
}

//create show rating
function createShowRating(tvShowDiv, show) {
  const showRating = document.createElement('div');
  showRating.classList.add('show-rating');

  showRating.innerHTML = `Rated: ${show.rating.average}`;

  tvShowDiv.appendChild(showRating);
}

//create show runtime
function createShowRuntime(tvShowDiv, show) {
  const showRuntime = document.createElement('div');
  showRuntime.classList.add('show-runtime');

  showRuntime.innerHTML = `Runtime: ${show.runtime}`;
  tvShowDiv.appendChild(showRuntime);
}

// present a listing of all shows displaying name, image, summary, genres, status, rating, and runtime
function makePageForShows(allShows) {
  const rootElem = document.getElementById("root");
  rootElem.textContent = `Got ${allShows.length} show(s)`;

  allShows.forEach((show) => {
    const tvShowDiv = createTVShowDiv();
    createShowTitle(tvShowDiv, show);

    //check if medium property is present
    if (show?.image?.medium != undefined) {
      createShowImage(tvShowDiv, show);
    }

    //check if summary property is present
    if (show.summary != undefined) {
      createShowDescription(tvShowDiv, show);
    }

    //check if genre property is present
    if (show.genre != undefined) {
      createShowGenre(tvShowDiv, show);
    }

    //check if status property is present
    if (show.status != undefined) {
      createShowStatus(tvShowDiv, show);
    }

    //check if rating property is present
    if (show.rating.average != undefined) {
      createShowRating(tvShowDiv, show);
    }

    //check if runtime property is present
    if (show.runtime != undefined) {
      createShowRuntime(tvShowDiv, show);
    }

    rootElem.appendChild(tvShowDiv);
  });
}

//------------------------------ SEARCH INPUT-----------
//Add live search input
function search() {
  const input = document.getElementById("search");
  const filter = input.value.toLowerCase();
  const rootElem = document.getElementById("root");

  const filteredEpisodes = allEpisodes.filter(
    (episode) =>
      episode.name.toLowerCase().includes(filter) ||
      episode.summary?.toLowerCase().includes(filter)
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
  if (selectedCode === "showAll") {
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

//generate episode and tv show code
function generateEpisodeCode(episode) {
  return `S${formatNumber(episode.season)}E${formatNumber(episode.number)}`;
}

function getAllEpisodesFromApi() {
  return fetch("https://api.tvmaze.com/shows/82/episodes")
    .then((response) => {
      return response.json();
    })
    .then((episodes) => {
      return episodes;
    });
}

function showDropdownListOptions() {
  const showDropdownListEl = document.getElementById("showsDropdownList");
  const showAllOption = document.createElement("option");
  showAllOption.value = "showAll";
  showAllOption.innerHTML = "All Shows";
  showDropdownListEl.appendChild(showAllOption);

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
    })
    .then((episodes) => {
      const rootElem = document.getElementById("root");
      const searchInput = document.getElementById("search");
      rootElem.innerHTML = "";
      searchInput.value = "";
      allEpisodes = episodes;
      makePageForEpisodes(episodes);

      episodeDropdownListOptions();
    });
}

window.onload = setup;