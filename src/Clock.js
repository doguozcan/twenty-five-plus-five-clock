import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDownLong,
  faUpLong,
  faHourglass,
  faRefresh,
} from "@fortawesome/free-solid-svg-icons";

function Clock() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [paused, setPaused] = useState(true);
  const [isBreak, setIsBreak] = useState(false);
  const audio = document.getElementById("beep");

  function handleBreak(break_) {
    const newBreak = breakLength + break_;
    if (newBreak >= 1 && newBreak <= 60) {
      setBreakLength(newBreak);
    }
  }

  function handleSession(minute) {
    const newSession = sessionLength + minute;
    if (newSession >= 1 && newSession <= 60) {
      setSessionLength(newSession);
      setTimeLeft(newSession * 60);
    }
  }

  function handleReset() {
    setBreakLength(5);
    setSessionLength(25);
    setTimeLeft(25 * 60);
    setPaused(true);
    setIsBreak(false);
    audio.pause();
    audio.currentTime = 0;
  }

  useEffect(() => {
    let interval;
    if (!paused && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsBreak(!isBreak);
      audio.play();
      if (!isBreak) {
        setTimeLeft(breakLength * 60);
      } else {
        setTimeLeft(sessionLength * 60);
      }
    }
    return () => clearInterval(interval);
  }, [paused, timeLeft, isBreak, breakLength, sessionLength]);

  function secondsToMMSSFormat(time) {
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);
    return `${minutes < 10 ? `0${minutes}` : minutes}:${
      seconds < 10 ? `0${seconds}` : seconds
    }`;
  }

  return (
    <div className="container border border-success rounded p-4">
      <h1 id="title">25 + 5 Clock</h1>
      <div className="container border border-success rounded p-1 mb-3">
        <h2 id="break-label" className="text-center">
          Break Length
        </h2>
        <div className="container">
          <div className="row p-2">
            <div
              className="col text-center my-auto"
              id="break-decrement"
              onClick={() => handleBreak(-1)}
            >
              <FontAwesomeIcon icon={faDownLong} color="green" />
            </div>
            <h3 className="col text-center my-auto" id="break-length">
              {breakLength}
            </h3>
            <div
              className="col text-center my-auto"
              id="break-increment"
              onClick={() => handleBreak(1)}
            >
              <FontAwesomeIcon icon={faUpLong} color="green" />
            </div>
          </div>
        </div>
      </div>
      <div className="container border border-success rounded p-1 mb-3">
        <h2 id="session-label" className="text-center">
          Session Length
        </h2>
        <div className="container">
          <div className="row p-2">
            <div
              id="session-decrement"
              className="col text-center my-auto"
              onClick={() => handleSession(-1)}
            >
              <FontAwesomeIcon icon={faDownLong} color="green" />
            </div>
            <h3 id="session-length" className="col text-center my-auto">
              {sessionLength}
            </h3>
            <div
              id="session-increment"
              className="col text-center my-auto"
              onClick={() => handleSession(1)}
            >
              <FontAwesomeIcon icon={faUpLong} color="green" />
            </div>
          </div>
        </div>
      </div>
      <div className="container border border-success rounded p-1 mb-3">
        <div className="row p-2 text-center">
          <h2 id="timer-label">{!isBreak ? "Session" : "Break"}</h2>
          <h3 id="time-left">{secondsToMMSSFormat(timeLeft)}</h3>
        </div>
      </div>
      <div className="row">
        <div
          id="start_stop"
          className="col text-center"
          onClick={() => setPaused(!paused)}
        >
          <FontAwesomeIcon icon={faHourglass} />
        </div>
        <div id="reset" className="col text-center" onClick={handleReset}>
          <FontAwesomeIcon icon={faRefresh} />
        </div>
      </div>
      <audio
        id="beep"
        src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/BeepSound.wav"
      ></audio>
    </div>
  );
}

export default Clock;
