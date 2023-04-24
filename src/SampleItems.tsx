import { useState, useTransition } from "react";

export const SampleItems = () => {
  // 3000個の配列作成
  const items = new Array(3000).fill(null).map((it, i) => `${i}`); //useTransition呼ぶ

  const [isPending, startTransition] = useTransition();

  const [updateValue, setUpdateValue] = useState("");

  // 入力欄の優先順位を上げてupdateValueの更新処理の優先度を下げる(<span>箇所のレンダリングを後回しにする)
  const onChangeHandler = (e) => {
    startTransition(() => {
      setUpdateValue(e.target.value);
    });
  };

  return (
    <>
      a
      <input type="text" onChange={onChangeHandler} />b
      {isPending && <p>Pending...</p>}c
      <div>
        {items
          .filter((it) => {
            return it.includes(updateValue);
          })
          .map((it, i) => (
            <span key={`${i}`}>{it}</span>
          ))}
      </div>
    </>
  );
};
