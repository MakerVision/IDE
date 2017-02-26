import React from 'react';

import ServoSetupBlock from './ServoSetupBlock';
import ServoWriteBlock from './ServoWriteBlock';
import ServoReadBlock from './ServoReadBlock';

export default () => (
    <category name="Servos">
        <ServoSetupBlock />
        <ServoWriteBlock />
        <ServoReadBlock />
    </category>
);
