import React, { useState } from "react";
import * as Tone from "tone";
import "./App.css";

const noteMapping = ["C5", "B4", "A4", "G4", "F4", "E4", "D4", "C4"];

const columns = 16;
const rows = noteMapping.length;

const synth = new Tone.PolySynth(Tone.Synth).toDestination();

function App() {

  const [musicSheet, setMusicSheet] = useState(
    Array.from({length: columns}, () => Array(rows).fill(null))
  );

  const playSequence = () => {
    const now = Tone.now();

    musicSheet.forEach((column, colIndex) => {
      const notesToPlay = column.filter((note) => note);

      if (notesToPlay.length > 0) {
        synth.triggerAttackRelease(notesToPlay, "8n", now + colIndex * .5);
      }
    });
  };

  const toggleNote = (colIndex, rowIndex) => {
    setMusicSheet((prevSheet) => {
      const newSheet = prevSheet.map((col, i) =>
        i === colIndex
          ? col.map((note, j) => (j === rowIndex ? (note ? null : noteMapping[rowIndex]) : note))
          : col
      );

      if (!prevSheet[colIndex][rowIndex]) {
        synth.triggerAttackRelease(noteMapping[rowIndex], "8n");
      }
      return newSheet;
    });
  };

  const clearSheet = () => {
    setMusicSheet(Array.from({length: columns}, () => Array(rows).fill(null)));
  };

  return (
    <div className="music-container">
      <h1>Music Maker</h1>

      <div className='music-sheet'>

      {Array.from( {length: columns }).map((_, colIndex) => (

        <div key={colIndex} className="column">

          {Array.from( {length: rows }).map((_, rowIndex) => (

            <div key={rowIndex} onClick={() => toggleNote(colIndex, rowIndex)} 

            className={`note-space ${musicSheet[colIndex][rowIndex] ? "filled" : "empty"}`}>

              {musicSheet[colIndex][rowIndex] && "note"}
            </div>
          ))}
        </div>
      ))}
      </div>

      <button className="playBtn" onClick={playSequence}>Play</button>
      <button className="clearBtn" onClick={clearSheet}>Clear</button>
    </div>
  );
}

export default App;
