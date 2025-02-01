/*****************************************************************************
 * Challenge 2
 */
import GAMES_DATA from './games.js';
const GAMES_JSON = JSON.parse(GAMES_DATA);

function deleteChildElements(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

/*****************************************************************************
 * Challenge 3
 */
const gamesContainer = document.getElementById("games-container");

function addGamesToPage(games) {
  for (let i = 0; i < games.length; i++) {
    const game = games[i];
    const gameCard = document.createElement("div");
    gameCard.classList.add("game-card");
    gameCard.innerHTML = `
      <img class="game-img" src="${game.img}" alt="${game.name}" />
      <h3>${game.name}</h3>
      <p><strong>Pledged:</strong> $${game.pledged.toLocaleString()}</p>
      <p><strong>Backers:</strong> ${game.backers.toLocaleString()}</p>
    `;
    gamesContainer.appendChild(gameCard);
  }
}

// ✅ Display all games
addGamesToPage(GAMES_JSON);

/*****************************************************************************
 * Challenge 4
 */
const contributionsCard = document.getElementById("num-contributions");
const totalContributions = GAMES_JSON.reduce((acc, game) => acc + game.backers, 0);
contributionsCard.innerHTML = totalContributions.toLocaleString();

const raisedCard = document.getElementById("total-raised");
const totalRaised = GAMES_JSON.reduce((acc, game) => acc + game.pledged, 0);
raisedCard.innerHTML = `$${totalRaised.toLocaleString()}`;

const gamesCard = document.getElementById("num-games");
gamesCard.innerHTML = GAMES_JSON.length;

/*****************************************************************************
 * Challenge 5
 */
function filterUnfundedOnly() {
  deleteChildElements(gamesContainer);
  const unfundedGames = GAMES_JSON.filter((game) => game.pledged < game.goal);
  addGamesToPage(unfundedGames);
  console.log("Unfunded games:", unfundedGames.length);
}

function filterFundedOnly() {
  deleteChildElements(gamesContainer);
  const fundedGames = GAMES_JSON.filter((game) => game.pledged >= game.goal);
  addGamesToPage(fundedGames);
  console.log("Funded games:", fundedGames.length);
}

function showAllGames() {
  deleteChildElements(gamesContainer);
  addGamesToPage(GAMES_JSON);
  console.log("All games:", GAMES_JSON.length);
}

const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);

/*****************************************************************************
 * Challenge 6
 */
const descriptionContainer = document.getElementById("description-container");
const unfundedGames = GAMES_JSON.filter((game) => game.pledged < game.goal);
const numUnfunded = unfundedGames.length;

// Reuse our existing `totalRaised` or rename if you prefer
const totalRaisedAgain = GAMES_JSON.reduce((acc, game) => acc + game.pledged, 0);
const totalGames = GAMES_JSON.length;

const displayStr = `
  A total of $${totalRaisedAgain.toLocaleString()} has been raised 
  for ${totalGames} ${totalGames === 1 ? "game" : "games"}.
  Currently, ${numUnfunded} ${numUnfunded === 1 ? "game remains" : "games remain"} unfunded.
  We need your help to fund ${numUnfunded === 1 ? "this amazing game" : "these amazing games"}!
`;

const infoParagraph = document.createElement("p");
infoParagraph.innerHTML = displayStr.trim();
descriptionContainer.appendChild(infoParagraph);

/*****************************************************************************
 * Challenge 7
 */
const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames = GAMES_JSON.sort((a, b) => b.pledged - a.pledged);
const [topGame, secondGame, ...others] = sortedGames;

const topGameElement = document.createElement("p");
topGameElement.innerText = topGame.name;
firstGameContainer.appendChild(topGameElement);

const secondGameElement = document.createElement("p");
secondGameElement.innerText = secondGame.name;
secondGameContainer.appendChild(secondGameElement);
