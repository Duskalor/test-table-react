const URL = import.meta.env.VITE_URL_POKEMON;

export const fetchPokemons = async () => {
  const { results } = await fetch(URL).then((res) => res.json());
  const urlPokemon = results.map((pokemon: { url: string }) =>
    fetch(pokemon.url).then((response) => response.json())
  );
  return await Promise.all(urlPokemon);
};
