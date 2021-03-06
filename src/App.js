import React from "react";
import { useEffect, useState } from "react";
import { interval, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

const Status = ["run", "stop", "wait"];

function App() {
  const [sec, setSec] = useState(0);
  const [status, setStatus] = useState(Status[1]);

  useEffect(() => {
    const unsubscribe$ = new Subject();
    interval(1000)
      .pipe(takeUntil(unsubscribe$))
      .subscribe(() => {
        if (status === "run") {
          setSec(v => v + 1000);
        }
      });
    return () => {
      unsubscribe$.next();
      unsubscribe$.complete();
    };
  }, [status]);

  const start = React.useCallback(() => {
    setStatus("run");
  }, []);

  const stop = React.useCallback(() => {
    setStatus("stop");
    setSec(0);
  }, []);

  const reset = React.useCallback(() => {
    setSec(0);
  }, []);

  const wait = React.useCallback(() => {
    setStatus("wait");
  }, []);

  return (
    <div>
      <span> {new Date(sec).toISOString().slice(11, 19)}</span>
      <button onClick={start}>
        Start
      </button>
      <button onClick={stop}>
        Stop
      </button>
      <button onClick={reset}>Reset</button>
      <button onDoubleClick={wait}>Wait</button>
    </div>
  );
}

export default App;