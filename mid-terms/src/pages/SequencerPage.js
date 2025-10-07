import React, { useCallback, useEffect, useRef, useState } from "react";
import * as Tone from "tone";
import SequencerGrid from "../components/SequencerGrid";
import CircularBPMSlider from "../components/CircularBPMSlider";

const ROWS = 4;
const COLS = 12;

const createInitialGrid = () => {
  const grid = Array.from({ length: ROWS }, () => Array(COLS).fill(false));
  grid[1][2] = true;
  grid[2][2] = true;
  grid[1][3] = true;
  return grid;
};


//=========== I found some sample code from the Tone.js website to help me with the sequencer=========== 


// simple mapping: one pitch per row (you can swap to drum synths later)
const ROW_NOTES = ["C4", "E4", "G4", "B4"];

export default function SequencerPage() {
  const [grid, setGrid] = useState(createInitialGrid);
  const [isPlaying, setIsPlaying] = useState(false);
  const [bpm, setBpm] = useState(120);
  const [currentStep, setCurrentStep] = useState(0);

  // Tone objects live in refs so they persist without re-creating
  const synthRef = useRef(null);
  const loopRef = useRef(null);

  // keep a ref to the grid so the loop always “sees” the latest pattern
  const gridRef = useRef(grid);
  useEffect(() => { gridRef.current = grid; }, [grid]);

  // also keep a step counter in a ref to avoid state timing issues
  const stepRef = useRef(0);

  // init Tone engine once
  useEffect(() => {
    // synth
    const synth = new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: "triangle" },
      envelope: { attack: 0.005, decay: 0.1, sustain: 0.1, release: 0.2 },
    }).toDestination();
    synthRef.current = synth;

    // timing loop: ticks every 16th note
    const loop = new Tone.Loop((time) => {
      const step = stepRef.current;
      const g = gridRef.current;

      // Update visual FIRST, before audio
      setCurrentStep(step);

      // trigger any active notes in this column
      for (let row = 0; row < ROWS; row++) {
        if (g[row][step]) {
          synth.triggerAttackRelease(ROW_NOTES[row], "16n", time);
        }
      }

      // advance
      stepRef.current = (step + 1) % COLS;
    }, "16n");

    loopRef.current = loop;

    // cleanup
    return () => {
      loop.dispose();
      synth.dispose();
      loopRef.current = null;
      synthRef.current = null;
    };
  }, []);

  // keep BPM in sync
  useEffect(() => {
    Tone.Transport.bpm.rampTo(bpm, 0.05);
  }, [bpm]);

  // play/pause handlers
  const handlePlay = useCallback(async () => {
    // must be triggered by user gesture in most browsers
    await Tone.start();
    stepRef.current = 0;
    setCurrentStep(0);
    loopRef.current?.start(0);
    Tone.Transport.start("+0.05");
    setIsPlaying(true);
  }, []);

  const handleStop = useCallback(() => {
    Tone.Transport.stop();
    loopRef.current?.stop(0);
    stepRef.current = 0;
    setCurrentStep(0);
    setIsPlaying(false);
  }, []);

  // grid toggle (immutable update)
  const toggleCell = useCallback((r, c) => {
    setGrid((prev) =>
      prev.map((row, ri) =>
        ri === r ? row.map((v, ci) => (ci === c ? !v : v)) : row
      )
    );
  }, []);

  return (
    <div className="flex flex-col gap-4 items-center  bg-black  p-10  ">
        <div className="flex items-center gap-3">
          {!isPlaying ? ( 
           <button onClick={handlePlay} className="bg-[#e8ff00] px-3 py-1 rounded text-black hover:bg-[#d4e600] transition-colors">
              Play
            </button>
          ) : (
           <button onClick={handleStop} className="border-2 border-[#e8ff00] px-3 py-1 rounded bg-black text-[#e8ff00] hover:bg-[#e8ff00] hover:text-black transition-colors">
              Stop
            </button>
          )}
        <div className="flex items-center gap-2">
          <label className="text-[#e8ff00] text-sm font-medium">BPM</label>
          <input 
            type="range" 
            min={60} 
            max={200} 
            value={bpm} 
            onChange={(e) => setBpm(parseInt(e.target.value, 10))}
            className="w-32 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
          />
          <span className="text-[#e8ff00] text-sm font-mono w-8">{bpm}</span>
        </div>
      </div>

      <SequencerGrid
        grid={grid}
        currentStep={currentStep}
        onToggleCell={toggleCell}
      />
 
    </div>
  );
}

        