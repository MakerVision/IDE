import React from 'react';
import ScratchContainer from './ScratchContainer';

import GeneralCategory from './blocks/general';
import DigitalIOCategory from './blocks/digital_io';
import AnalogIOCategory from './blocks/analog_io';
import ServoCategory from './blocks/servos';
import RoboticArmKitCategory from './blocks/arm';
import PiezoMusicKitCategory from './blocks/music';
import VariablesCategory from './blocks/variables';
import SensorsCategory from './blocks/sensors';
import LedStripsCategory from './blocks/led_strips';

import styles from './HomePage.css';


const ScratchOverview = () => (
    <div className={`${styles.container} fill-parent`}>
        <ScratchContainer>
            <GeneralCategory />
            <AnalogIOCategory />
            <DigitalIOCategory />
            <ServoCategory />
            <SensorsCategory />
            <VariablesCategory />
            <LedStripsCategory />
            <RoboticArmKitCategory />
            <PiezoMusicKitCategory />
        </ScratchContainer>
    </div>
);

export default ScratchOverview;
