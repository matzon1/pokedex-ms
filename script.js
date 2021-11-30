const pokeContainer = document.getElementById("poke_container");
const pokeFinder = document.getElementById("input-pokemon");
const pokemonsNumber = 150;
let pokemons = [];

const colors = {
  fire: "#FDDFDF",
  grass: "#DEFDE0",
  electric: "#FCF7DE",
  water: "#DEF3FD",
  ground: "#f4e7da",
  rock: "#d5d5d4",
  fairy: "#fceaff",
  poison: "#98d7a5",
  bug: "#f8d5a3",
  dragon: "#97b3e6",
  psychic: "#eaeda1",
  flying: "#F5F5F5",
  fighting: "#E6E0D4",
  normal: "#F5F5F5",
};
const main_types = Object.keys(colors);

const fetchPokemons = async () => {
  for (let i = 1; i <= pokemonsNumber; i++) {
    await getPokemon(i);
  }
};

const getPokemon = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const res = await fetch(url);
  const pokemon = await res.json();
  createPokemonCard(pokemon);
};


/* /* const renderPokemons = (name = '') => {
	name = name.toLowerCase();
	pokeContainer.innerHTML = null;
	pokemons
	  .filter(pokemon => pokemon.name.includes(name))
	  .forEach(pokemon => createPokemonCard(pokemon));
  }; */

pokeFinder.addEventListener('keyup', event =>{
	const searchTerm = event.target.value;
	renderPokemons(searchTerm);
}) 

function createPokemonCard(pokemon) {
  const { name, types, sprites, id } = pokemon;
  const type = types[0].type.name;
  const pokemonEl = document.createElement("div");
  pokemonEl.classList.add("pokemon");
  pokemonEl.classList.add("grow");
  const poke_types = pokemon.types.map((el) => el.type.name);
  const color = colors[type];
  pokemonEl.style.backgroundColor = color;

  const pokeInnerHTML = `
        <div class="img-container">
		<img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png" alt="${pokemon.name}" class='img-container'>
        </div>
        <div class="info">
            <span class="number">#${id}</span>
            <h3 class="name">${name}</h3>
            <small class="type">Type: <span>${type}</span></small>
        </div>
    `;

  pokemonEl.innerHTML = pokeInnerHTML;

  pokeContainer.appendChild(pokemonEl);
}

fetchPokemons();
