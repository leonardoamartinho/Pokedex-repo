const fetchPokemon = () => {
    const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`

    const pokemonPromises = []

    for (let i = 1; i <= 898; i++) {
        pokemonPromises.push(fetch(getPokemonUrl(i)).then(response => response.json()))
    }

    Promise.all(pokemonPromises)
        .then(pokemons => {

            const lisPokemons = pokemons.reduce((accumulator, pokemon) => {
                const types = pokemon.types.map(typeInfo => typeInfo.type.name)

                accumulator += `
                <li class = "card  ${types[0]}">
                <img class = "card-image" alt = "${pokemon.name}" src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png"/>
                    <p class = "card-number">#${pokemon.id}</p>
                    <h2 class = "card-title">${pokemon.name}</h2>
                    <p class = "card-subtitle">${pokemon.types.map(typeInfo => typeInfo.type.name).join(' - ')}</p>
                </li>
                `
                
                return accumulator
            }, '')

            const ul = document.querySelector('[data-js="pokedex"]')

            ul.innerHTML = lisPokemons
        })
}

fetchPokemon();