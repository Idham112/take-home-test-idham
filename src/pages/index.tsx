import React, { useEffect, useState } from "react";

function Dominoes() {
  const [initDominoes, setInitDominoes] = useState<number[][]>([
    [6, 1],
    [4, 3],
    [5, 1],
    [3, 4],
    [1, 1],
    [2, 2],
    [3, 3],
    [4, 4],
    [3, 4],
    [1, 2],
  ]);
  const [dominoes, setDominoes] = useState<number[][]>(initDominoes);
  const [doubleNumber, setDoubleNumber] = useState<number>(0);
  const [inputValue, setInputValue] = useState<number>(0);

  function findDoubleNumbers() {
    let index = 0;
    let count = 0;
    while (index < dominoes.length) {
      if (dominoes[index][0] === dominoes[index][1]) {
        count++;
      }
      index++;
    }
    setDoubleNumber(count);
  }

  function sortAscDominoes() {
    const sortedDominoes = [...dominoes].sort((a, b) => {
      return a[0] + a[1] - (b[0] + b[1]);
    });
    setDominoes(sortedDominoes);
  }

  function sortDescDominoes() {
    const sortedDominoes = [...dominoes].sort((a, b) => {
      return b[0] + b[1] - (a[0] + a[1]);
    });
    setDominoes(sortedDominoes);
  }

  function flipDominoes() {
    let index = 0;
    let flippedDominoes = [];
    while (index < dominoes.length) {
      let container = [];
      container.push(dominoes[index][1]);
      container.push(dominoes[index][0]);
      flippedDominoes.push(container);
      index++;
    }
    setDominoes(flippedDominoes);
  }

  function removeDupe() {
    let dupes: number[][] = [];
    let removeDupes: number[][] = [];
    for (let i = 0; i < dominoes.length; i++) {
      const isDuplicate = dupes.some(
        (dupe) =>
          (dupe[0] === dominoes[i][0] && dupe[1] === dominoes[i][1]) ||
          (dupe[0] === dominoes[i][1] && dupe[1] === dominoes[i][0])
      );
      if (!isDuplicate) {
        for (let y = i + 1; y < dominoes.length; y++) {
          if (
            (dominoes[i][0] === dominoes[y][0] &&
              dominoes[i][1] === dominoes[y][1]) ||
            (dominoes[i][0] === dominoes[y][1] &&
              dominoes[i][1] === dominoes[y][0])
          ) {
            dupes.push(dominoes[i]);
          }
        }
      }
    }

    for (let i = 0; i < dominoes.length; i++) {
      const isDuplicate = dupes.some(
        (dupe) =>
          (dupe[0] === dominoes[i][0] && dupe[1] === dominoes[i][1]) ||
          (dupe[0] === dominoes[i][1] && dupe[1] === dominoes[i][0])
      );
      if(!isDuplicate){
        removeDupes.push(dominoes[i]);
      }
    }
    setDominoes(removeDupes);
  }

  function resetDominoes() {
    setDominoes(initDominoes);
  }

  function removeTotal(input: number) {
    const removed: number[][] = [];
    dominoes.forEach((element) => {
      if (element[0] + element[1] != input) {
        removed.push(element);
      }
    });
    setDominoes(removed);
    setInputValue(0);
  }

  useEffect(() => {
    findDoubleNumbers();
  }, [dominoes]);

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-violet-300 text-black">
      <div className="w-fit h-fit bg-white p-7 grid grid-cols-1 gap-2 border border-slate-600 rounded-md">
        <div className="font-bold text-2xl">Dominoes</div>

        {/* Source */}
        <div className="bg-slate-100 p-3 pt-1 border rounded-md border-slate-300">
          <h2 className="font-semibold">Source</h2>
          <div className="flex">
            [
            {initDominoes.map((number, index) => (
              <div key={index}>
                [{number[0]}, {number[1]}]
              </div>
            ))}
            ]
          </div>
        </div>

        {/* Double Numbers */}
        <div className="bg-slate-100 p-3 pt-1 border rounded-md border-slate-300">
          <h2 className="font-semibold">Double Numbers</h2>
          <div className="flex">{doubleNumber}</div>
        </div>

        {/* Dominoes Visualization */}
        <div className="flex gap-5">
          {dominoes.map((number, index) => (
            <div
              key={index}
              className="grid grid-cols-1 place-items-center border rounded-sm border-black w-4"
            >
              <p>{number[0]}</p>
              <p>-</p>
              <p>{number[1]}</p>
            </div>
          ))}
        </div>

        {/* buttons */}
        <div className="flex gap-2">
          <button
            className="text-white bg-blue-500 border rounded-md px-3 hover:bg-blue-600"
            onClick={sortAscDominoes}
          >
            Sort (ASC)
          </button>
          <button
            className="text-white bg-blue-500 border rounded-md px-3 hover:bg-blue-600"
            onClick={sortDescDominoes}
          >
            Sort (DESC)
          </button>
          <button
            className="text-white bg-blue-500 border rounded-md px-3 hover:bg-blue-600"
            onClick={flipDominoes}
          >
            Flip
          </button>
          <button
            className="text-white bg-blue-500 border rounded-md px-3 hover:bg-blue-600"
            onClick={removeDupe}
          >
            Remove Dup
          </button>
          <button
            className="text-white bg-blue-500 border rounded-md px-3 hover:bg-blue-600"
            onClick={resetDominoes}
          >
            Reset
          </button>
        </div>

        {/* input and remove */}
        <div className="flex flex-col">
          <input
            className="border border-slate-400 rounded-md px-2"
            type="number"
            placeholder="input number"
            value={inputValue}
            onChange={(e: any) => setInputValue(e.target.value)}
          />
          <button
            className="w-1/4 text-white bg-blue-500 border rounded-md px-3 hover:bg-blue-600"
            onClick={() => removeTotal(inputValue)}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dominoes;
