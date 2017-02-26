import React from 'react';

import RotateSetupBlock from './RotateSetupBlock';
import RotateBlock from './RotateBlock';

import color from '../../../colors';

export default () => (
    <category name="Robotic Arm Kit">
        <RotateSetupBlock
            type="rotate_base_setup"
            tooltip="Configures the limits and pin number for the servo"
            name="base rotation"
            pinName="basePin"
            pinNumber={3}
            color={color.green}
        />
        <RotateBlock
            type="rotate_base"
            tooltip="Rotates the base of the robot."
            name="base"
            pinName="basePin"
            defaultAngle={90}
            minAngle={0}
            maxAngle={180}
            color={color.green}
        />

        <RotateSetupBlock
            type="rotate_shoulder_setup"
            tooltip="Configures the limits and pin number for the servo"
            name="shoulder rotation"
            pinName="shoulderPin"
            pinNumber={2}
            color={color.deepPurple}
        />
        <RotateBlock
            type="rotate_shoulder"
            tooltip="Extends and retracts the shoulder of the robot."
            name="shoulder"
            pinName="shoulderPin"
            defaultAngle={120}
            minAngle={60}
            maxAngle={180}
            color={color.deepPurple}
        />

        <RotateSetupBlock
            type="rotate_elbow_setup"
            tooltip="Configures the limits and pin number for the servo"
            name="elbow rotation"
            pinName="elbowPin"
            pinNumber={5}
            color={color.indigo}
        />
        <RotateBlock
            type="rotate_elbow"
            tooltip="Extends and retracts the elbow of the robot."
            name="elbow"
            pinName="elbowPin"
            defaultAngle={95}
            minAngle={60}
            maxAngle={130}
            color={color.indigo}
        />

        <RotateSetupBlock
            type="rotate_hand_setup"
            tooltip="Configures the limits and pin number for the servo."
            name="hand movement"
            pinName="handPin"
            pinNumber={4}
            color={color.pink}
        />
        <RotateBlock
            type="rotate_hand"
            tooltip="Opens and closes the hand (pincher) of the robot."
            name="hand"
            pinName="handPin"
            defaultAngle={50}
            minAngle={0}
            maxAngle={100}
            color={color.pink}
        />

    </category>
);
