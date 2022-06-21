import getPokemons from "./getPokemonts";

describe("getPokemons", () => {
  test("getPokemons returns Promise", () => {
    const res = getPokemons(10, 0);
    expect(res).toBeInstanceOf(Promise);
  });
  test.each([
    { limit: 1, offset: 0 },
    { limit: 2, offset: 2 },
    { limit: 4, offset: 20 },
  ])(
    "getPokemons limit: $limit, offset: $offset",
    async ({ limit, offset }) => {
      const res = await getPokemons(limit, offset);
      expect(res).toHaveLength(limit);
      for (let i = 0; i < limit; i++) {
        const pokemon = res[i];
        expect(pokemon.id).toBe(offset + 1 + i);
        expect(pokemon.name).toBeTruthy();
      }
    }
  );

  test.each([
    { limit: -1, offset: 0 },
    { limit: 0, offset: 2 },
  ])(
    "getPokemons limit: $limit, offset: $offset",
    async ({ limit, offset }) => {
      await expect(getPokemons(limit, offset)).rejects.toThrow(
        "Please provide limit"
      );
    }
  );

  test.each([
    { limit: 10, offset: 90 },
    { limit: 100, offset: 2 },
    { limit: 1, offset: 101 },
  ])(
    "getPokemons limit: $limit, offset: $offset",
    async ({ limit, offset }) => {
      await expect(getPokemons(limit, offset)).rejects.toThrow(
        "Not enough pokemons"
      );
    }
  );
});
