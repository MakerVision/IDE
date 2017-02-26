import React from 'react';
import NoteBlock from './NoteBlock';
import color from '../../../colors';

export const SixteenthNote = () => (
    <NoteBlock
        type="sixteenth_note"
        label="Sixteenth Note"
        helpUrl="https://en.wikipedia.org/wiki/Sixteenth_note"
        tooltip="Plays a sixteenth note"
        color={color.lightBlue}
        duration={50}
        padding={6}
    />
);

export const EighthNote = () => (
    <NoteBlock
        type="eighth_note"
        label="♪ Eighth Note"
        helpUrl="https://en.wikipedia.org/wiki/Eighth_note"
        tooltip="Plays a eighth note"
        color={color.teal}
        duration={100}
        padding={12}
    />
);

export const QuarterNote = () => (
    <NoteBlock
        type="quarter_note"
        label="♩ Quarter Note"
        helpUrl="https://en.wikipedia.org/wiki/Quarter_note"
        tooltip="Plays a quarter note"
        color={color.deepOrange}
        duration={200}
        padding={25}
    />
);

export const HalfNote = () => (
    <NoteBlock
        type="half_note"
        label="Half Note"
        helpUrl="https://en.wikipedia.org/wiki/Half_note"
        tooltip="Plays a half note"
        color={color.red}
        duration={400}
        padding={50}
    />
);

export const WholeNote = () => (
    <NoteBlock
        type="whole_note"
        label="Whole Note"
        helpUrl="https://en.wikipedia.org/wiki/Whole_note"
        tooltip="Plays a whole note"
        color={color.green}
        duration={800}
        padding={100}
    />
);
