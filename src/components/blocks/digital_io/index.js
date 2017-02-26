import React from 'react';

import PinModeBlock from './PinModeBlock';
import DigitalWriteBlock from './DigitalWriteBlock';
import DigitalReadBlock from './DigitalReadBlock';
import HighBlock from './HighBlock';
import LowBlock from './LowBlock';

export default () => (
    <category name="Digital I/O">
        <PinModeBlock />
        <DigitalWriteBlock />
        <DigitalReadBlock />
        <HighBlock />
        <LowBlock />
    </category>
);
