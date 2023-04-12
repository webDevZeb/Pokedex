import { useEffect, useState } from 'react'

import './App.css'

function App() {
  const [hasError, setHasError] = useState(false)
  const [loading, setLoading] = useState(true)
  const [first150Pokemon, setFirst150Pokemon] = useState([])
  const [searchInput, setSearchInput] = useState('')
  const [showData, setShowData] = useState(null)

  const fetchPokemon = async () => {
    const pokemonArray = []
    for (let i = 1; i <= 150; i++) {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
      const data = await response.json()

      const pokemon = {
        id: data.id,
        name: data.name,
        image: data.sprites.front_default,
        abilities: data.abilities[0].ability.name,
        abilitiesCont: data.abilities[1]?.ability.name,
        abilitiesCont2: data.abilities[2]?.ability.name,
      }

      pokemonArray.push(pokemon)
    }

    setFirst150Pokemon(pokemonArray)
    setLoading(false)
  }

  useEffect(() => {
    fetchPokemon()
  }, [])

  const handleChange = (e) => {
    e.preventDefault()
    setSearchInput(e.target.value)
  }

  const resetPokemon = () => {
    setSearchInput('')
    setShowData(null)
  }

  const filteredPokemon = first150Pokemon.filter((poke) =>
    poke.name.includes(searchInput.toLowerCase())
  )

  if (loading === true) {
    return (
      <div>
        <h1>Loading...</h1>
        <img
          className="pokeball"
          src="src/assets/Daco_4057186.png"
          alt="pokeball"
        />
      </div>
    )
  }

  return (
    <div className="pokedex">
      <h1>
        <img src="src/assets/pokedeximg.webp" alt="pokedex text" />
      </h1>
      <input
        type="text"
        placeholder="Search here"
        onChange={handleChange}
        value={searchInput}
        className="input-box"
      />
      <button className="button" onClick={resetPokemon}>
        Reset
      </button>

      {filteredPokemon.map((poke, i) => {
        const { name, id, image, abilities, abilitiesCont, abilitiesCont2 } =
          poke

        return (
          <div key={i} className="pokemon-grid">
            <h2 className="poke-name">{name}</h2>

            <img className="pokedex img" src={image} alt="" />
            <button
              className="abilities-btn"
              onClick={() => setShowData(showData === poke.id ? null : poke.id)}
            >
              Abilities
            </button>
            {showData === id && ( // only show the abilities for the selected Pokemon
              <div>
                <p className="abilities">{abilities}</p>
                {abilitiesCont ? (
                  <p className="abilities">{abilitiesCont}</p>
                ) : null}
                {abilitiesCont2 ? (
                  <p className="abilities">{abilitiesCont2}</p>
                ) : null}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default App
