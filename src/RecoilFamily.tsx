import {
  atom,
  atomFamily,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";
import { pokeList } from "./api";
import { Suspense } from "react";

const offsetAtom = atom({
  key: "offsetAtom",
  default: 0,
});

const pokemonFamily = atomFamily({
  key: "pokemonFamily",
  default: async (offset: number) => {
    const list = (await pokeList(offset)).results;

    return list;
  },
});

const PokemonList = () => {
  const offset = useRecoilValue(offsetAtom);
  const list = useRecoilValue(pokemonFamily(offset));

  return (
    <ul>
      {list.map((item) => {
        return <li key={item.name}>{item.name}</li>;
      })}
    </ul>
  );
};

const RecoilFamily = () => {
  const [offset, setOffset] = useRecoilState(offsetAtom);

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

export default RecoilFamily;
