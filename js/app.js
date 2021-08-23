import fetchApi from "./fetchApi/fetchApi.js";
const { getPokemon } = fetchApi();
// ---------------------------------------START PAGE---------------------------------------
// HTML Elements
const container = document.getElementById("container");
const searchForm = document.getElementById("searchForm");
let buttonFeed;
let buttonBattle;
let buttonPlay;

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

let myPokemon = {
  name: "",
  img: "",
  hp: 0,
  friendship: 0,
  feed: function () {
    this.hp += 60;
    this.friendship += 5;
  },
  play: function () {
    if (this.friendship + 10 < 225 || this.friendship + 13 < 225) {
      if (this.friendship < 200) {
        this.friendship += 13;
      } else {
        this.friendship += 10;
      }
    } else {
      this.friendship = 225;
    }
  },
  battle: function () {
    this.hp -= getRandomInt(0, this.hp);
  },
};

function handleFeed() {
  myPokemon.feed();
  renderPokemon(myPokemon);
}

function handlePlay() {
  myPokemon.play();
  renderPokemon(myPokemon);
}

function handleBattle() {
  myPokemon.battle();
  renderPokemon(myPokemon);
}

async function handlerSubmit(e) {
  e.preventDefault();
  const data = new FormData(searchForm);
  const idOrName = data.get("idOrName");
  const pokemonObj = await getPokemon(idOrName.toLowerCase());
  createPokemon(pokemonObj);
  renderPokemon(myPokemon);
}

function createPokemon(obj) {
  myPokemon.name = obj.name;
  myPokemon.img = obj.sprites.other["official-artwork"].front_default;
  myPokemon.hp = obj.stats[0].base_stat;
  myPokemon.attack = obj.stats[1].base_stat;
  myPokemon.deffense = obj.stats[2].base_stat;
  myPokemon.specialAtt = obj.stats[3].base_stat;
  myPokemon.specialDef = obj.stats[4].base_stat;
  myPokemon.velocity = obj.stats[5].base_stat;
  myPokemon.friendship = 0;
}

function getFriendship(number) {
  if (number === 0) {
    return "Null";
  } else if (number >= 1 && number <= 49) {
    return "Acquaintances";
  } else if (number >= 50 && number <= 99) {
    return "Average";
  } else if (number >= 100 && number <= 149) {
    return "Almost Friends";
  } else if (number >= 150 && number <= 199) {
    return "Friends";
  } else if (number >= 200 && number <= 229) {
    return "Good Friends";
  } else if (number >= 230 && number <= 224) {
    return "Best Friends";
  } else if (number === 225) {
    return "Soulmates";
  }
}

function renderPokemon(pokemon) {
  container.innerHTML = "";
  if (pokemon) {
    const pokemonName = `<h1>${pokemon.name.toUpperCase()}</h1>`;
    const pokemonImg = `<img class="poke-sprite" src="${pokemon.img}" alt="${pokemon.name} image" />`;
    const pokemonStats = `<p>HP: ${
      pokemon.hp
    }</p><p>Friendship: ${getFriendship(pokemon.friendship)}</p>`;
    const pokemonButtons = `<div class="buttons-container">
    <button type="button" id="button-feed">Alimentar</button>
    <button type="button" id="button-play">Jugar con ${pokemon.name}</button>
    <button type="button" id="button-battle">Battle</button>
    </div>`;
    const pokemonHTML =
      pokemonName + pokemonStats + pokemonButtons + pokemonImg;
    container.insertAdjacentHTML("beforeend", pokemonHTML);
    buttonFeed = document.getElementById('button-feed');
    buttonBattle = document.getElementById('button-battle');
    buttonPlay = document.getElementById('button-play');
    buttonBattle.addEventListener('click', handleBattle);
    buttonFeed.addEventListener('click', handleFeed);
    buttonPlay.addEventListener('click', handlePlay);

  } else {
    const failedMessage = "<p>Pokemon not found</p>";
    container.insertAdjacentHTML("afterbegin", failedMessage);
  }
}
searchForm.addEventListener("submit", handlerSubmit);
