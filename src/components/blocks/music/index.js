import React from 'react';

import MusicBlock from './MusicBlock';
import { WholeNote, HalfNote, QuarterNote, EighthNote, SixteenthNote }
    from './NoteBlocks';

export default () => (
    <category name="Piezo Music Kit">
        <MusicBlock />
        <WholeNote />
        <HalfNote />
        <QuarterNote />
        <EighthNote />
        <SixteenthNote />
    </category>
);
