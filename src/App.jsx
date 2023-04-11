import { useEffect, useState } from 'react'

import './App.css'

function App() {
  const [hasError, setHasError] = useState(false)
  const [loading, setLoading] = useState(true)
  const [first150Pokemon, setFirst150Pokemon] = useState([])
  const [searchInput, setSearchInput] = useState('')

  const fetchPokemon = async () => {
    const pokemonArray = []
    for (let i = 1; i <= 150; i++) {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
      const data = await response.json()
      const pokemon = {
        id: data.id,
        name: data.name,
        image: data.sprites.front_default,
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
    fetchPokemon()
    setLoading(true)
  }

  const filteredPokemon = first150Pokemon.filter((poke) =>
    poke.name.includes(searchInput.toLowerCase())
  )

  if (loading === true) {
    return <h1>Loading...</h1>
  }

  return (
    <div className="pokedex">
      <h1 className="title">Pokédex </h1>
      <input
        type="text"
        placeholder="Search here"
        onChange={handleChange}
        value={searchInput}
      />
      <button className="button" onClick={resetPokemon}>
        Reset
      </button>

      {filteredPokemon.map((poke, i) => {
        const { name, image } = poke

        return (
          <div key={i} className="pokemon-grid">
            <h2 className="poke-name">{name}</h2>
            <img className="pokedex img" src={image} alt="" />
          </div>
        )
      })}
    </div>
  )
}

export default App
