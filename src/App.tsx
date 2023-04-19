//import { useState, Suspense, useTransition } from "react";
import "./App.css";
import { Sleep1s } from "./Sleep1s";
import ShowData from "./ShowData";
import { useTime } from "./hooks/useTime";
import { useState, useTransition, Suspense } from "react";

function App() {
  const [counter, setCounter] = useState(0);
  const time = useTime();
  const [isPending, startTransition] = useTransition();
  const [, startTransition2] = useTransition();
  const startTrans = () => {
    startTransition(() => {
      console.log(1);
      setCounter((counter) => counter + 1);
    });
  };

  return (
    <div className="text-center">
      <h1 className="text-2xl">React App!</h1>
      <p className={"tabular-nums" + (isPending ? " text-blue-700" : "")}>
        🕒 {time}
      </p>
      <Suspense fallback={<p>Loading...</p>}>
        <ShowData dataKey={counter} />
      </Suspense>
      <p>
        <button
          className="border p-1"
          onClick={() => {
            startTransition(() => {
              setCounter((c) => c + 10);
            });
            startTransition2(() => {
              setCounter((c) => c + 5);
            });
          }}
        >
          Counter is {counter}
        </button>
      </p>
    </div>
  );
}

// import { useState, useTransition } from "react";

// function App() {
//   const [isPending, startTransition] = useTransition();
//   const [count, setCount] = useState(0);

//   function handleClick() {
//     setTimeout(() => {
//       startTransition(() => {
//         setCount(count + 1);
//       });
//     }, 1000);
//   }

//   return (
//     <div>
//       {isPending && `spin`}
//       <button onClick={handleClick}>➕</button>
//       合計goukei : {count}
//     </div>
//   );
// }

export default App;
