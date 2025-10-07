# 🎵 Step Sequencer Implementation Guide

## Overview
This document outlines how to create a step sequencer component for the comp-lib-homework project, based on the provided Tone.js implementation.

## What is a Step Sequencer?
A step sequencer is a musical tool that allows users to create rhythmic patterns by clicking on a grid. Each row represents a different sound/note, and each column represents a time step in the sequence.

## Dependencies Required

### 1. Install Tone.js
```bash
npm install tone
```

### 2. Add Tone.js Script (Alternative)
Add to `public/index.html`:
```html
<script src="https://unpkg.com/tone@14.7.77/build/Tone.js"></script>
```

### 3. Icons
The original code uses `lucide-react`, but we can use the existing `react-icons` package instead.

## Component Architecture

### Component Breakdown
1. **`SequencerButton.js`** - Individual beat button
2. **`SequencerGrid.js`** - 4×12 grid container with step indicator
3. **`SequencerControls.js`** - Play/pause/stop/clear buttons
4. **`BPMControl.js`** - BPM slider and display
5. **`StepSequencer.js`** - Main container component
6. **`SequencerPage.js`** - Page wrapper

### Key Features
- **4 rows × 12 columns** grid of clickable beats
- **Different notes per row**: C5, A4, F4, C4 (high to low)
- **Visual feedback**: Purple indicator shows current step
- **Audio synthesis**: Uses Tone.js for sound generation
- **BPM control**: Adjustable tempo (40-200 BPM)
- **Playback controls**: Play, pause, stop, clear

## Implementation Steps

### Step 1: Create SequencerButton Component
```jsx
import React from 'react';
import cx from 'classnames';

const SequencerButton = ({
    isActive = false,
    isCurrentStep = false,
    onClick,
    className = '',
    ...otherProps
}) => {
    const classes = cx(
        'h-[76px] w-[76px] rounded-[20px] border transition-all duration-150 hover:scale-105',
        {
            'bg-[#e8ff00] border-[#e8ff00]': isActive,
            'border-[#c5c5c5] hover:border-[#e8ff00]': !isActive,
        },
        className
    );

    return (
        <button
            className={classes}
            onClick={onClick}
            {...otherProps}
        />
    );
};

export default SequencerButton;
```

### Step 2: Create SequencerGrid Component
```jsx
import React from 'react';
import SequencerButton from './SequencerButton';

const SequencerGrid = ({
    grid = [],
    currentStep = -1,
    onBeatToggle,
    rows = 4,
    cols = 12,
    className = '',
    ...otherProps
}) => {
    return (
        <div className={`relative ${className}`} {...otherProps}>
            {/* Purple column indicator for current step */}
            {currentStep >= 0 && (
                <div 
                    className="absolute bg-[#9747ff] h-[352px] w-[76px] top-0 mix-blend-multiply transition-all duration-75 pointer-events-none rounded-[20px]"
                    style={{
                        left: `${currentStep * (76 + 16)}px`
                    }}
                />
            )}
            
            {/* Grid */}
            <div 
                className="grid gap-4" 
                style={{ gridTemplateColumns: `repeat(${cols}, 76px)` }}
            >
                {Array(cols).fill(null).map((_, col) => (
                    <div key={col} className="flex flex-col gap-4">
                        {Array(rows).fill(null).map((_, row) => (
                            <SequencerButton
                                key={`${row}-${col}`}
                                isActive={grid[row] && grid[row][col]}
                                isCurrentStep={col === currentStep}
                                onClick={() => onBeatToggle(row, col)}
                            />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SequencerGrid;
```

