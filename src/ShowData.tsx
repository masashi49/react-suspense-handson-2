import React, { FC } from "react";
import { useData } from "./hooks/useData";
import { fetchData1 } from "./lib/fetchData1";

const ShowData: FC<{ dataKey: number }> = ({ dataKey }) => {
  console.log(dataKey);
  setTimeout(() => {}, 2000);
  const data = useData(`ShowDaata : ${dataKey}`, fetchData1);
  return (
    <p>
      {dataKey} is {data}
    </p>
  );
};

export default ShowData;
