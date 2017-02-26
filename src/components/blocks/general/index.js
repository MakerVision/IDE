import React from 'react';

import IfBlock from './IfBlock';
import LogicOperationBlock from './LogicOperationBlock';
import RepeatBlock from './RepeatBlock';
import RepeatUntilBlock from './RepeatUntilBlock';
import CompareBlock from './CompareBlock';
import NumberBlock from './NumberBlock';
import ArithmeticBlock from './ArithmeticBlock';
import TextBlock from './TextBlock';
import PrintBlock from './PrintBlock';
import DelayBlock from './DelayBlock';
import RangeBlock from './RangeBlock';
import MapBlock from './MapBlock';

export default () => (
    <category name="General">
        <IfBlock />
        <RepeatBlock />
        <LogicOperationBlock />
        <RepeatUntilBlock />
        <CompareBlock />
        <NumberBlock />
        <ArithmeticBlock />
        <TextBlock />
        <RangeBlock />
        <PrintBlock />
        <DelayBlock />
        <MapBlock />
    </category>
);