### Step 3: Create SequencerControls Component
```jsx
import React from 'react';
import Button from './Button';
import { FaPlay, FaPause, FaRedo } from 'react-icons/fa';

const SequencerControls = ({
    isPlaying = false,
    onPlayPause,
    onStop,
    onClear,
    className = '',
    ...otherProps
}) => {
    return (
        <div className={`flex items-center gap-4 ${className}`} {...otherProps}>
            <Button
                onClick={onPlayPause}
                className="h-12 w-12 rounded-full border-2 border-[#e8ff00] bg-black text-[#e8ff00] hover:bg-[#e8ff00] hover:text-black flex items-center justify-center"
            >
                {isPlaying ? (
                    <FaPause className="h-6 w-6" />
                ) : (
                    <FaPlay className="h-6 w-6 ml-1" />
                )}
            </Button>
            
            <Button
                onClick={onStop}
                className="h-12 w-12 rounded-full border-2 border-[#e8ff00] bg-black text-[#e8ff00] hover:bg-[#e8ff00] hover:text-black flex items-center justify-center"
            >
                <FaRedo className="h-5 w-5" />
            </Button>

            <Button
                onClick={onClear}
                className="h-12 px-6 rounded-full border-2 border-[#e8ff00] bg-black text-[#e8ff00] hover:bg-[#e8ff00] hover:text-black"
            >
                Clear
            </Button>
        </div>
    );
};

export default SequencerControls;
```

### Step 4: Create BPMControl Component
```jsx
import React from 'react';

const BPMControl = ({
    bpm = 96,
    minBpm = 40,
    maxBpm = 200,
    onBpmChange,
    className = '',
    ...otherProps
}) => {
    const handleSliderChange = (e) => {
        const newBpm = parseInt(e.target.value);
        onBpmChange(newBpm);
    };

    return (
        <div className={`flex flex-col items-center gap-6 ${className}`} {...otherProps}>
            {/* BPM Display */}
            <div className="text-center">
                <div className="text-4xl font-bold text-[#e8ff00]">{bpm}</div>
                <div className="text-sm text-gray-400">BPM</div>
            </div>
            
            {/* BPM Slider */}
            <div className="w-[300px]">
                <input
                    type="range"
                    min={minBpm}
                    max={maxBpm}
                    value={bpm}
                    onChange={handleSliderChange}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                    style={{
                        background: `linear-gradient(to right, #e8ff00 0%, #e8ff00 ${((bpm - minBpm) / (maxBpm - minBpm)) * 100}%, #374151 ${((bpm - minBpm) / (maxBpm - minBpm)) * 100}%, #374151 100%)`
                    }}
                />
                <div className="flex justify-between text-xs text-gray-400 mt-2">
                    <span>{minBpm}</span>
                    <span>{maxBpm}</span>
                </div>
            </div>
        </div>
    );
};

export default BPMControl;
```

### Step 5: Create Main StepSequencer Component
```jsx
import React, { useEffect, useMemo, useRef, useState } from 'react';
import SequencerGrid from './SequencerGrid';
import SequencerControls from './SequencerControls';
import BPMControl from './BPMControl';

// Constants
const ROWS = 4;
const COLS = 12;
const NOTES = ["C5", "A4", "F4", "C4"]; // Note mapping for 4 rows

