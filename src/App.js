import React, { useEffect, useState } from "react";
import "./App.scss";
import { PadBankData } from "./padBankData";

const App = () => {
  const [volume, setVolume] = useState(1);
  const [disableBtn, setDisableBtn] = useState(true);
  const [screenValue, setScreenValue] = useState("");

  // Handle volume change
  const handleVolume = (e) => {
    setVolume(e.target.value);
  };

  // Handle power button click
  const handlePower = () => {
    setDisableBtn(!disableBtn)
    console.log(disableBtn)
    setScreenValue("");
    document.getElementById("switch").style.cssFloat = disableBtn
      ? "right"
      : "left";
    document.getElementById("switch").style.background = disableBtn
      ? "green"
      : "#92140c";
  };

  // Render the component
  return (
    <div className="inner-container">
      <div className="pad-bank">
        {/* Render AudioButton component for each pad */}
        
        {
        !disableBtn ?
        (PadBankData.map((pad) => {
          return (
            <AudioButton
              key={pad.no}
              pad={pad}
              disableBtn={disableBtn}
              volume={volume}
              setScreenValue={setScreenValue}
            />
          );
        }
        )):<h3 className="m-auto text-center">Turn Power On</h3>
        }
      </div>
      <div className="controls-container">
        <div className="Power-wrapper">
          <p>power</p>
          <div className="switch-wrapper" onClick={handlePower}>
            <div className="switch" id="switch"></div>
          </div>
        </div>
        <div className="screen">{screenValue}</div>
        <div className="range-wrapper">
          <h5 className="text-center">Volume</h5>
          <input
            type="range"
            min="0"
            step="0.1"
            max="1"
            onChange={handleVolume}
            value={volume}
          ></input>
        </div>
      </div>
    </div>
  );


// AudioButton component

function AudioButton({ pad, disableBtn, volume, setScreenValue }) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  
  }, []);

  // Handle key press event
  const handleKeyPress = (event) => {
    if (event.key === pad.id_audio.toLowerCase() ) {
      playSound();
    }
  };

  // Play the sound
  const playSound = () => {
    const audioTag = document.getElementById(pad.id_audio);
    console.log(disableBtn)
     
   
      setScreenValue(pad.id_main);
      audioTag.currentTime = 0;
      audioTag.play();
      setActive(true);
      setTimeout(() => {
        setActive(false);
      }, 200);
  
    audioTag.volume = volume;
  };

  // Render the component
  return (
    <button
      disabled={!disableBtn}
      className={!active ? "drum-pad" : "drum-active"}
      id={pad.id_main}
      onClick={playSound}
    >
      <audio src={pad.source} id={pad.id_audio}></audio>
      {pad.id_audio}
    </button>
  );
}
}
export default App;
