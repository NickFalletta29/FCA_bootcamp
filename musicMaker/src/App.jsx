import React, { useState } from "react"; // Import React and useState hook
import * as Tone from "tone"; // Import Tone.js for sound generation
import "./App.css"; // Import the stylesheet for styling

// Define an array of musical notes corresponding to rows (higher to lower pitch)
const noteMapping = ["C5", "B4", "A4", "G4", "F4", "E4", "D4", "C4"];

const columns = 16; // Number of time steps (columns) in the sequence
const rows = noteMapping.length; // Number of rows is now explicitly set

// Create a polyphonic synthesizer (allows multiple notes to play at once)
const synth = new Tone.PolySynth(Tone.Synth).toDestination();

function App() {
  // Initialize a 2D array representing the music sheet with 'columns' and 'rows'
  const [musicSheet, setMusicSheet] = useState(
    Array.from({ length: columns }, () => Array(rows).fill(null))
  );

  // Function to play the sequence when the play button is clicked
  const playSequence = () => {
    const now = Tone.now(); // Get the current time to schedule note playback
    
    musicSheet.forEach((column, colIndex) => { // Loop through each time step (column)
      const notesToPlay = column.filter((note) => note); // Filter active notes in the column
      if (notesToPlay.length > 0) {
        // Schedule notes at each time step with a duration of "8n" (eighth note)
        synth.triggerAttackRelease(notesToPlay, "8n", now + colIndex * .5);
      }
    });
  };

  // Function to toggle notes when a user clicks on a note space
  const toggleNote = (colIndex, rowIndex) => {
    setMusicSheet((prevSheet) => { // Update state with the new note selection
      const newSheet = prevSheet.map((col, i) =>
        i === colIndex // Check if this is the column being modified
          ? col.map((note, j) => (j === rowIndex ? (note ? null : noteMapping[rowIndex]) : note)) // Toggle the note
          : col // Keep other columns unchanged
      );
      
      // Play the note immediately if it was just activated
      if (!prevSheet[colIndex][rowIndex]) {
        synth.triggerAttackRelease(noteMapping[rowIndex], "8n");
      }
      return newSheet; // Return the updated state
    });
  };

  // Function to clear all notes from the music sheet
  const clearSheet = () => {
    setMusicSheet(Array.from({ length: columns }, () => Array(rows).fill(null))); // Reset all notes to null
  };

  return (
    <div className="music-container"> {/* Main container wrapping the entire UI */}
      <h1>Music Maker</h1> {/* Application title */}
      
      {/* Display the music sheet (grid layout) */}
      <div className="music-sheet">
        {Array.from({ length: columns }).map((_, colIndex) => (
          <div key={colIndex} className="column"> {/* Each column represents a single time step */}
            {Array.from({ length: rows }).map((_, rowIndex) => (
              <div
                key={rowIndex}
                className={`note-space ${musicSheet[colIndex][rowIndex] ? "filled" : "empty"}`} // Apply styles based on whether the note is active
                onClick={() => toggleNote(colIndex, rowIndex)} // Toggle note state on click
              >
                {musicSheet[colIndex][rowIndex] && "♪"} {/* Display musical note symbol if active */}
              </div>
            ))}
          </div>
        ))}
      </div>
      
      {/* Control buttons for playing and clearing the music sheet */}
      <button className="play-button" onClick={playSequence}>Play</button> {/* Play button */}
      <button className="clear-button" onClick={clearSheet}>Clear Sheet</button> {/* Clear button */}
    </div>
  );
}

export default App;
