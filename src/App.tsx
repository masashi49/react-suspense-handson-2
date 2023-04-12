import { useState, Suspense, startTransition } from "react";
import "./App.css";
import { Sleep1s } from "./Sleep1s";
import ShowData from "./ShowData";
import { useTime } from "./hooks/useTime";

function App() {
  const [sleepIsShown, setSleepIsShown] = useState(false);
  const [counter, setCounter] = useState(0);

  const startTrans = () => {
    startTransition(() => {
      console.log(1);
      setCounter((counter) => counter + 1);
    });
  };
  const time = 0; //useTime();
  return (
    <div className="text-center">
      <h1 className="text-2xl">React App!</h1>
      <p className="tabular-nums">🕒 {time}</p>
      <Suspense fallback={<p>Loading...</p>}>
        <ShowData dataKey={counter} />
      </Suspense>

      <p>
        <button
          className="border p-1"
          onClick={() => {
            startTrans();
          }}
        >
          Show Sleep1s {counter}
        </button>
      </p>
    </div>
  );
}
export default App;
