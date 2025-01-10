import { atomFamily, useRecoilValue } from "recoil";
import { pokeList } from "./api";
import { Suspense } from "react";
import { useSearchParams } from "react-router";

const pokemonFamily = atomFamily({
  key: "pokemonFamily",
  default: async (offset: number) => {
    const list = (await pokeList(offset)).results;

    return list;
  },
});

const PokemonList = () => {
  const [params] = useSearchParams();
  const offset = Number(params.get("offset") || "0");
  const list = useRecoilValue(pokemonFamily(offset));

  return (
    <ul>
      {list.map((item) => {
        return <li key={item.name}>{item.name}</li>;
      })}
    </ul>
  );
};

const RecoilFamily2 = () => {
  const [params, setParams] = useSearchParams();
  const offset = Number(params.get("offset") || "0");
  const setOffset = (nextOffset: number) => {
    setParams({ offset: String(nextOffset) });
  };

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

export default RecoilFamily2;
