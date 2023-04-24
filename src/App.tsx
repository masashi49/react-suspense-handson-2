// //import { useState, Suspense, useTransition } from "react";
// import "./App.css";
// import { Sleep1s } from "./Sleep1s";
// import ShowData from "./ShowData";
// import { useTime } from "./hooks/useTime";
// import { useState, useTransition, Suspense } from "react";
// import { SampleItems } from "./SampleItems";

// function App() {
//   const [counter, setCounter] = useState(0);
//   const time = useTime();
//   const [isPending, startTransition] = useTransition();
//   const [, startTransition2] = useTransition();
//   const startTrans = () => {
//     startTransition(() => {
//       setCounter((counter) => counter + 1);
//     });
//   };

//   return (
//     <div className="text-center">
//       <h1 className="text-2xl">React App!</h1>
//       <p className={"tabular-nums" + (isPending ? " text-blue-700" : "")}>
//         🕒 {time}
//       </p>
//       <Suspense fallback={<p>Loading...</p>}>
//         <ShowData dataKey={counter} />
//       </Suspense>
//       <p>
//         <button
//           className="border p-1"
//           onClick={() => {
//             startTransition(() => {
//               setCounter((c) => c + 10);
//             });
//             startTransition2(() => {
//               setCounter((c) => c + 5);
//             });
//           }}
//         >
//           Counter is {counter}
//         </button>
//       </p>
//       <SampleItems />
//     </div>
//   );
// }

import { useState, useCallback, useTransition } from "react";

function createLargeArray() {
  const array = new Array(20000).fill(0).map((_, index) => index + 1);
  return array;
}

function App() {
  const [isPending, startTransition] = useTransition();
  const [counter, setCounter] = useState(0);
  const [array, setArray] = useState([]);

  const handleClick = useCallback(async () => {
    const largeArray = createLargeArray();
    startTransition(() => {
      setCounter((c) => c + 1);
      setArray(largeArray);
    });
  }, [startTransition]);

  return (
    <div className="App">
      <h1>useTransition</h1>
      <p>{counter}</p>
      <button
        onClick={() => {
          handleClick();
        }}
      >
        Create array
      </button>
      {isPending && <p>isPending...</p>}
      <ul>
        {array.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
