import { atom, useAtom, useAtomValue } from "jotai";
import { pokeList } from "./api";
import { Suspense } from "react";

const offsetAtom = atom(0);

// const pokemonSelector = selector({
//   key: "pokemonSelector",
//   get: async ({ get }) => {
//     const offset = get(offsetAtom);
//     const list = (await pokeList(offset)).results;

//     return list;
//   },
// });

const pokemonAtom = atom(async (get) => {
  const offset = get(offsetAtom);
  const list = (await pokeList(offset)).results;

  return list;
});

const PokemonList = () => {
  const list = useAtomValue(pokemonAtom);
  return (
    <ul>
      {list.map((item) => {
        return <li key={item.name}>{item.name}</li>;
      })}
    </ul>
  );
};

const JotaiBasic = () => {
  const [offset, setOffset] = useAtom(offsetAtom);

  return (
    <>
      <Suspense fallback="로딩중">
        <PokemonList />
      </Suspense>
      <button onClick={() => setOffset(offset - 10)}>-</button>
      <span>{offset}</span>
      <button onClick={() => setOffset(offset + 10)}>+</button>
    </>
  );
};

export default JotaiBasic;
