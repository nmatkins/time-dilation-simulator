import { useState, useEffect } from "react";
import AudioControl from "./audio";

function App() {
  const [currentVelocity, setCurrentVelocity] = useState(0);
  const C = 299792458;
  const percentC = ((currentVelocity * 100) / C).toFixed(2);

  const speedChoices = [
    { label: "0 m/s", speed: 0 },
    { label: "15,000 m/s", speed: 15000 },
    { label: "50,000 m/s", speed: 50000 },
    { label: "10% C", speed: C * 0.1 },
    { label: "50% C", speed: C / 2 },
    { label: "75% C", speed: C * 0.75 },
    { label: "90% C", speed: C * 0.9 },
    { label: "95% C", speed: C * 0.95 },
    { label: "99% C", speed: C * 0.99 },
  ];

  const gamma =
    1 / Math.sqrt(1 - (currentVelocity * currentVelocity) / (C * C));

  function Clock({ timeFactor = 1, label = "" }) {
    const useClock = false; //to make faces 1 to 12

    return (
      <div className="flex flex-col items-center justify-between gap-y-4 text-lg font-bold">
        {label}
        <div className="flex h-64 w-64 flex-col items-center rounded-full border-2 border-white">
          <div
            className="z-50 flex h-64 w-64 animate-spin flex-col items-center justify-center rounded-full"
            style={{ animation: `spin ${60 * timeFactor}s linear infinite` }}
          >
            <div className="h-[45%] w-1 rounded bg-white"></div>
            <div className="h-[45%] w-1"></div>
          </div>
          <div className="absolute z-40 flex h-64 w-64 flex-col items-center justify-center rounded-full">
            <div className="h-4 w-4 rounded-full bg-white"></div>
          </div>

          <div className="absolute z-30 flex h-64 w-64 flex-col items-center justify-between p-0.5">
            <div>{useClock ? 12 : 60}</div>
            <div>{useClock ? 5 : 30}</div>
          </div>
          <div className="absolute z-30 flex h-64 w-64 rotate-[30deg] flex-col items-center justify-between p-0.5">
            <div className="-rotate-[30deg]">{useClock ? 1 : 5}</div>
            <div className="-rotate-[30deg]">{useClock ? 6 : 35}</div>
          </div>
          <div className="absolute z-30 flex h-64 w-64 rotate-[60deg] flex-col items-center justify-between p-0.5">
            <div className="-rotate-[60deg]">{useClock ? 2 : 10}</div>
            <div className="-rotate-[60deg]">{useClock ? 7 : 40}</div>
          </div>
          <div className="absolute z-30 flex h-64 w-64 rotate-[90deg] flex-col items-center justify-between p-0.5">
            <div className="-rotate-[90deg]">{useClock ? 3 : 15}</div>
            <div className="-rotate-[90deg]">{useClock ? 8 : 45}</div>
          </div>
          <div className="absolute z-30 flex h-64 w-64 rotate-[120deg] flex-col items-center justify-between p-0.5">
            <div className="-rotate-[120deg]">{useClock ? 4 : 20}</div>
            <div className="-rotate-[120deg]">{useClock ? 9 : 50}</div>
          </div>
          <div className="absolute z-30 flex h-64 w-64 rotate-[150deg] flex-col items-center justify-between p-0.5">
            <div className="-rotate-[150deg]">{useClock ? 5 : 25}</div>
            <div className="-rotate-[150deg]">{useClock ? 10 : 55}</div>
          </div>
          <div className="absolute z-30 flex h-64 w-64 rotate-[180deg] flex-col items-center justify-between p-0.5">
            <div className="-rotate-[180deg]">{useClock ? 6 : 30}</div>
            <div className="-rotate-[180deg]">{useClock ? 11 : 60}</div>
          </div>
        </div>
        <Ticker timeFactor={timeFactor} />
      </div>
    );
  }
  function Ticker({ timeFactor = 1 }) {
    const [seconds, setSeconds] = useState(0);
    function toBase60(num: number) {
      if (num === 0) return 0;
      let digits = [];
      let c = 0;
      while (c < 3) {
        digits.push(num % 60);
        num = Math.floor(num / 60);
        c++;
      }
      return digits
        .reverse()
        .map((d) => d.toString().padStart(2, "0"))
        .join(":");
    }

    useEffect(() => {
      const interval = setInterval(
        () => {
          setSeconds((prevSeconds) => prevSeconds + 1);
        },
        (1000 * timeFactor) / 60,
      );
      return () => clearInterval(interval);
    }, [timeFactor]);

    return (
      <div className="space-y-4">
        <div
          className="flex h-14 w-36 items-center justify-center rounded border-2 text-2xl font-normal"
          style={{ fontFamily: "Red Hat Mono, monospace" }}
        >
          {seconds ? toBase60(seconds) : "00:00:00"}
        </div>
      </div>
    );
  }

  function Summary() {
    return (
      <div className="flex flex-col items-center gap-4 px-4 pt-12">
        <h1 className="text-3xl font-bold">Time Dilation Simulator</h1>
        <p className="mt-2 inline max-w-3xl text-lg">
          According to Einstein's Special Relativity, as an object's velocity
          approaches light speed, time slows down relative to a Stationary
          observer.
        </p>
        <div className="flex flex-col items-center sm:flex-row">
          <h3 className="max-w-xl text-lg sm:max-w-96">
            This effect is quantified by <b className="text-xl">γ</b> (the
            Lorentz factor), which describes the rate of time experienced by the
            moving object.
          </h3>
          <img src="./formula.svg" className="-my-8 h-56 w-56" />
        </div>
      </div>
    );
  }

  return (
    <div className="m-0 flex min-h-screen w-screen flex-col justify-between">
      <div>
        <Summary />
        <div className="flex flex-col justify-center gap-8 lg:flex-row lg:gap-24">
          <div className="flex flex-col items-center lg:mt-16">
            <div className="my-6 flex flex-col items-center gap-2 text-lg">
              <p>Current Velocity</p>
              <b>
                {(Math.round(currentVelocity / 1000) * 1000).toLocaleString()}{" "}
                m/s
              </b>
            </div>
            <div className="mb-4 grid w-fit grid-cols-2 gap-6 sm:grid-cols-3">
              {speedChoices.map((s) => (
                <button
                  className={`rounded border p-2 text-sm hover:bg-white hover:text-black lg:text-lg ${
                    currentVelocity === s.speed && "bg-white text-black"
                  }`}
                  onClick={() => setCurrentVelocity(s.speed)}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
          <div className="mb-12 flex flex-col items-center">
            <h2 className="my-5 text-center text-2xl font-bold">
              Lorentz Factor {gamma.toFixed(2)}
            </h2>
            <div className="flex flex-col items-center justify-center gap-8 sm:flex-row sm:gap-24">
              <Clock label="Stationary Observer" />
              <Clock label={`${percentC}% of Light Speed`} timeFactor={gamma} />
            </div>
            <AudioControl timeFactor={gamma} />
          </div>
        </div>
      </div>
      <div className="flex h-full items-center justify-center gap-1 pb-3 text-sm text-slate-300">
        Made by Nick Atkins -
        <a
          href="https://github.com/nmatkins/time-dilation-simulator"
          className="underline opacity-80 hover:opacity-100"
        >
          View on Github
        </a>
      </div>
    </div>
  );
}

export default App;
