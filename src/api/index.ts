type Pokemon = {
  name: string;
  url: string;
};

type Response = {
  count: number;
  next?: string;
  previous?: string;
  results: Pokemon[];
};

export const pokeList = async (offset: number) => {
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=10&offset=${offset}`
  ).then<Response>((res) => {
    return res.json();
  });

  return res;
};
