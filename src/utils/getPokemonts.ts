export default function getPokemons(limit: number, offset: number) {
  if (limit <= 0) {
    return Promise.reject(new Error("Please provide limit"));
  }

  if (limit + offset >= 100) {
    return Promise.reject(new Error("Not enough pokemons"));
  }

  const arr = [];
  for (let i = 0; i < limit; i++) {
    arr.push({ id: offset + 1 + i, name: "Test" });
  }
  return Promise.resolve(arr);
}
