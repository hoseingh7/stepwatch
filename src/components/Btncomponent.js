import React, { useState } from "react";

function BtnComponent(props) {
  const [recordedTimes, setRecordedTimes] = useState([]);
  const [timerStartTime, setTimerStartTime] = useState(null);

  const recordTimeOnClick = () => {
    const currentTime = Date.now();

    setRecordedTimes((prevTimes) => [...prevTimes, currentTime]);
  };
  const handleReset = () => {
    setRecordedTimes([]);
    setTimerStartTime(null);
    props.reset();
  };

  const recordLapTime = () => {
    const lapTime = new Date(
      `${props.time.m}:${props.time.s}:${props.time.ms}  `
    );

    const temp = [...recordedTimes];
    // temp.push({
    //   m: new Date(lapTime).getUTCMinutes(),
    //   s: new Date(lapTime).getUTCSeconds(),
    //   ms: new Date(lapTime).getUTCMilliseconds(),
    // });
    temp.push({
      m: lapTime.getUTCMinutes(),
      s: lapTime.getUTCSeconds(),
      ms: lapTime.getUTCMilliseconds(),
    });
    setRecordedTimes(temp);
    // console.log(temp);
  };

  return (
    <div>
      {props.status === 0 ? (
        <button
          className="stopwatch-btn stopwatch-btn-gre"
          onClick={() => {
            props.start();
            setRecordedTimes([]); // Reset recorded times when Start is clicked
          }}>
          Start
        </button>
      ) : (
        ""
      )}

      {props.status === 1 ? (
        <div>
          <button
            className="stopwatch-btn stopwatch-btn-red"
            onClick={props.stop}>
            Stop
          </button>
          <button
            className="stopwatch-btn stopwatch-btn-gre"
            onClick={recordLapTime}>
            Lap
          </button>
          <button
            className="stopwatch-btn stopwatch-btn-yel"
            onClick={handleReset}>
            Reset
          </button>
        </div>
      ) : (
        ""
      )}

      {props.status === 2 ? (
        <div>
          <button
            className="stopwatch-btn stopwatch-btn-gre"
            onClick={props.resume}>
            Resume
          </button>
          <button
            className="stopwatch-btn stopwatch-btn-gre"
            onClick={recordLapTime}>
            Lap
          </button>
          <button
            className="stopwatch-btn stopwatch-btn-yel"
            onClick={handleReset}>
            Reset
          </button>
        </div>
      ) : (
        ""
      )}

      {/* New Record button */}

      {/* Display recorded times */}
      <div>
        <div className="display__title__showtime">
          <h1>lap</h1> <h2>Time</h2>
        </div>
        {recordedTimes.length > 0 &&
          recordedTimes.map((time, index) => (
            <div
              className="show__time__and__index"
              key={index}>
              <p>{index + 1}</p>
              {/* <p>{`${props.time.m}:${props.time.s}:${props.time.ms}  `}</p> */}
              <p>{`${time.m}:${time.s}:${time.ms}  `}</p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default BtnComponent;
// new Date(time).toLocaleTimeString()
