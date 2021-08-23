// API Resources
const BASE_URL = "https://pokeapi.co/api/v2/pokemon/";
export default function fetchApi() {
  return {
    async getPokemon(idOrName) {
      const url = `${BASE_URL}${idOrName}`;
      const response = await fetch(url).catch((err) => console.error(err));
      const pokemon = await response.json();
      return pokemon;
    },
  };
}