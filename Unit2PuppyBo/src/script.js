const playerContainer = document.getElementById("all-players-container");
const newPlayerFormContainer = document.getElementById("new-player-form");

//Add your cohort name to the cohortName variable below, replacing the 'COHORT-NAME' placeholder
const cohortName = "2308-ACC-PT-WEB-PT-A";
// Use the APIURL variable for fetch requests
// This is your base url
const APIURL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}`;

/**
 * It fetches all players from the API and returns them
 * @returns An array of objects.
 */
const fetchAllPlayers = async () => {
  try {
    const response = await fetch(`${APIURL}/players`);
    const result = await response.json();
    return result.data.players;
  } catch (err) {
    console.error(err);
  }
};

const fetchSinglePlayer = async (playerId) => {
  try {
    const response = await fetch(`${APIURL}/playerId=` + playerId);
    const result = await response.json();
    console.log(result);
  } catch (err) {
    console.error(err);
  }
};

//const addNewPlayer =
async function addNewPlayer() {
  const a = document.getElementById("name").value;
  const b = document.getElementById("breed").value;

  const playerObj = { a, b };

  try {
    const response = await fetch(`${APIURL}/players`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(playerObj),
    });
    const result = await response.json();
    console.log(result);
    renderAllPlayers(result);
  } catch (err) {
    console.error(err);
  }
}

async function removePlayer(playerid) {
  try {
    const response = await fetch(
      "https://fsa-puppy-bowl.herokuapp.com/api/2308-ACC-PT-WEB-PT-A/players/+playerid",
      {
        method: "DELETE",
      }
    );
    const result = await response.json();
    console.log(result);
  } catch (err) {
    console.error(err);
  }
}

/**
 * It takes an array of player objects, loops through them, and creates a string of HTML for each
 * player, then adds that string to a larger string of HTML that represents all the players.
 *
 * Then it takes that larger string of HTML and adds it to the DOM.
 *
 * It also adds event listeners to the buttons in each player card.
 *
 * The event listeners are for the "See details" and "Remove from roster" buttons.
 *
 * The "See details" button calls the `fetchSinglePlayer` function, which makes a fetch request to the
 * API to get the details for a single player.
 *
 * The "Remove from roster" button calls the `removePlayer` function, which makes a fetch request to
 * the API to remove a player from the roster.
 *
 * The `fetchSinglePlayer` and `removePlayer` functions are defined in the
 * @param playerList - an array of player objects
 * @returns the playerContainerHTML variable.
 */
const renderAllPlayers = (playerList) => {
  try {
    for (let i = 0; i < playerList; i++) {
      const puppy = playerList[i];
      playerContainer.innerHTML = `
      <h3>${puppy.name}</h3>
      <p>Breed: ${puppy.breed}</p>
    `;
    }
  } catch (err) {
    console.error("Uh oh, trouble rendering players!", err);
  }
};

/**
 * It renders a form to the DOM, and when the form is submitted, it adds a new player to the database,
 * fetches all players from the database, and renders them to the DOM.
 */
const renderNewPlayerForm = async () => {
  const form = document.querySelector("form");
  form.addEventListener("submit", async (evt) => {
    evt.preventDefault();
    await addNewPlayer({
      name: evt.target.name.value,
      breed: evt.target.breed.value,
    });
  });
};

const init = async () => {
  const players = await fetchAllPlayers();

  renderAllPlayers(players);

  await renderNewPlayerForm();
};

init();
/*renderNewPlayerForm.addEventListener("submit", (event) =>{
  event.preventDefault();
  console.log(event.target.name.value);
  console.log(event.target.imageur1.value);
  console.log(event.target.breed.value);
  console.log(event.target.status.value);
  

  addNewPlayer(
    {
      name: Event.target.name.value,
      breed: event.target.breed.value
      
    }
  )
  )
}*/
