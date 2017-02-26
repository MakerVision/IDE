import React from 'react';

import AnalogWriteBlock from './AnalogWriteBlock';
import AnalogReadBlock from './AnalogReadBlock';

export default () => (
    <category name="Analog I/O">
        <AnalogWriteBlock />
        <AnalogReadBlock />
    </category>
);
