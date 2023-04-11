import { useState, Suspense, startTransition } from "react";
import "./App.css";
import { Sleep1s } from "./Sleep1s";
import ShowData from "./ShowData";

function App() {
  const [sleepIsShown, setSleepIsShown] = useState(false);
  const [counter, setCounter] = useState(0);
  return (
    <div className="text-center">
      <h1 className="text-2xl">React App!</h1>
      <Suspense fallback={<p>Loading...</p>}>
        <ShowData dataKey={counter} />
      </Suspense>

      <p>
        <button
          className="border p-1"
          onClick={() => {
            startTransition(() => {
              setCounter(counter + 1);
            });
          }}
        >
          Show Sleep1s {counter}
        </button>
      </p>
    </div>
  );
}
export default App;
