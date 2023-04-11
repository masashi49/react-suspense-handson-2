import React from "react";
import { sleep } from "./lib/sleep";

let sleeping = true;

export const Sleep1s: React.VFC = () => {
  if (sleeping) {
    throw sleep(1000).then(() => {
      sleeping = false;
    });
  }
  return <p>Hello!</p>;
};
