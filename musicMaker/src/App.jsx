import React, { useState } from "react";
import * as Tone from "tone";
import "./App.css";

const noteMapping = ["C5", "B4", "A4", "G4", "F4", "E4", "D4", "C4"];

const columns = 16;
const rows = noteMapping.length;

const synth = new Tone.PolySynth(Tone.Synth).toDestination();

function App() {

  const [musicSheet, setMusicSheet] = useState("?");

  const playSequence = () => {

  };

  const toggleNote = () => {

  };

  const clearSheet = () => {

  };

  return (
    <div className="music-container">

    </div>
  );
}

export default App;