const StepSequencer = ({
    className = '',
    ...otherProps
}) => {
    // State
    const [isPlaying, setIsPlaying] = useState(false);
    const [isStarted, setIsStarted] = useState(false);
    const [bpm, setBpm] = useState(96);
    const [currentStep, setCurrentStep] = useState(-1);
    const [grid, setGrid] = useState(() => 
        Array(ROWS).fill(null).map(() => Array(COLS).fill(false))
    );

    // Refs
    const sequencerRef = useRef(null);
    const synthRef = useRef(null);

    // Initialize with some default beats
    useEffect(() => {
        setGrid(prev => {
            const newGrid = prev.map(row => [...row]);
            newGrid[1][3] = true;
            newGrid[2][4] = true;
            newGrid[1][7] = true;
            return newGrid;
        });
    }, []);

    // Create synth with Tone.js (lazy initialization)
    const synth = useMemo(() => {
        if (typeof window !== 'undefined' && window.Tone) {
            const polySynth = new window.Tone.PolySynth(window.Tone.Synth, {
                maxPolyphony: 4,
                options: {
                    oscillator: { type: "triangle" },
                    envelope: { attack: 0.005, decay: 0.1, sustain: 0.3, release: 0.4 }
                }
            });

            const filter = new window.Tone.Filter(2000, "lowpass");
            const reverb = new window.Tone.Reverb({ decay: 1.5, wet: 0.3 });

            polySynth.chain(filter, reverb, window.Tone.Destination);
            return polySynth;
        }
        return null;
    }, []);

    synthRef.current = synth;

    // Update BPM
    useEffect(() => {
        if (synth && window.Tone) {
            window.Tone.Transport.bpm.value = bpm;
        }
    }, [bpm, synth]);

    // Create and manage the sequence
    useEffect(() => {
        if (!synth || !window.Tone) return;

        if (sequencerRef.current) {
            sequencerRef.current.dispose();
        }

        sequencerRef.current = new window.Tone.Sequence(
            (time, step) => {
                // Update current step for visual feedback
                window.Tone.Draw.schedule(() => {
                    setCurrentStep(step);
                }, time);

                // Trigger notes for active beats in this column
                const notesToPlay = [];
                for (let row = 0; row < ROWS; row++) {
                    if (grid[row] && grid[row][step]) {
                        notesToPlay.push(NOTES[row]);
                    }
                }
                
                if (notesToPlay.length > 0 && synth) {
                    synth.triggerAttackRelease(notesToPlay, "16n", time);
                }
            },
            [...Array(COLS).keys()],
            "16n"
        );

        return () => {
            if (sequencerRef.current) {
                sequencerRef.current.dispose();
            }
        };
    }, [grid, synth]);

    // Event handlers
    const toggleBeat = (row, col) => {
        setGrid(prev => {
            const newGrid = prev.map(r => [...r]);
            newGrid[row][col] = !newGrid[row][col];
            return newGrid;
        });
    };

    const handlePlayPause = async () => {
        if (!window.Tone) {
            console.warn('Tone.js not loaded');
            return;
        }

        if (!isStarted) {
            await window.Tone.start();
            setIsStarted(true);
        }

        if (isPlaying) {
            window.Tone.Transport.pause();
            setIsPlaying(false);
        } else {
            if (sequencerRef.current) {
                sequencerRef.current.start(0);
            }
            window.Tone.Transport.start();
            setIsPlaying(true);
        }
    };

    const handleStop = () => {
        if (window.Tone) {
            window.Tone.Transport.stop();
        }
        setIsPlaying(false);
        setCurrentStep(-1);
    };

    const clearGrid = () => {
        setGrid(Array(ROWS).fill(null).map(() => Array(COLS).fill(false)));
    };

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (window.Tone) {
                window.Tone.Transport.stop();
            }
            if (sequencerRef.current) {
                sequencerRef.current.dispose();
            }
            if (synth) {
                synth.dispose();
            }
        };
    }, [synth]);

    return (
        <div className={`bg-black relative size-full flex items-center justify-center ${className}`} {...otherProps}>
            <div className="flex flex-col items-center gap-12">
                <SequencerControls
                    isPlaying={isPlaying}
                    onPlayPause={handlePlayPause}
                    onStop={handleStop}
                    onClear={clearGrid}
                />

                <SequencerGrid
                    grid={grid}
                    currentStep={currentStep}
                    onBeatToggle={toggleBeat}
                    rows={ROWS}
                    cols={COLS}
                />

                <BPMControl
                    bpm={bpm}
                    minBpm={40}
                    maxBpm={200}
                    onBpmChange={setBpm}
                />
            </div>
        </div>
    );
};

export default StepSequencer;
```

### Step 6: Create SequencerPage Component
```jsx
import React from 'react';
import StepSequencer from '../components/StepSequencer';

const SequencerPage = () => {
    return (
        <div className="min-h-screen bg-gray-900">
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-white mb-8 text-center">
                    Step Sequencer
                </h1>
                <div className="max-w-4xl mx-auto">
                    <StepSequencer />
                </div>
            </div>
        </div>
    );
};

