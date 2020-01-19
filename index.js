'use strict';

const readline = require('readline');
const Coordinates = require('./lib/coordinates');
const Robot = require('./lib/robot');

const GState = {
    FIRST_LINE: 0,
    ROBOT_INIT: 1,
    ROBOT_END: 2
};

// Global state
let gstate = GState.FIRST_LINE;
const scent_coords = new Set();
let upper_right_coord;
let robot;

const rl = readline.createInterface({
    input: process.stdin
});

rl.on('line', (line) => {
    switch (gstate) {
        case GState.FIRST_LINE:
            upper_right_coord = Coordinates.parse(line);
            gstate = GState.ROBOT_INIT;
            break;

        case GState.ROBOT_INIT:
            const [initial_state, movements] = line.split(' ');
            robot = Robot.parse(initial_state);
            for (const m of movements) {
                robot.move(m, scent_coords, upper_right_coord);
                if (robot.lost) {
                    break;
                }
            }

            gstate = GState.ROBOT_END;
            break;

        case GState.ROBOT_END:
            // assert is an empty line
            console.log(`${robot}`);
            console.log('');
            gstate = GState.ROBOT_INIT;
            break;
    };
});