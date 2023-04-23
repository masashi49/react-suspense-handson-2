import React, { FC } from "react";
import { useData } from "./hooks/useData";
import { fetchData1 } from "./lib/fetchData1";

const ShowData: FC<{ dataKey: number }> = ({ dataKey }) => {
  setTimeout(() => {
    console.log(dataKey);
  }, 2000);
  //const data = useData(`ShowDaata : ${dataKey}`, fetchData1);
  return <p>{dataKey} is</p>;
};

export default ShowData;
