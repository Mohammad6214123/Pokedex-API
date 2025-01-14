let allPokemon = [];
let offset = 0;

async function fetchPokemon(offset = 0) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`);
    const data = await res.json();
    console.log(fetchPokemon);
    return data.results;

}

function init() {
    loadMorePokemon();
}

function renderPokemon() {
    const container = document.getElementById('pokemon-container');
    let pokemonHTML = '';
    for (let i = 0; i < allPokemon.length; i++) {
        pokemonHTML += `
      <div class="pokemon-card" onclick="showPokemonDetails(${i})">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i + 1}.png">
        <p>${allPokemon[i].name}</p>
      </div>
    `;
    }
    container.innerHTML = pokemonHTML;
}

async function loadMorePokemon() {
    const newPokemons = await fetchPokemon(offset);
    allPokemon = allPokemon.concat(newPokemons);
    renderPokemon();
    offset += 20;
}

async function showPokemonDetails(i) {
    const res = await fetch(allPokemon[i].url);
    const pokemon = await res.json();
    const detailsHTML = `
      <img src="${pokemon.sprites.front_default}">
      <h2>${pokemon.name.toUpperCase()}</h2>
      <p>ID: ${pokemon.id}</p>
      <p>Height: ${pokemon.height}</p>
      <p>Weight: ${pokemon.weight}</p>
    `;
    const dialog = document.getElementById('pokemon-dialog');
    const detailsDiv = document.getElementById('pokemon-details');
    detailsDiv.innerHTML = detailsHTML;
    dialog.showModal();
}

function closePokemondialog() {      // this is a dialog function 
    const dialog = document.getElementById('pokemon-dialog');
    dialog.close();
}

async function searchPokemon() {
    const query = document.getElementById('search').value.toLowerCase();  // code for the search button
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);
    if (res.ok) {
        const pokemon = await res.json();
        allPokemon = [pokemon];
        renderPokemon();
    } else {
        alert("Pokemon not found");
    }
}


