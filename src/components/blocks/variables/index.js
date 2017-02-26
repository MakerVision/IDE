import React from 'react';

import CreateNumberBlock from './CreateNumberBlock';
import GetNumberBlock from './GetNumberBlock';
import SetNumberBlock from './SetNumberBlock';

export default () => (
    <category name="Variables">
        <CreateNumberBlock />
        <GetNumberBlock />
        <SetNumberBlock />
    </category>
);