export default SequencerPage;
```

## Technical Considerations

### Tone.js Integration
- **Lazy initialization**: Check if Tone.js is available before using
- **Cleanup**: Proper disposal of synths and sequences on unmount
- **Audio context**: Handle browser audio context requirements

### State Management
```jsx
const [grid, setGrid] = useState(() => 
  Array(4).fill(null).map(() => Array(12).fill(false))
);
const [currentStep, setCurrentStep] = useState(-1);
const [isPlaying, setIsPlaying] = useState(false);
const [bpm, setBpm] = useState(96);
```

### Audio Synthesis
```jsx
const synth = useMemo(() => {
  const polySynth = new Tone.PolySynth(Tone.Synth, {
    maxPolyphony: 4,
    options: {
      oscillator: { type: "triangle" },
      envelope: { attack: 0.005, decay: 0.1, sustain: 0.3, release: 0.4 }
    }
  });
  
  const filter = new Tone.Filter(2000, "lowpass");
  const reverb = new Tone.Reverb({ decay: 1.5, wet: 0.3 });
  
  polySynth.chain(filter, reverb, Tone.Destination);
  return polySynth;
}, []);
```

## Styling Adaptations

### Design System Alignment
- Use existing `Button` component for controls
- Follow `classnames` pattern for conditional styling
- Use Tailwind CSS classes consistently
- Match color scheme: `#e8ff00` (yellow), `#9747ff` (purple)

### Key Styles
```css
/* Beat buttons */
.h-[76px] w-[76px] rounded-[20px] border

/* Active state */
.bg-[#e8ff00] border-[#e8ff00]

/* Inactive state */
.border-[#c5c5c5] hover:border-[#e8ff00]

/* Step indicator */
.bg-[#9747ff] mix-blend-multiply

/* Controls */
.border-[#e8ff00] bg-black text-[#e8ff00]
```

## Integration with Existing Project

### Add to App.js Routes
```jsx
// In App.js, add the sequencer route
import SequencerPage from './pages/SequencerPage';

// Add to Routes section
<Route path="/sequencer" element={<SequencerPage />} />
```

### Add to Navigation.js
```jsx
// In Navigation.js, add to the navigation items
const navigationItems = [
    // ... existing items
    {
        label: 'Sequencer',
        path: '/sequencer',
        icon: <FaMusic className="w-5 h-5" />
    }
];
```

### Add to DashboardPage.js
```jsx
// In DashboardPage.js, add to the components showcase
<AccordionItem
    title="Step Sequencer"
    description="Interactive drum machine with Tone.js audio synthesis"
    path="/sequencer"
    icon={<FaMusic className="w-6 h-6 text-purple-500" />}
/>
```

### File Structure
```
src/
├── components/
│   ├── SequencerButton.js
│   ├── SequencerGrid.js
│   ├── SequencerControls.js
│   ├── BPMControl.js
│   └── StepSequencer.js
└── pages/
    └── SequencerPage.js
```

### HTML Script Tag (Alternative to npm install)
```html
<!-- Add to public/index.html before closing </body> tag -->
<script src="https://unpkg.com/tone@14.7.77/build/Tone.js"></script>
```

## Testing Strategy

### Functionality Tests
- [ ] Grid buttons toggle correctly
- [ ] Play/pause controls work
- [ ] BPM changes affect playback speed
- [ ] Step indicator moves correctly
- [ ] Audio plays for active beats
- [ ] Clear function resets grid

### Browser Compatibility
- [ ] Chrome (Web Audio API support)
- [ ] Firefox (Web Audio API support)
- [ ] Safari (Web Audio API support)
- [ ] Mobile browsers (touch interaction)

## Future Enhancements

### Potential Improvements
1. **Sound variety**: Multiple synth types per row
2. **Pattern saving**: Save/load beat patterns
3. **Visual effects**: Particle effects on beat triggers
4. **Mobile optimization**: Touch-friendly controls
5. **Recording**: Record and playback sequences
6. **Export**: Export patterns as audio files

### Advanced Features
1. **Multiple patterns**: Switch between different sequences
2. **Pattern chaining**: Link multiple patterns
3. **Swing/groove**: Add timing variations
4. **Effects**: Reverb, delay, filter controls
5. **MIDI support**: Connect external controllers

## Conclusion

This step sequencer implementation would add a unique, interactive audio component to the comp-lib-homework project. It demonstrates advanced React patterns, Web Audio API integration, and complex state management while maintaining consistency with the existing design system.

The modular component architecture makes it maintainable and extensible, following the established patterns in the codebase.
