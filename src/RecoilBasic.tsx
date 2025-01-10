import { useState } from "react";
import { atom, useRecoilState } from "recoil";

const offsetAtom = atom({
  key: "offsetAtom",
  default: 0,
});

const RecoilBasic = () => {
  const [offset, setOffset] = useRecoilState(offsetAtom);

  return (
    <>
      <button onClick={() => setOffset(offset - 10)}>-</button>
      <span>{offset}</span>
      <button onClick={() => setOffset(offset + 10)}>+</button>
    </>
  );
};

export default RecoilBasic;
